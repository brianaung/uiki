package main

import (
	"flag"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	addr := flag.String("addr", ":4000", "the server listen address")
	flag.Parse()

	r := mux.NewRouter()

	// init dependencies
  s := &server{r: r}

	// catch routes
	s.route()

	http.ListenAndServe(*addr, r)
}
