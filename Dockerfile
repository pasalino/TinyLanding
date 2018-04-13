FROM node:9.11-alpine

ENV NODE_ENV "production"
ENV PORT 80

RUN mkdir /tinylanding
WORKDIR /tinylanding

ADD . /tinylanding

RUN npm install --ignore-scripts
RUN npm install sqlite3
RUN npm install --only=dev
RUN npm run migrate
RUN npm run seed-db

CMD npm start
