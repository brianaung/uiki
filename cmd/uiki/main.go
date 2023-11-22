package main

import (
	"flag"
	"net/http"

	"github.com/brianaung/uiki/internal/server"
	"github.com/gorilla/mux"
)

func main() {
	addr := flag.String("addr", ":4000", "the server listen address")
	flag.Parse()

	router := mux.NewRouter()

	// init dependencies
	server.NewServer(router)

	http.ListenAndServe(*addr, router)
}
