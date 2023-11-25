package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/brianaung/uiki/internal/server"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func init() {
	// load .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	addr := flag.String("addr", ":4000", "the server listen address")
	flag.Parse()

	router := mux.NewRouter()

	fmt.Println("Connecting to database...")
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	err = dbpool.Ping(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	defer dbpool.Close()
	fmt.Println("Database connected.")

	// init dependencies
	server.NewServer(addr, router, dbpool)

	log.Fatal(http.ListenAndServe(*addr, router))
}
