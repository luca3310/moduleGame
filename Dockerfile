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
RUN npm run build

# Stage 2: Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy assets from the project directory to the nginx html directory
COPY --from=build /app/assets /usr/share/nginx/html/assets

# Expose port 80 for NGINX to serve the app
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]