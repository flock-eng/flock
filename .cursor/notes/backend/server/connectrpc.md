# ConnectRPC

ConnectRPC is the framework we use for building microservices.

Buf is the tool we use to generate the ConnectRPC code from the protobuf definitions.

## Reflection

We use https://github.com/connectrpc/grpcreflect-go to enable reflection on the server.

This allows us to introspect the services and methods on the server.

For example, with `flock-api`:

```bash
grpcurl --plaintext localhost:8080 list
auth.v1.FlockAuthService
bff.v1.FlockUserAggregationService
grpc.health.v1.Health
post.v1.FlockPostService
profile.v1.FlockProfileService
```

We can also describe the services and methods:

```bash
grpcurl --plaintext localhost:8080 describe auth.v1.FlockAuthService
auth.v1.FlockAuthService is a service:
service FlockAuthService {
  rpc Login ( .auth.v1.LoginRequest ) returns ( .auth.v1.LoginResponse );
  rpc Logout ( .auth.v1.LogoutRequest ) returns ( .auth.v1.LogoutResponse );
  rpc Register ( .auth.v1.RegisterRequest ) returns ( .auth.v1.RegisterResponse );
}

grpcurl --plaintext localhost:8080 describe auth.v1.FlockAuthService.Login
auth.v1.FlockAuthService.Login is a method:
rpc Login ( .auth.v1.LoginRequest ) returns ( .auth.v1.LoginResponse );

grpcurl -msg-template --plaintext localhost:8080 describe .auth.v1.LoginRequest         
auth.v1.LoginRequest is a message:
message LoginRequest {
  string username = 1;
  string password = 2;
}

Message template:
{
  "username": "",
  "password": ""
}
```

And lastly we can use this information to call the methods on the server with a payload

```bash
grpcurl -plaintext -d '{
  "username": "foo",
  "password": "bar"
}' localhost:8080 auth.v1.FlockAuthService.Login
```

We can also use `grpcui` to interact with the server:

```bash
grpcui -plaintext localhost:8080
```

