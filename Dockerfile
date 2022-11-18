FROM node:19-alpine

WORKDIR /app/server

#pm2 
RUN npm install -g npm@9.1.2
RUN npm install pm2 -g

COPY .env.development .env
COPY package.json .
COPY index.js .
COPY .sequelizerc .
COPY src ./src
COPY services /app/server/services
COPY config /app/server/config
COPY controller /app/server/controller
COPY middleware /app/server/middleware
COPY models /app/server/models
COPY routes /app/server/routes


RUN npm install

EXPOSE 5000

RUN chmod -R 777 /app/server
USER node


#
CMD [ "pm2-runtime", "npm", "--", "start" ]
