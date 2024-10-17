# Use a smaller base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Multi-stage build: final runtime image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app .

# Expose the port the app will run on
EXPOSE 30200

# Start the application
CMD ["node", "app.cjs"]