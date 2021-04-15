FROM node:lts-alpine
#RUN apk update
WORKDIR /vue
COPY package*.json /vue/
#RUN npm install -g npm
RUN npm install
RUN npm install -g @vue/cli
COPY . /vue/
CMD ["npm","run","serve"]
