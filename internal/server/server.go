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

func (s *server) route() {
	s.router.HandleFunc("/", s.withCorsEnabled(s.handleLanding()))
	s.router.HandleFunc("/view/{title}", s.withCorsEnabled(s.handleView()))

	// TODO: protect these routes
	s.router.HandleFunc("/save", s.withCorsEnabled(s.handleSave()))
	s.router.HandleFunc("/delete/{title}", s.withCorsEnabled(s.handleDelete()))
}

// middleware to enable cors
// similar method can be used to create middleware for auth
func (s *server) withCorsEnabled(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// TODO: limit origins to client
		w.Header().Set("Access-Control-Allow-Origin", "*")
		h(w, r)
	}
}
