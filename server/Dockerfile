# use node as the base images
FROM node

# Setting /app as the working directory
WORKDIR /app
# Copy all the files to /app
COPY ./package.json ./package.json

# install concurrently in order to run both project at the same time
RUN npm install

COPY . .

# EXPOSE PORT 5000
EXPOSE 8080

# Turning on the server side application 
CMD ["npm", "run", "start"]

