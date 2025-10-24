# Stage 1: build the Angular app
FROM node:18 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --silent --legacy-peer-deps

# Copy source and build
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build -- --configuration production || npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
