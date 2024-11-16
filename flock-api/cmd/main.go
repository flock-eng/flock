package main

import (
	"github.com/flock-eng/flock/flock-api/internal/server"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"net/http"
	"time"
)

func main() {
	cfg := &server.Config{
		Port:           "8080",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 21, // 1MB
	}

	srv := server.NewServer(cfg)

	log.Printf("Serving requests on port %s", cfg.Port)

	httpServer := &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        h2c.NewHandler(srv.Handler(), &http2.Server{}),
		ReadTimeout:    cfg.ReadTimeout,
		WriteTimeout:   cfg.WriteTimeout,
		MaxHeaderBytes: cfg.MaxHeaderBytes,
	}

	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
