# stiahne package podľa aktuálnej architektúry dockeru (windows/linux/...)
FROM golang:1.19.4 AS build
WORKDIR /app
COPY models ./models
COPY rest-api ./rest-api
COPY router ./router
COPY db-service ./db-service
COPY main.go .

# zabezpečí statické linkovanie knižníc do výsledného programu
ENV CGO_ENABLED=0

RUN go mod init projekt-backend
RUN go mod tidy

# výsledkom príkazu je vykonávateľný súbor projekt-backend
RUN go build -a -o projekt-backend .

FROM scratch
# nasledujúci riadok treba odkomentovať v prípade produkčnej verzie
#ENV GIN_MODE=release
COPY --from=build /app/projekt-backend ./
EXPOSE 8080/tcp
ENTRYPOINT ["./projekt-backend"]