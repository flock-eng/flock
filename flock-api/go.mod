module github.com/flock-eng/flock/flock-api

go 1.23.2

require (
	buf.build/gen/go/wcygan/flock/connectrpc/go v1.18.1-20250129144759-482c937991e5.1
	buf.build/gen/go/wcygan/flock/protocolbuffers/go v1.36.2-20250129144759-482c937991e5.1
	connectrpc.com/connect v1.18.1
	connectrpc.com/cors v0.1.0
	github.com/joho/godotenv v1.5.1
	github.com/rs/cors v1.11.1
	golang.org/x/net v0.33.0
)

require (
	connectrpc.com/grpcreflect v1.3.0 // indirect
	golang.org/x/text v0.21.0 // indirect
	google.golang.org/protobuf v1.36.2 // indirect
)
