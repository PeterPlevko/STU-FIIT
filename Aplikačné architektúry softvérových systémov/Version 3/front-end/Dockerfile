FROM node:16-alpine as build-stage

ARG PWA_src="."
ARG DIST="/pwa"

# Define arguments which can be overridden at build time
ARG API_URL
ARG NODE_ENV
ARG API_TOKEN

ENV API_URL $API_URL
ENV NODE_ENV $NODE_ENV
ENV API_TOKEN $API_TOKEN

WORKDIR ${DIST}

COPY ${PWA_src}/package*.json ./

RUN npm install
RUN npm install --include=dev
COPY ${PWA_src} .

RUN npm install -g @quasar/cli
RUN npx quasar build -m pwa

FROM node:16-alpine as production-stage

ARG DIST="/pwa"
ARG PWA="/myapp"

ENV HOST="0.0.0.0"
ENV PORT="8080"

WORKDIR ${PWA}

COPY --from=build-stage ${DIST}/dist/pwa ./

EXPOSE ${PORT}

RUN npm install -g @quasar/cli

CMD ["quasar", "serve"]
