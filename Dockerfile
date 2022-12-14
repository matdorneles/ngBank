FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN prisma migrate dev --name init

EXPOSE 3333

CMD [ "node" "server.ts" ]

