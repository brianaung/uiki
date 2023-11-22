package server

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
)

type server struct {
	addr   *string
	router *mux.Router
	db     *pgxpool.Pool
}

func NewServer(addr *string, router *mux.Router, db *pgxpool.Pool) *server {
	s := &server{addr: addr, router: router, db: db}
	s.route()

	fmt.Println("Server started on port", *addr)

	return s
}

func (s *server) enableCors(w *http.ResponseWriter) {
	// todo: limit origins to client
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
