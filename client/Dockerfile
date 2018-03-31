FROM node:8.2.0-alpine

ENV APPDIR /app

WORKDIR $APPDIR

RUN npm install -g webpack firebase-tools

ADD ./package.json $APPDIR/package.json

RUN npm install

ADD ./ $APPDIR

CMD ["webpack", "--config", "./webpack_config_prod.js", "-p"]
