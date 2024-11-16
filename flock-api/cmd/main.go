package main

import (
	"github.com/flock-eng/flock/flock-api/internal/server"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"net/http"
)

func main() {
	cfg := &server.Config{}
	srv := server.NewServer(cfg)

	port := "8080"
	log.Printf("Starting server on :%s", port)

	err := http.ListenAndServe(
		":"+port,
		h2c.NewHandler(srv.Handler(), &http2.Server{}),
	)

	if err != nil {
		log.Fatal(err)
	}
}
