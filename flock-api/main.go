package main

import (
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"net/http"
)

func main() {
	port := "8080"
	mux := http.NewServeMux()

	log.Printf("Starting server on :%s", port)

	err := http.ListenAndServe(
		"localhost:"+port,
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(mux, &http2.Server{}),
	)

	if err != nil {
		log.Fatal(err)
	}
}
