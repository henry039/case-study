FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM mhart/alpine-node:14
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app .
COPY . .
CMD [ "npm", "start" ]