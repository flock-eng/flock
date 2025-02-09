package main

import (
	"net/http"
	"os"
	"time"

	"github.com/flock-eng/flock/template-service/internal/logger"
	"github.com/flock-eng/flock/template-service/internal/server"
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

	port := "8080"
	if fromEnv := os.Getenv("PORT"); fromEnv != "" {
		port = fromEnv
	}

	cfg := &server.Config{
		Port:           port,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1MB
	}

	srv := server.NewServer(cfg)
	h2cHandler := h2c.NewHandler(srv.Handler(), &http2.Server{})

	httpServer := &http.Server{
		Addr:           ":" + port,
		Handler:        h2cHandler,
		ReadTimeout:    cfg.ReadTimeout,
		WriteTimeout:   cfg.WriteTimeout,
		MaxHeaderBytes: cfg.MaxHeaderBytes,
	}

	log.Info("Starting template-service on port " + port)
	if err := httpServer.ListenAndServe(); err != nil {
		log.Error("Server failed to start", zap.Error(err))
		return 1
	}
	return 0
}

func main() {
	os.Exit(run())
}
