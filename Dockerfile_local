FROM node:14-alpine

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

RUN npm install

CMD ["npm", "start"]
