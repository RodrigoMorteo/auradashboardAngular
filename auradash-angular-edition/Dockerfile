# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application (includes SSR)
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy the build output from the previous stage
COPY --from=build /usr/src/app/dist/auradash-angular-edition ./dist/auradash-angular-edition

# Expose the port the SSR server runs on (default Angular SSR port is usually 4000)
# But we can override it or check what server.mjs uses.
EXPOSE 4000

# Set environment variable for the port if needed
ENV PORT=4000

# Run the SSR server
CMD ["node", "dist/auradash-angular-edition/server/server.mjs"]
