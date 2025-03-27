# specify the node base image with your desired version node:<version>
FROM node:lts

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
