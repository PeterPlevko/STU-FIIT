ARG NODE_IMAGE=node:18.17.0

FROM $NODE_IMAGE AS base
RUN apt-get update && apt-get install -y dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm install
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production --ignore-ts-errors

FROM base AS production

USER root

ENV NODE_ENV=production
ENV HOST=api.infocat.info
COPY --chown=node:node ./package*.json ./
RUN npm install
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .

# Install graphics magick   
RUN apt-get update && apt-get install -y graphicsmagick
RUN apt-get install -y python3-pip

RUN pip3 install pandas --break-system-packages
RUN pip3 install textdistance --break-system-packages
RUN rm -rf /var/cache/apk/*

CMD [ "dumb-init", "npm", "start" ]

