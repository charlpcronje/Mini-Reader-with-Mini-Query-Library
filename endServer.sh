#!/bin/bash

# Check for processes using port 5645
PORT=5645
PROCESS_INFO=$(sudo ss -tuln | grep ":$PORT")

if [ -z "$PROCESS_INFO" ]; then
  echo "No process is running on port $PORT."
  exit 0
fi

# Extract the PID of the process using the port
PID=$(sudo lsof -t -i:$PORT)

if [ -z "$PID" ]; then
  echo "Could not find the PID for port $PORT."
  exit 1
fi

# Display process information
echo "Process using port $PORT:"
sudo lsof -i:$PORT

# Kill the process
echo "Killing process with PID $PID..."
sudo kill -9 $PID

# Verify if the port is now free
if sudo ss -tuln | grep ":$PORT" > /dev/null; then
  echo "Failed to free port $PORT."
  exit 1
else
  echo "Port $PORT is now free."
fi
