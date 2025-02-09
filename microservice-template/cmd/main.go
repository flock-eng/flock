package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/flock-eng/flock/template-service/internal/logger"
	"github.com/flock-eng/flock/template-service/internal/server"
	"go.uber.org/zap"
)

func main() {
	// Initialize logger
	log := logger.Get()
	defer log.Sync()

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
		log.Fatal("Failed to initialize server", zap.Error(err))
	}

	// Create HTTP server
	httpServer := &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        srv.Handler(),
		ReadTimeout:    cfg.ReadTimeout,
		WriteTimeout:   cfg.WriteTimeout,
		MaxHeaderBytes: cfg.MaxHeaderBytes,
	}

	// Start server
	go func() {
		log.Info("Starting server", zap.String("port", cfg.Port))
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Failed to start server", zap.Error(err))
		}
	}()

	// Wait for interrupt signal
	<-ctx.Done()
	log.Info("Shutting down server...")

	// Create shutdown context with timeout
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Shutdown server
	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		log.Error("Server forced to shutdown", zap.Error(err))
	}

	log.Info("Server exited properly")
}
