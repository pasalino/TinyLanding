FROM node:9.11-alpine

ENV NODE_ENV "production"
ENV PORT 80

RUN mkdir /tinylanding
WORKDIR /tinylanding
COPY package.json /tinylanding

RUN npm install

ADD . /tinylanding

CMD npm start
