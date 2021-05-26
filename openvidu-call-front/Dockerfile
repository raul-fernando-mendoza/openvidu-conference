# syntax=docker/dockerfile:1

FROM node:14 as openvidu-call-front
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
RUN npm install --global cross-env

COPY . .

CMD [ "node", "--max_old_space_size=8048", "./node_modules/@angular/cli/bin/ng", "serve", "--host", "0.0.0.0" ]

