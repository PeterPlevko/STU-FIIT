FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]