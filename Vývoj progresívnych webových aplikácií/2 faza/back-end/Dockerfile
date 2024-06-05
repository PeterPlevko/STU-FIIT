FROM node:lts

ARG SERVER="."
ARG SERVER_src="."
ARG BUILD="./build"
ENV PORTS="3333"

WORKDIR ${SERVER}

EXPOSE ${PORTS}

COPY ${SERVER_src} ${SERVER}

RUN node ace build --production

WORKDIR ${BUILD}

RUN npm install pino-pretty

RUN npm ci --production

CMD ["node", "server.js"]
