include .env

BINARY_NAME=uiki

run:
	go run cmd/uiki/main.go

build:
	go build -o bin/$(BINARY_NAME) cmd/uiki/main.go

start:
	./bin/$(BINARY_NAME)

clean:
	rm -rf bin/

up:
	@goose -dir migrations/ postgres "user=${DATABASE_USER} password=${DATABASE_PASSWORD} dbname=${DATABASE_NAME} sslmode=disable" up

down:
	@goose -dir migrations/ postgres "user=${DATABASE_USER} password=${DATABASE_PASSWORD} dbname=${DATABASE_NAME} sslmode=disable" down

status:
	@goose -dir migrations/ postgres "user=${DATABASE_USER} password=${DATABASE_PASSWORD} dbname=${DATABASE_NAME} sslmode=disable" status
