#!/bin/bash

# Number of concurrent requests
CONCURRENT=10
# Total number of requests per concurrent process
REQUESTS=50
# Endpoint to test
ENDPOINT="auth.v1.FlockAuthService.Login"
# Request payload
PAYLOAD='{"username": "foo", "password": "bar"}'

# Function to make requests
make_requests() {
    for ((i=1; i<=$REQUESTS; i++)); do
        response=$(grpcurl -plaintext -d "$PAYLOAD" localhost:8080 "$ENDPOINT" 2>&1)
        if [[ $response == *"rate limit exceeded"* ]]; then
            echo "Rate limit hit on request $i"
        else
            echo "Request $i successful"
        fi
        # Small delay to make output readable
        sleep 0.1
    done
}

# Start concurrent processes
echo "Starting stress test with $CONCURRENT concurrent processes, each making $REQUESTS requests"
for ((j=1; j<=$CONCURRENT; j++)); do
    make_requests &
done

# Wait for all processes to complete
wait
echo "Stress test completed"