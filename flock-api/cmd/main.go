package main

import (
    "log"
    "net/http"
    "time"
    "golang.org/x/net/http2"
    "golang.org/x/net/http2/h2c"
    "github.com/flock-eng/flock/flock-api/internal/server"
)

func main() {
    cfg := &server.Config{
        Port:           "8080",
        ReadTimeout:    10 * time.Second,
        WriteTimeout:   10 * time.Second,
        MaxHeaderBytes: 1 << 20, // 1MB
        AllowedOrigins: []string{"*"},
    }
    
    srv := server.NewServer(cfg)
    
    log.Printf("Starting server on :%s", cfg.Port)
    
    server := &http.Server{
        Addr:           ":" + cfg.Port,
        Handler:        h2c.NewHandler(srv.Handler(), &http2.Server{}),
        ReadTimeout:    cfg.ReadTimeout,
        WriteTimeout:   cfg.WriteTimeout,
        MaxHeaderBytes: cfg.MaxHeaderBytes,
    }
    
    err := server.ListenAndServe()
    
    if err != nil {
        log.Fatal(err)
    }
}
