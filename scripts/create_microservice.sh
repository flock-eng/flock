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

# Replace placeholder text "{{SERVICE_NAME}}" with the actual service name
find $NEW_SERVICE_DIR -type f -exec sed -i "" "s/{{SERVICE_NAME}}/$SERVICE_NAME/g" {} +

# --- New steps to handle GitHub Actions file ---
# Ensure the destination directory exists
mkdir -p .github/workflows

# Copy the github-actions-template.yaml into .github/workflows/{{SERVICE_NAME}}.yaml
cp $NEW_SERVICE_DIR/github-actions-template.yaml .github/workflows/${SERVICE_NAME}.yaml

# Remove the original github-actions-template.yaml from the new service directory
rm $NEW_SERVICE_DIR/github-actions-template.yaml
# --- End new steps ---

echo "Microservice $SERVICE_NAME created successfully in $NEW_SERVICE_DIR."
echo "Read README.md to get started."
echo "Run 'grpcurl --plaintext localhost:8080 grpc.health.v1.Health/Check' to check that the microservice is running."

cd $NEW_SERVICE_DIR
go mod tidy

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
