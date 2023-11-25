package server

import (
	"context"

	"github.com/gofrs/uuid/v5"
)

type user struct {
	Id       uuid.UUID
	Username string
	Password string
}

func (s *server) addUser(u *user) error {
	_, err := s.db.Exec(context.Background(), `insert into "user"(id, username, password) values($1, $2, $3)`, u.Id, u.Username, u.Password)
	return err
}

func (s *server) getOneUser(username string) (*user, error) {
	u := &user{}
	err := s.db.QueryRow(context.Background(), `select username, password from "user" where username = $1`, username).Scan(&u.Username, &u.Password)
	if err != nil {
		return nil, err
	}
	return u, nil
}
