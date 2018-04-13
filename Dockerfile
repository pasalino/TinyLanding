FROM node:9.11-alpine

ENV NODE_ENV "production"
ENV PORT 80

RUN mkdir /tinylanding
WORKDIR /tinylanding

ADD . /tinylanding

RUN npm install


CMD npm start
