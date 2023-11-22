package server

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func (s *server) handleLanding() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		s.enableCors(&w)
		ps, err := s.getAllPages()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		res, err := json.Marshal(ps)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(res)
	}
}

func (s *server) handleView() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		s.enableCors(&w)
		vars := mux.Vars(r)
		title := vars["title"]

		p, err := s.getPageByTitle(title)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		res, err := json.Marshal(p)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(res)
	}
}
