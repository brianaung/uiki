BINARY_NAME=uiki

run:
	go run cmd/uiki/main.go

build:
	go build -o bin/$(BINARY_NAME) cmd/uiki/main.go

start:
	./bin/$(BINARY_NAME)
