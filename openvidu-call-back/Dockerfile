# syntax=docker/dockerfile:1

FROM node:14 as openvidu-call-back
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
RUN npm install --global cross-env

COPY ./dist/openvidu-call-server.js .
COPY ./public/. ./public

CMD [ "npx", "cross-env", "OPENVIDU_URL=https://openvidu.rax.academy", "OPENVIDU_SECRET=myopenvidusecret", "node", "openvidu-call-server.js" ]

