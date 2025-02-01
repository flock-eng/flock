package main

import (
	"log"
	"github.com/flock-eng/flock/flock-auth-service/internal/server"
	"net/http"
	"os"
	"time"
)

func main() {
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
	httpServer := &http.Server{
		Addr:           ":" + port,
		Handler:        srv.Handler(),
		ReadTimeout:    cfg.ReadTimeout,
		WriteTimeout:   cfg.WriteTimeout,
		MaxHeaderBytes: cfg.MaxHeaderBytes,
	}

	log.Printf("Starting flock-auth-service on port %s...", port)
	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}