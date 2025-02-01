#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <microservice-name>"
  exit 1
fi

SERVICE_NAME=$1
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

echo "Microservice $SERVICE_NAME created successfully in $NEW_SERVICE_DIR."
echo "Read README.md to get started."
echo "Run 'curl http://localhost:8080/healthz' to check that the microservice is running."
cd $NEW_SERVICE_DIR
go mod tidy
air