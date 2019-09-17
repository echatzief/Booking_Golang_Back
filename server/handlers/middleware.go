package handlers

import (
	"net/http"
	"strings"

	"../config"
)

//Authorization for every request in order to match it with our front
func AuthMiddle(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := strings.Split(r.Header.Get("Authorization"), " ")

		if len(auth) > 1 {
			if auth[1] == config.AUTHKEY {
				enableCors(&w, r)
				next.ServeHTTP(w, r)
			} else {
				w.WriteHeader(404)
			}
		} else if r.Method == "OPTIONS" {
			enableCors(&w, r)
			next.ServeHTTP(w, r)
		} else {
			w.WriteHeader(404)
		}
	})
}

func MiddleCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w, r)
		next.ServeHTTP(w, r)
	})
}
