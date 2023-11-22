package server

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (s *server) handleLanding() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		s.enableCors(&w)
		ps, err := s.getAllPages()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Println(ps)
		res, err := json.Marshal(ps)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(res)
	}
}
