package main

import (
	"flag"
	"fmt"
	"net/http"
)

func main() {
	addr := flag.String("addr", ":4000", "the server listen address")
	flag.Parse()

	fmt.Println("Hello world")

	http.ListenAndServe(*addr, nil)
}
