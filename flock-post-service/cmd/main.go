package main

import (
	"github.com/flock-eng/flock/flock-post-service/internal/logger"
	"github.com/flock-eng/flock/flock-post-service/internal/server"
	"go.uber.org/zap"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"net/http"
	"os"
	"time"
)

func main() {
	// Initialize logger
	logger.Initialize(os.Getenv("ENV") != "production")
	defer logger.Sync()
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

	log.Info("Starting flock-auth-service on port " + port)
	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatal("Server failed to start", zap.Error(err))
	}
}
