package server

import (
	"context"

	"github.com/gofrs/uuid/v5"
)

type page struct {
	Id    uuid.UUID `json:"id"`
	Title string    `json:"title"`
	Body  string    `json:"body"`
}

func (s *server) getAllPages() ([]page, error) {
	rows, err := s.db.Query(context.Background(), `select title, body from page`)
	if err != nil {
		return nil, err
	}

	ps := []page{}
	for rows.Next() {
		p := page{}
		err := rows.Scan(&p.Title, &p.Body)
		if err != nil {
			return nil, err
		}
		ps = append(ps, p)
	}

	return ps, nil
}

func (s *server) getOnePage(title string) (*page, error) {
	p := &page{}
	err := s.db.QueryRow(context.Background(), `select title, body from page where title = $1`, title).Scan(&p.Title, &p.Body)
	if err != nil {
		return nil, err
	}
	return p, nil
}

func (s *server) addPage(p *page) error {
	id := uuid.Must(uuid.NewV4())
	_, err := s.db.Exec(context.Background(), `insert into page(id, title, body) values($1, $2, $3)`, id, p.Title, p.Body)
	return err
}

func (s *server) updatePage(oldTitle string, p *page) error {
	_, err := s.db.Exec(context.Background(), `update page set title = $1, body = $2 where title = $3`, p.Title, p.Body, oldTitle)
	return err
}

func (s *server) deletePage(title string) error {
	_, err := s.db.Exec(context.Background(), `delete from page where title = $1`, title)
	return err
}

func (s *server) pageExists(title string) (bool, error) {
	s.db.QueryRow(context.Background(), `select title from page where title = $1`, title)
	exists := false
	err := s.db.QueryRow(context.Background(), `select exists(select 1 from page where title = $1)`, title).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}
