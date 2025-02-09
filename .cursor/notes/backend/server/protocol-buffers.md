# Protocol Buffers

We use protocol buffers to define the API for the server.

The protobuf definitions are stored in the `proto` directory.

Example:

```bash
tree proto 
proto
├── ads
│   └── v1
│       └── ads.proto
├── auth
│   └── v1
│       └── auth.proto
├── bff
│   └── v1
│       └── bff.proto
├── buf.yaml
├── common
│   └── v1
│       └── common.proto
├── events
│   └── post
│       └── v1
│           └── post_events.proto
├── feed
│   └── v1
│       └── feed.proto
├── post
│   └── v1
│       └── post.proto
└── profile
    └── v1
        └── profile.proto
```

The protobuf definitions are used to generate the ConnectRPC code using Buf.

We push the schemas to Buf Schema Registry: https://buf.build/wcygan/flock

The latest versions can be found like this:

```bash
go list -m -versions buf.build/gen/go/wcygan/flock/protocolbuffers/go
go list -m -versions buf.build/gen/go/wcygan/flock/connectrpc/go
```