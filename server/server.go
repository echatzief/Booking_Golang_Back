package main

import (
	"fmt"
	"net/http"

	"./config"
	"./handlers"
)

func main() {
	// ------ Routes ------ //
	//Authentication
	http.HandleFunc("/public/auth", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			handlers.CreateAuthKey(w, r)
		}
	})

	//Login
	http.Handle("/public/login", handlers.MiddleCors(http.HandlerFunc(handlers.LoginUser)))

	//Requests
	http.Handle("/api/create/booking", handlers.AuthMiddle(http.HandlerFunc(handlers.CreateBooking)))
	http.Handle("/api/bookings", handlers.AuthMiddle(http.HandlerFunc(handlers.FetchBookings)))

	fmt.Println("Application running at localhost:", config.PORT)
	http.ListenAndServe(config.PORT, nil)
}
