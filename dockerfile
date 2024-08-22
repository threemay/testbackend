# Use the official Node.js image from Docker Hub
FROM node

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# ENV MONGO_URL=mongodb://host.docker.internal:27017/goexpert

# Command to run the application
CMD ["node", "server.js"]
