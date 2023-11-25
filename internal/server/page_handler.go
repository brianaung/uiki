package server

import (
	"encoding/json"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"
)

func (s *server) handleLanding() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ps, err := s.getAllPages()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error getting file"))
			return
		}

		res, err := json.Marshal(ps)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error getting file"))
			return
		}

		w.Write(res)
	}
}

func (s *server) handleView() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		title := vars["title"]
		title, _ = url.QueryUnescape(title)

		p, err := s.getOnePage(title)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error getting file"))
			return
		}

		res, err := json.Marshal(p)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error getting file"))
			return
		}

		w.Write(res)
	}
}

func (s *server) handleSave() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		title := r.FormValue("title")
		body := r.FormValue("body")
		oldTitle := r.FormValue("oldTitle")
		oldTitle, _ = url.QueryUnescape(oldTitle)

		if exists, _ := s.pageExists(title); oldTitle != title && exists {
			w.WriteHeader(http.StatusConflict)
			w.Write([]byte("File name already exists"))
			return
		}

		page := &page{Title: title, Body: body}

		var err error
		if oldTitle == "" {
			err = s.addPage(page)
		} else {
			err = s.updatePage(oldTitle, page)
		}
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error saving file"))
		}
	}
}

func (s *server) handleDelete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		title := vars["title"]
		title, _ = url.QueryUnescape(title)

		err := s.deletePage(title)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error deleting file"))
		}
	}
}
