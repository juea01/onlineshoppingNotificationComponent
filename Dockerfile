FROM node:12.15.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1923

CMD ["node","rabbitmqConsumer.js"]