# 1. Use official Node.js image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the application
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Expose the port Next.js runs on
EXPOSE 3000

# 7. Start the application
CMD ["npm", "start"]
