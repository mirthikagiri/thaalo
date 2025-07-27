#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Start the production server
    echo "Starting production server..."
    npm start
else
    echo "Build failed!"
    exit 1
fi 