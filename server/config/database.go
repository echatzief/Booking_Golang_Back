package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectToDatabase() *mongo.Client {

	//Set up a context required by mongo.Connect
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	//To close the connection at the end
	defer cancel()
	//We need to set up a client first
	//It takes the URI of your database
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://<username>:<password>@ds235181.mlab.com:35181/booking_hair?retryWrites=false"))
	if err != nil {
		log.Fatal(err)
	}
	//Call the connect function of client
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	//Checking the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database connected")
	return client
}
func Disconnect(client *mongo.Client) {
	err := client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection to MongoDB closed.")
}
