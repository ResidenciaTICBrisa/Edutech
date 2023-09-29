FROM node

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the application using nodemon
CMD ["npm", "start"]
