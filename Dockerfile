# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy app files
COPY server.js .
COPY index.html ./public/

# Install Express
RUN npm install express

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
