module github.com/flock-eng/flock/flock-api

go 1.23.2

require (
	buf.build/gen/go/wcygan/flock/connectrpc/go v1.17.0-20241231000219-b035f3c109ea.1
	buf.build/gen/go/wcygan/flock/protocolbuffers/go v1.36.1-20241231000219-b035f3c109ea.1
	connectrpc.com/connect v1.17.0
	connectrpc.com/cors v0.1.0
	connectrpc.com/grpcreflect v1.2.0
	github.com/joho/godotenv v1.5.1
	github.com/rs/cors v1.11.1
	golang.org/x/net v0.33.0
)

require (
	golang.org/x/text v0.21.0 // indirect
	google.golang.org/protobuf v1.36.1 // indirect
)
