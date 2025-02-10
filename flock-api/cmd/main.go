package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	connectcors "connectrpc.com/cors"
	"github.com/flock-eng/flock/flock-api/internal/config"
	"github.com/flock-eng/flock/flock-api/internal/logger"
	"github.com/flock-eng/flock/flock-api/internal/server"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.uber.org/zap"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

// writeError writes an error message to stderr and returns an error if the write fails
func writeError(msg string) error {
	_, err := os.Stderr.WriteString(msg + "\n")
	if err != nil {
		return fmt.Errorf("failed to write to stderr: %w", err)
	}
	return nil
}

// run executes the main server logic and returns an exit code
func run() int {
	// Load .env file if it exists (before loading config)
	if _, err := os.Stat(".env"); err == nil {
		if err := godotenv.Load(); err != nil {
			// We can't use the logger yet since it's not initialized
			if writeErr := writeError("Error loading .env file: " + err.Error()); writeErr != nil {
				fmt.Printf("Failed to write to stderr: %v\n", writeErr)
			}
			return 1
		}
	}

	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		// We can't use the logger yet since it's not initialized
		if writeErr := writeError("Failed to load configuration: " + err.Error()); writeErr != nil {
			fmt.Printf("Failed to write to stderr: %v\n", writeErr)
		}
		return 1
	}

	// Initialize logger with config
	logger.Initialize(cfg.Logger.Level == "debug")
	defer func() {
		if err := logger.Sync(); err != nil {
			if writeErr := writeError("Failed to sync logger: " + err.Error()); writeErr != nil {
				fmt.Printf("Failed to write to stderr: %v\n", writeErr)
			}
		}
	}()
	log := logger.Get()

	// Create a context that will be canceled on SIGINT or SIGTERM
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Convert config to server.Config
	serverCfg := &server.Config{
		Port:           cfg.Server.Port,
		ReadTimeout:    cfg.Server.ReadTimeout,
		WriteTimeout:   cfg.Server.WriteTimeout,
		MaxHeaderBytes: cfg.Server.MaxHeaderBytes,
	}

	// Initialize server with dependencies
	srv, err := server.NewServerWithInit(ctx, serverCfg, nil) // Replace nil with a DependencyInitializer when needed
	if err != nil {
		log.Error("Failed to initialize server", zap.Error(err))
		return 1
	}

	muxHandler := srv.Handler()
	corsHandler := withCORS(muxHandler)
	h2cHandler := h2c.NewHandler(corsHandler, &http2.Server{})

	httpServer := &http.Server{
		Addr:           ":" + serverCfg.Port,
		Handler:        h2cHandler,
		ReadTimeout:    serverCfg.ReadTimeout,
		WriteTimeout:   serverCfg.WriteTimeout,
		MaxHeaderBytes: serverCfg.MaxHeaderBytes,
	}

	// Start server in a goroutine
	serverErr := make(chan error, 1)
	go func() {
		log.Info("Starting server",
			zap.String("port", serverCfg.Port),
			zap.String("env", os.Getenv("ENV")),
			zap.String("log_level", cfg.Logger.Level),
		)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Error("Server failed to start", zap.Error(err))
			serverErr <- err
		}
	}()

	// Wait for interrupt signal or server error
	select {
	case err := <-serverErr:
		log.Error("Server error", zap.Error(err))
		return 1
	case <-ctx.Done():
		log.Info("Received shutdown signal")
	}

	// Create a timeout context for graceful shutdown
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		log.Error("Server shutdown failed", zap.Error(err))
		return 1
	}

	log.Info("Server shutdown complete")
	return 0
}

func main() {
	os.Exit(run())
}

func withCORS(h http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("FRONTEND_ORIGIN")},
		AllowedMethods:   connectcors.AllowedMethods(),
		AllowedHeaders:   connectcors.AllowedHeaders(),
		ExposedHeaders:   connectcors.ExposedHeaders(),
		AllowCredentials: true,
		MaxAge:           7200,
	})
	return c.Handler(h)
}
