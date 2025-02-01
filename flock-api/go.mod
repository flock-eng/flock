module github.com/flock-eng/flock/flock-api

go 1.23.2

require (
	buf.build/gen/go/wcygan/flock/connectrpc/go v1.18.1-20250129144759-482c937991e5.1
	buf.build/gen/go/wcygan/flock/protocolbuffers/go v1.36.4-20250129144759-482c937991e5.1
	connectrpc.com/connect v1.18.1
	connectrpc.com/cors v0.1.0
	connectrpc.com/grpcreflect v1.3.0
	github.com/joho/godotenv v1.5.1
	github.com/rs/cors v1.11.1
	go.uber.org/zap v1.27.0
	golang.org/x/net v0.34.0
	golang.org/x/time v0.9.0
)

require (
	connectrpc.com/grpchealth v1.3.0 // indirect
	go.uber.org/multierr v1.11.0 // indirect
	golang.org/x/text v0.21.0 // indirect
	google.golang.org/protobuf v1.36.4 // indirect
)
