BINARY_NAME=uiki

run:
	go run cmd/uiki/*.go

build:
	go build -o bin/$(BINARY_NAME) cmd/uiki/*.go

start:
	./bin/$(BINARY_NAME)
