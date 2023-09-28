FROM node

# Create app directory
WORKDIR /frontend

# Install app dependencies
COPY package.json .

RUN npm install

# Copy app source code
COPY . .

# Start application
CMD ["npm", "start"]