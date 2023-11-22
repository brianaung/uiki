package server

import "github.com/gorilla/mux"

type server struct {
	router *mux.Router
}

func NewServer(router *mux.Router) *server {
	s := &server{router: router}
	s.route()

	return s
}
