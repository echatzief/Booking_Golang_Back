package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Booking struct {
	ID       *primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Name     string              `json:"name" bson:"name"`
	Email    string              `json:"email" bson:"email"`
	Comments string              `json:"comments" bson:"comments"`
	Date     string              `json:"date" bson:"date"`
	CAt      string              `json:"cAt" bson:"cAt"`
}
