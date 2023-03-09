FROM alpine:latest

#Install node
RUN apk add --update nodejs npm

#Copy Dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

#Install Dependencies
RUN cd /app; npm install

#Copy App
COPY . /app

# RUN npx sequelize-cli db:migrate

#Run app 
ENTRYPOINT  ["node", "/app/index.js"]