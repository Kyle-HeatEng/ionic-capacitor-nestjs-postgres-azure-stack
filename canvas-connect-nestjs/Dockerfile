# Use the official Node.js image as base
FROM node:alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the NestJS project
RUN npm run build

# Start a new stage
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built files from the previous stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
