package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/flock-eng/flock/template-service/internal/config"
	"github.com/flock-eng/flock/template-service/internal/logger"
	"github.com/flock-eng/flock/template-service/internal/server"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

func run() error {
	// Load .env file if it exists
	if _, err := os.Stat(".env"); err == nil {
		if err := godotenv.Load(); err != nil {
			return fmt.Errorf("error loading .env file: %w", err)
		}
	}

	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		return fmt.Errorf("failed to load configuration: %w", err)
	}

	// Initialize logger with config
	logger.Initialize(cfg.Logger.Level == "debug")
	log := logger.Get()
	defer func() {
		if err := log.Sync(); err != nil {
			fmt.Fprintf(os.Stderr, "failed to sync logger: %v\n", err)
		}
	}()

	// Create context that listens for the interrupt signal from the OS
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	// Convert config to server.Config
	serverCfg := &server.Config{
		Port:           cfg.Server.Port,
		ReadTimeout:    cfg.Server.ReadTimeout,
		WriteTimeout:   cfg.Server.WriteTimeout,
		MaxHeaderBytes: cfg.Server.MaxHeaderBytes,
	}

	// Initialize server with dependencies
	srv, err := server.NewServerWithInit(ctx, serverCfg, nil)
	if err != nil {
		return fmt.Errorf("failed to initialize server: %w", err)
	}

	// Create HTTP server
	httpServer := &http.Server{
		Addr:           ":" + serverCfg.Port,
		Handler:        srv.Handler(),
		ReadTimeout:    serverCfg.ReadTimeout,
		WriteTimeout:   serverCfg.WriteTimeout,
		MaxHeaderBytes: serverCfg.MaxHeaderBytes,
	}

	// Channel to capture server errors
	errChan := make(chan error, 1)

	// Start server
	go func() {
		log.Info("Starting server",
			zap.String("port", serverCfg.Port),
			zap.String("env", os.Getenv("ENV")),
			zap.String("log_level", cfg.Logger.Level),
		)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			errChan <- fmt.Errorf("server error: %w", err)
		}
	}()

	// Wait for interrupt signal or server error
	select {
	case <-ctx.Done():
		log.Info("Shutting down server...")
	case err := <-errChan:
		log.Error("Server failed", zap.Error(err))
		return err
	}

	// Create shutdown context with timeout
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Shutdown server
	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		log.Error("Server forced to shutdown", zap.Error(err))
		return fmt.Errorf("forced shutdown: %w", err)
	}

	log.Info("Server exited properly")
	return nil
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "error: %v\n", err)
		os.Exit(1)
	}
}
