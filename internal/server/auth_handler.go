package server

import (
	"net/http"

	"github.com/gofrs/uuid/v5"
	"golang.org/x/crypto/bcrypt"
)

func (s *server) handleRegister() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// ...
		username := r.FormValue("username")
		password := r.FormValue("password")

		// input validation
		// 1. username should be unique
		// 2. username should be valid format
		// 3. password should be strong enough

		hashedPassword, err := hashPassword(password)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		id := uuid.Must(uuid.NewV4())
		u := &user{Id: id, Username: username, Password: hashedPassword}
		err = s.addUser(u)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		w.Write([]byte(username))
		w.Write([]byte(password))
	}
}

func (s *server) handleLogin() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.FormValue("username")
		password := r.FormValue("password")

		u, err := s.getOneUser(username)
		if err != nil {
			// user not found
			w.Write([]byte("user not found"))
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
		if err != nil {
			// wrong password
			w.Write([]byte("wrong password"))
			return
		}

		w.Write([]byte("success"))

		// ...
		// check if username exists
		// match the stored hashpassword and current password
		// if match, authenticated!
	}
}

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)
	return string(hashedPassword), err
}
