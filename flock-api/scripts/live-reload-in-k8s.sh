#!/bin/bash

# Function to handle cleanup on Ctrl+C
cleanup() {
    echo "Caught Ctrl+C, stopping processes..."
    kill $AIR_PID 2>/dev/null
    telepresence leave flock-api
    exit 0
}

# Trap SIGINT (Ctrl+C) and call the cleanup function
trap cleanup SIGINT

# Run the "air" command in the background
air &
AIR_PID=$!

# Run the telepresence commands
telepresence connect
telepresence intercept flock-api --namespace default --service flock-api --port 8080:8080

# Wait for both processes to finish (though air will run indefinitely)
wait $AIR_PID