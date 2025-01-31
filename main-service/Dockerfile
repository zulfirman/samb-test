# Stage 1: Build the Go application using an official Go Alpine image
FROM golang:1.23-alpine AS builder

# Enable Go modules
ENV GO111MODULE=on

# Set working directory
WORKDIR /app

# Cache Go module dependencies by copying only go.mod and go.sum
COPY go.mod go.sum ./
RUN go mod download

# Copy only the necessary folders (src and docs) for building the Go application
COPY main.go main.go
COPY docs/ ./docs
COPY src/ ./src

# Build the Go binary with optimization flags
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o webserver ./main.go


# Stage 2: Create a minimal image for production using 'distroless'
FROM gcr.io/distroless/static-debian12:nonroot

# Set working directory in the container
WORKDIR /app

# Copy the compiled Go binary and docs from the builder stage
COPY --from=builder /app/webserver /app/webserver
COPY --from=builder /app/docs /app/docs
COPY --from=builder /app/src/view /app/src/view

# Use a non-root user for security
USER nonroot:nonroot

# Start the Go webserver
ENTRYPOINT ["/app/webserver"]

#after deploying using docker, run
#sudo chown -R 65532:65532 ./uploads
#The user ID 65532 corresponds to the nonroot user in distroless images. This ensures that the container's nonroot user can write to the uploads directory.