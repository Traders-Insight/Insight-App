# Variables
APP_NAME = nextjs-app
NODE_ENV = development
BUILD_DIR = .next
PORT = 3000

# Default target
.DEFAULT_GOAL := help

# Help target
help:
    @echo "Usage: make [target]"
    @echo ""
    @echo "Targets:"
    @echo "  install       Install dependencies"
    @echo "  dev           Run the development server"
    @echo "  build         Build the application for production"
    @echo "  start         Start the production server"
    @echo "  lint          Run linting checks"
    @echo "  test          Run tests"
    @echo "  clean         Remove build artifacts"
    @echo "  docker-build  Build a Docker image for the app"
    @echo "  docker-run    Run the app in a Docker container"

# Install dependencies
install:
    npm install

# Run the development server
dev:
    NODE_ENV=$(NODE_ENV) npm run dev

# Build the application for production
build:
    NODE_ENV=production npm run build

# Start the production server
start:
    NODE_ENV=production npm start -p $(PORT)

# Run linting checks
lint:
    npm run lint

# Run tests
test:
    npm test

# Clean build artifacts
clean:
    rm -rf $(BUILD_DIR)

# Docker build
docker-build:
    docker build -t $(APP_NAME):latest .

# Docker run
docker-run:
    docker run -p $(PORT):$(PORT) -e PORT=$(PORT) $(APP_NAME):latest