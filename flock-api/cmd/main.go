package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	connectcors "connectrpc.com/cors"
	"github.com/flock-eng/flock/flock-api/internal/logger"
	"github.com/flock-eng/flock/flock-api/internal/server"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"go.uber.org/zap"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

// run executes the main server logic and returns an exit code
func run() int {
	// Initialize logger
	logger.Initialize(os.Getenv("ENV") != "production")
	defer func() {
		if err := logger.Sync(); err != nil {
			// We can't use the logger here since we're shutting it down
			// Print to stderr instead
			if _, err := os.Stderr.WriteString("Failed to sync logger: " + err.Error() + "\n"); err != nil {
				// If we can't even write to stderr, we're in real trouble
				return
			}
		}
	}()
	log := logger.Get()

	// Create a context that will be canceled on SIGINT or SIGTERM
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	cfg := &server.Config{
		Port:           "8080",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 21, // 1MB
	}

	// Initialize server with dependencies
	srv, err := server.NewServerWithInit(ctx, cfg, nil) // Replace nil with a DependencyInitializer when needed
	if err != nil {
		log.Error("Failed to initialize server", zap.Error(err))
		return 1
	}

	muxHandler := srv.Handler()
	corsHandler := withCORS(muxHandler)
	h2cHandler := h2c.NewHandler(corsHandler, &http2.Server{})

	httpServer := &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        h2cHandler,
		ReadTimeout:    cfg.ReadTimeout,
		WriteTimeout:   cfg.WriteTimeout,
		MaxHeaderBytes: cfg.MaxHeaderBytes,
	}

	// Start server in a goroutine
	serverErr := make(chan error, 1)
	go func() {
		log.Info("Starting server", zap.String("port", cfg.Port))
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

func init() {
	// Load .env file only if it exists (e.g., for local development)
	if _, err := os.Stat(".env"); err == nil {
		err := godotenv.Load()
		if err != nil {
			panic("Error loading .env file: " + err.Error())
		}
		logger.Get().Info("Loaded .env file")
	} else {
		logger.Get().Info(".env file not found, skipping")
	}
}
