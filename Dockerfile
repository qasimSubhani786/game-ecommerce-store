# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Build the React application
# RUN npm run build

# Set the environment variable for the Node.js server
ENV NODE_ENV production

# Expose port 8080 for the Node.js server
EXPOSE 8080

# Start the Node.js server
CMD [ "npm", "start" ]
