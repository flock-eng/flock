package main

import (
	connectcors "connectrpc.com/cors"
	"github.com/flock-eng/flock/flock-api/internal/server"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	cfg := &server.Config{
		Port:           "8080",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 21, // 1MB
	}

	// Build your server and retrieve its mux-based handler.
	srv := server.NewServer(cfg)

	// Wrap that handler with h2c + CORS
	muxHandler := srv.Handler()                                // The ServeMux from your internal/server/server.go
	corsHandler := withCORS(muxHandler)                        // github.com/rs/cors wrapper
	h2cHandler := h2c.NewHandler(corsHandler, &http2.Server{}) // h2c for HTTP/2 cleartext

	httpServer := &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        h2cHandler, // <--- This is crucial
		ReadTimeout:    cfg.ReadTimeout,
		WriteTimeout:   cfg.WriteTimeout,
		MaxHeaderBytes: cfg.MaxHeaderBytes,
	}

	log.Printf("Serving requests on port %s", cfg.Port)
	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func withCORS(h http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("FRONTEND_ORIGIN")},
		AllowedMethods:   connectcors.AllowedMethods(),
		AllowedHeaders:   connectcors.AllowedHeaders(),
		ExposedHeaders:   connectcors.ExposedHeaders(),
		AllowCredentials: true, // Set to true if your application requires credentials like cookies
		MaxAge:           7200, // Cache preflight response for 2 hours
	})
	return c.Handler(h)
}

func init() {
	// Load .env file only if it exists (e.g., for local development)
	if _, err := os.Stat(".env"); err == nil {
		err := godotenv.Load()
		if err != nil {
			log.Fatalf("Error loading .env file")
		} else {
			log.Println("Loaded .env file")
			// print os.Getenv("FRONTEND_ORIGIN")
			log.Println(os.Getenv("FRONTEND_ORIGIN"))
		}
	}
}
