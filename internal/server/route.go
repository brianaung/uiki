package server

func (s *server) route() {
	s.router.HandleFunc("/", s.handleLanding())
}
