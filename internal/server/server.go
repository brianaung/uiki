package server

import (
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
)

type server struct {
	router *mux.Router
	db     *pgxpool.Pool
}

func NewServer(router *mux.Router, db *pgxpool.Pool) *server {
	s := &server{router: router, db: db}
	s.route()

	return s
}
