#!/bin/bash

echo "Setting up Feedback Management System Backend..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please edit .env with your MySQL credentials"
else
    echo ".env file already exists"
fi

# Install dependencies
echo "Installing dependencies..."
npm install

echo ""
echo "Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your MySQL credentials"
echo "2. Run: mysql -u root -p < database/schema.sql"
echo "3. Run: npm run dev"
echo ""
