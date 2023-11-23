package server

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func (s *server) handleLanding() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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

func (s *server) handleNew() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}

func (s *server) handleEdit() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}

func (s *server) handleSave() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}

func (s *server) handleDelete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
	}
}
