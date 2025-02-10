# Flock API

The Flock API service provides the backend functionality for the Flock application.

## Configuration

The service uses [Viper](https://github.com/spf13/viper) for configuration management. Configuration can be provided through:

1. Configuration file (`config/config.yaml`)
2. Environment variables (prefixed with `FLOCK_`)
3. Default values

### Configuration Options

```yaml
# Server configuration
server:
  port: "8080"                # Port to listen on (env: FLOCK_SERVER_PORT)
  read_timeout: "10s"         # HTTP read timeout (env: FLOCK_SERVER_READ_TIMEOUT)
  write_timeout: "10s"        # HTTP write timeout (env: FLOCK_SERVER_WRITE_TIMEOUT)
  max_header_bytes: 1048576   # Max header size in bytes (env: FLOCK_SERVER_MAX_HEADER_BYTES)

# Authentication configuration
auth:
  jwt_secret: ""             # JWT signing secret (env: FLOCK_AUTH_JWT_SECRET)
  token_expiration: "24h"    # JWT token expiration (env: FLOCK_AUTH_TOKEN_EXPIRATION)
  refresh_token_enabled: true # Enable refresh tokens (env: FLOCK_AUTH_REFRESH_TOKEN_ENABLED)
  refresh_token_timeout: "168h" # Refresh token timeout (env: FLOCK_AUTH_REFRESH_TOKEN_TIMEOUT)

# Database configuration
database:
  host: "localhost"          # Database host (env: FLOCK_DATABASE_HOST)
  port: 5432                 # Database port (env: FLOCK_DATABASE_PORT)
  name: "flock"             # Database name (env: FLOCK_DATABASE_NAME)
  user: "postgres"          # Database user (env: FLOCK_DATABASE_USER)
  password: ""              # Database password (env: FLOCK_DATABASE_PASSWORD)
  ssl_mode: "disable"       # SSL mode (env: FLOCK_DATABASE_SSL_MODE)

# Logger configuration
logger:
  level: "info"             # Log level (env: FLOCK_LOGGER_LEVEL)
  format: "json"            # Log format (env: FLOCK_LOGGER_FORMAT)
  output_path: "stdout"     # Log output path (env: FLOCK_LOGGER_OUTPUT_PATH)
```

### Environment Variables

All configuration options can be overridden using environment variables. The environment variable names are constructed by:

1. Prefixing with `FLOCK_`
2. Converting the configuration path to uppercase
3. Replacing dots with underscores

For example:
- `server.port` becomes `FLOCK_SERVER_PORT`
- `database.password` becomes `FLOCK_DATABASE_PASSWORD`

### Local Development

For local development:

1. Copy the example configuration:
   ```bash
   cp config/config.yaml.example config/config.yaml
   ```

2. Create a `.env` file for local environment variables:
   ```bash
   cp .env.example .env
   ```

3. Modify the configuration files as needed.

## Development

### Prerequisites

- Go 1.23.2 or later
- Make

### Building

```bash
make build
```

### Running

```bash
make run
```

### Testing

```bash
make test
```

## License

[License information here]

## Quickstart

```bash
# Install the Air CLI
go install github.com/air-verse/air@latest

# Run the server with hot reload
air
```

```bash
grpcui --plaintext localhost:8080
grpcurl --plaintext localhost:8080 list
```

## Docker

The images are pushed to https://hub.docker.com/r/wcygan/flock-api/tags

## Kubernetes

### Deploying new versions

After your Docker image is built and pushed to the registry, you can deploy a new version with the following command:

```bash
kubectl rollout restart deployment/flock-api
```

You can use the `:latest` tag to deploy the latest image to Kubernetes. If you're having trouble with that, you can use the `date +'%Y%m%d.%H%M%S'` tag to ensure the latest image is running.