#!/bin/bash

# Description for each option
echo "Please select an option:"
echo "1 - Build and run'"
echo "2 - Restart"
echo "3 - Down"

# Prompt the user for input
read -p "Enter the number (1, 2 or 3): " input

# Run the corresponding command based on input
if [ "$input" -eq 1 ]; then
    echo "Running option 1..."
    docker compose -f docker-compose-prod.yml --env-file ./docker/environment/.env-prod up -d --build
elif [ "$input" -eq 2 ]; then
    echo "Running option 2..."
    docker compose -f docker-compose-prod.yml --env-file ./docker/environment/.env-prod restart
elif [ "$input" -eq 3 ]; then
    echo "Running option 3..."
    docker compose -f docker-compose-prod.yml --env-file ./docker/environment/.env-prod down
else
    echo "Invalid input. Please enter 1, 2 or 3."
fi
