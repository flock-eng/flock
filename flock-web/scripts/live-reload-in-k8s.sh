#!/bin/bash

# Function to handle cleanup on Ctrl+C
cleanup() {
    echo "Caught Ctrl+C, stopping processes..."
    kill $NPM_PID 2>/dev/null
    telepresence leave flock-web
    exit 0
}

# Trap SIGINT (Ctrl+C) and call the cleanup function
trap cleanup SIGINT

# Run "npm install" and "npm run dev" in the background
npm install
npm run dev &
NPM_PID=$!

# Run the telepresence commands
telepresence connect
telepresence intercept flock-web --namespace default --service flock-web --port 3000:http

# Wait for the npm process to finish (though it will run indefinitely)
wait $NPM_PID