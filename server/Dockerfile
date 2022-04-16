FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install swagger-jsdoc swagger-ui-express --save

EXPOSE 8080
CMD [ "node", "server.js" ]


#docker run -d -p 8080:8080 <container id>
