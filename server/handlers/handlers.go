package handlers

import (
	//"context"

	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"../config"
	"../models"
	"go.mongodb.org/mongo-driver/bson"
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
		config.Disconnect(dbClient)
		toJSON, _ := json.Marshal(result)
		w.Write(toJSON)
	}
}
func FetchBookings(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodGet {
		fmt.Println("Requested all the bookings")

		dbClient := config.ConnectToDatabase()
		collection := dbClient.Database("booking_hair").Collection("Booking")
		fmt.Println(collection.Name())

		var results []*models.Booking
		cur, err := collection.Find(context.TODO(), bson.D{})
		if err != nil {
			log.Fatal(err)
		}
		for cur.Next(context.TODO()) {
			var elem models.Booking
			err := cur.Decode(&elem)
			if err != nil {
				log.Fatal(err)
			}

			results = append(results, &elem)
		}

		toJSON, _ := json.Marshal(results)
		config.Disconnect(dbClient)
		w.Write(toJSON)
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
			message := models.Message{Success: true, Credential: config.ADMIN_AUTHKEY}
			toJSON, _ := json.Marshal(message)
			w.Write(toJSON)
		} else {
			message := models.Message{Success: false, Credential: config.ADMIN_AUTHKEY}
			toJSON, _ := json.Marshal(message)
			w.Write(toJSON)
		}
	}
}

func DeleteBooking(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
		}

		booking := models.Booking{}
		json.Unmarshal(body, &booking)
		fmt.Println(booking.ID)

		dbClient := config.ConnectToDatabase()
		collection := dbClient.Database("booking_hair").Collection("Booking")
		fmt.Println(collection.Name())

		result, err := collection.DeleteOne(context.TODO(), bson.M{"_id": booking.ID})
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(result)
	}
}

func FindBooking(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
		}
		booking := models.Booking{}
		json.Unmarshal(body, &booking)
		fmt.Println(booking.ID)

		dbClient := config.ConnectToDatabase()
		collection := dbClient.Database("booking_hair").Collection("Booking")
		fmt.Println(collection.Name())

		result := models.Booking{}
		err = collection.FindOne(context.TODO(), bson.M{"_id": booking.ID}).Decode(&result)
		if err != nil {
			fmt.Println(err)
		}

		toJSON, _ := json.Marshal(result)
		config.Disconnect(dbClient)
		w.Write(toJSON)
	}
}
func EditBooking(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println(err)
		}
		booking := models.Booking{}
		json.Unmarshal(body, &booking)

		dbClient := config.ConnectToDatabase()
		collection := dbClient.Database("booking_hair").Collection("Booking")

		result, resErr := collection.UpdateOne(context.TODO(), bson.M{"_id": booking.ID}, bson.M{"$set": booking})
		if resErr != nil {
			fmt.Println(err)
		}
		toJSON, _ := json.Marshal(result)
		config.Disconnect(dbClient)
		w.Write(toJSON)
	}
}
func NotFound(w http.ResponseWriter, r *http.Request) {

}
