#!/bin/bash
set -e

# Function to handle Ctrl+C
cleanup() {
  echo "Caught Ctrl+C, stopping processes..."
  kill $AIR_PID 2>/dev/null
  exit 0
}

# Trap SIGINT (Ctrl+C)
trap cleanup SIGINT

if [ -z "$1" ]; then
  echo "Usage: $0 <microservice-name>"
  exit 1
fi

SERVICE_NAME=$1

# Validate that the service name is prefixed with "flock"
if [[ $SERVICE_NAME != flock* ]]; then
  echo "Error: Service name must be prefixed with 'flock'."
  exit 1
fi

TEMPLATE_DIR="microservice-template"
NEW_SERVICE_DIR="$SERVICE_NAME"

# Copy the template to a new directory
if [ -d "$NEW_SERVICE_DIR" ]; then
  echo "Directory $NEW_SERVICE_DIR already exists. Aborting."
  exit 1
fi

cp -r $TEMPLATE_DIR $NEW_SERVICE_DIR

# Use LC_ALL=C to handle special characters in sed
# Also use different quotes to avoid issues with string interpretation
LC_ALL=C find $NEW_SERVICE_DIR -type f -exec sed -i '' "s/template-service/${SERVICE_NAME}/g" {} +
LC_ALL=C find $NEW_SERVICE_DIR -type f -exec sed -i '' "s/service-name/${SERVICE_NAME}/g" {} +

# Ensure the destination directory exists
mkdir -p .github/workflows

# Copy and rename the GitHub Actions workflow file
cp $NEW_SERVICE_DIR/github-actions-template.yaml .github/workflows/${SERVICE_NAME}.yaml

# Remove the template workflow file from the new service directory
rm $NEW_SERVICE_DIR/github-actions-template.yaml

echo "Microservice $SERVICE_NAME created successfully in $NEW_SERVICE_DIR"
echo "Setting up Go module..."
cd $NEW_SERVICE_DIR
go mod tidy

echo "Running initial linting check..."
if ! command -v golangci-lint &> /dev/null; then
  echo "Warning: golangci-lint not found. Please install it to run linting checks."
  echo "Installation instructions: https://golangci-lint.run/usage/install/"
else
  golangci-lint run ./...
fi

echo "Running initial tests..."
go test -v -race ./...

echo "Setup complete! Next steps:"
echo "1. Review and update the module name in go.mod"
echo "2. Review and update import paths in all Go files"
echo "3. Review and customize the GitHub Actions workflow in .github/workflows/${SERVICE_NAME}.yaml"
echo "4. Start the service with: cd $NEW_SERVICE_DIR && go run cmd/main.go"
echo "5. Test the service with: grpcurl --plaintext localhost:8080 grpc.health.v1.Health/Check"

# Start Air in the background
echo "Starting Air for live reload..."
air &
AIR_PID=$!

# Wait until the service is healthy before proceeding with grpcurl
echo "Waiting for the service to start..."
until grpcurl --plaintext localhost:8080 grpc.health.v1.Health/Check >/dev/null 2>&1; do
  echo "Service not up yet, waiting..."
  sleep 2
done

echo "Service is up; running grpcurl health check:"
grpcurl --plaintext localhost:8080 grpc.health.v1.Health/Check

echo "Ctrl+C to stop"

# Wait for Air to finish (this will run indefinitely until you press Ctrl+C)
wait $AIR_PID
