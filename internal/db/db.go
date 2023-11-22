package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect() *pgxpool.Pool {
	fmt.Println("Connecting to database...")
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	err = dbpool.Ping(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database connected.")

	return dbpool
}
