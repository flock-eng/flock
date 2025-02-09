package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/flock-eng/flock/template-service/internal/logger"
	"github.com/flock-eng/flock/template-service/internal/server"
	"go.uber.org/zap"
)

func run() error {
	// Initialize logger
	log := logger.Get()
	defer func() {
		if err := log.Sync(); err != nil {
			fmt.Fprintf(os.Stderr, "failed to sync logger: %v\n", err)
		}
	}()

	// Create server configuration
	cfg := &server.Config{
		Port:           "8080",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1MB
	}

	// Create context that listens for the interrupt signal from the OS
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	// Initialize server with dependencies
	srv, err := server.NewServerWithInit(ctx, cfg, nil)
	if err != nil {
		return fmt.Errorf("failed to initialize server: %w", err)
	}

	// Create HTTP server
	httpServer := &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        srv.Handler(),
		ReadTimeout:    cfg.ReadTimeout,
		WriteTimeout:   cfg.WriteTimeout,
		MaxHeaderBytes: cfg.MaxHeaderBytes,
	}

	// Channel to capture server errors
	errChan := make(chan error, 1)

	// Start server
	go func() {
		log.Info("Starting server", zap.String("port", cfg.Port))
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
