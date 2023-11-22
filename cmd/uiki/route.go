package main

func (s *server) route() {
	s.r.HandleFunc("/", s.handleLanding())
}
