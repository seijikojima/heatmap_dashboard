FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apk update && \
    npm install -g npm @vue/cli
CMD ["npm","run","serve"]
