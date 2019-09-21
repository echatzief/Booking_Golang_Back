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

	//Client
	http.Handle("/api/create/booking", handlers.AuthMiddle(http.HandlerFunc(handlers.CreateBooking)))
	http.Handle("/api/booking/find", handlers.AuthMiddle(http.HandlerFunc(handlers.FindBooking)))
	http.Handle("/api/booking/edit", handlers.AuthMiddle(http.HandlerFunc(handlers.EditBooking)))

	//Admin
	http.Handle("/api/bookings", handlers.AuthAdminMiddle(http.HandlerFunc(handlers.FetchBookings)))
	http.Handle("/api/bookings/delete", handlers.AuthAdminMiddle(http.HandlerFunc(handlers.DeleteBooking)))

	fmt.Println("Application running at localhost:", config.PORT)
	http.ListenAndServe(config.PORT, nil)
}
