FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install dotenv --save
COPY . .

EXPOSE 5002
CMD ["npm", "start"]
