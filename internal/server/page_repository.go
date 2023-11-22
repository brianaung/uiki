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
