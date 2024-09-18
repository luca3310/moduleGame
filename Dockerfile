# Stage 1: Build the app with Node.js and Vite
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching for dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the app using Vite
RUN npm run make

# Stage 2: Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=build /app/.vite/build /usr/share/nginx/html

# Copy a basic nginx configuration (if needed)
# You can adjust the NGINX config file to meet Traefik requirements if necessary
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for NGINX to serve the app
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
