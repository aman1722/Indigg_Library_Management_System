# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application's source code to the working directory
COPY . .

# Expose a port that your app will run on (e.g., 3000)
EXPOSE 8080

# Define the command to run your app (e.g., "npm start")
CMD ["npm", "run","server"]
