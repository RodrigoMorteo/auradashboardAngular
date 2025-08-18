
# Stage 1: Build the Angular application
FROM node:20-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
# The --output-path should match the Nginx configuration
RUN npm run build -- --output-path=./dist/auradash-angular-edition --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular application from the builder stage
COPY --from=builder /app/dist/auradash-angular-edition /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
