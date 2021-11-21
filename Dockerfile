# image used to build bundle
FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package*.json .
COPY .env.production .
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

# image used to serve bundle
FROM node:14-alpine

EXPOSE 3000

WORKDIR /app

COPY --from=BUILD_IMAGE /app/build /app/build

CMD ["npx", "serve", "-s", "build"]
