package server

import "context"

type page struct {
	Title string `json:"title"`
	Body  []byte `json:"body"`
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

func (s *server) getPageByTitle(title string) (page, error) {
	p := page{}
	err := s.db.QueryRow(context.Background(), `select title, body from page where title = $1`, title).Scan(&p.Title, &p.Body)
	if err != nil {
		return page{}, err
	}
	return p, nil
}
