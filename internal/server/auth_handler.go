package server

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gofrs/uuid/v5"
	"github.com/golang-jwt/jwt/v5"
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

		hashedPassword, err := hashAndSalt(password)
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

		// create token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"username": u.Username,
		})

		tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
		if err != nil {
			w.Write([]byte(err.Error()))
			return
		}

		w.Write([]byte(tokenString))
	}
}

func (s *server) withAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// tokenString := r.Header.Get("Authorization")

		// sample token
		tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UifQ.OFY_3SbHl2YaM7Y4Lj24eVMtcDaGEZU7KRzYCV4cqog"

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(err.Error()))
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); !ok || !token.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("unauthorized"))
			return
		} else {
			fmt.Println(claims)
		}

		next(w, r)
	}
}

func hashAndSalt(password string) (string, error) {
	// GenerateFromPassword salt the password for us aside from hashing it
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)
	return string(hashedPassword), err
}
