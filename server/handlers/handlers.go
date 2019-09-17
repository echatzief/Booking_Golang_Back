package handlers

import (
	//"context"

	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"../config"
	"../models"
	//"go.mongodb.org/mongo-driver/bson"
)

//Generate a key in order to sent the requests
func CreateAuthKey(w http.ResponseWriter, r *http.Request) {
	credentials := models.Auth{Credential: config.AUTHKEY}
	toJSON, _ := json.Marshal(credentials)
	enableCors(&w, r)
	fmt.Println("Key Generated.")
	w.Write(toJSON)
}

//Create a booking
func CreateBooking(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodPost {
		//Retrieve the body data
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
		}

		//Body request to JSON
		newBooking := models.Booking{}
		json.Unmarshal(body, &newBooking)

		//Insert to collection
		dbClient := config.ConnectToDatabase()
		collection := dbClient.Database("booking_hair").Collection("Booking")
		fmt.Println(collection.Name())
		result, err := collection.InsertOne(context.Background(), newBooking)
		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Println(result)
		}
	}
}
func FetchBookings(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodGet {
		fmt.Println("Requested all the bookings")
	}
}
func LoginUser(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodPost {
		//Retrieve from body
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
		}

		//Body request to JSON
		newLogin := models.Login{}
		json.Unmarshal(body, &newLogin)

		//Check in order to login
		if newLogin.Username == config.ADMIN_NAME && newLogin.Password == config.ADMIN_PASS {
			message := models.Message{Success: true}
			toJSON, _ := json.Marshal(message)
			w.Write(toJSON)
		} else {
			message := models.Message{Success: false}
			toJSON, _ := json.Marshal(message)
			w.Write(toJSON)
		}
	}
}

func NotFound(w http.ResponseWriter, r *http.Request) {

}
