package server

func (s *server) route() {
	s.router.HandleFunc("/", s.handleLanding())
	s.router.HandleFunc("/view/{title}", s.handleView())
}
