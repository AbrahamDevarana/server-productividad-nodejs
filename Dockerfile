FROM node:16-alpine

# Create app directory
WORKDIR /app

RUN npm install pm2 -g
RUN npm install npm@latest -g

# Install app dependencies
COPY package*.json ./
RUN npm install


COPY . .
COPY .env.test .env


RUN chmod -R 777 /app
USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]