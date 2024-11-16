package main

import (
	"buf.build/gen/go/wcygan/flock/connectrpc/go/backend/v1/backendv1connect"
	"buf.build/gen/go/wcygan/flock/connectrpc/go/frontend/v1/frontendv1connect"
	"flock-api/internal/account"
	"flock-api/internal/home_page"
	"flock-api/internal/post"
	"flock-api/internal/profile_page"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log"
	"net/http"
)

func main() {
	port, mux := initializeServer()
	attachHandlers(mux)
	startServer(port, mux)
}

func initializeServer() (string, *http.ServeMux) {
	port := "8080"
	mux := http.NewServeMux()
	return port, mux
}

func attachHandlers(mux *http.ServeMux) {
	// ConnectRPC handlers
	mux.Handle(frontendv1connect.NewProfilePageServiceHandler(&profile_page.Handler{}))
	mux.Handle(frontendv1connect.NewHomePageServiceHandler(&home_page.Handler{}))
	mux.Handle(backendv1connect.NewPostServiceHandler(&post.Handler{}))
	mux.Handle(backendv1connect.NewAccountServiceHandler(&account.Handler{}))

	// Health check
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}

func startServer(port string, mux *http.ServeMux) {
	log.Printf("Starting server on :%s", port)

	err := http.ListenAndServe(
		":"+port,
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(mux, &http2.Server{}),
	)

	if err != nil {
		log.Fatal(err)
	}
}
