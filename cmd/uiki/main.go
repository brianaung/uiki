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
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World"))
	})

	http.ListenAndServe(*addr, r)
}
