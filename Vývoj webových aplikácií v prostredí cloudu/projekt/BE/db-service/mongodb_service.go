package dbservice

import (
	"context"
	"errors"
	"log"
	"os"
	"projekt-backend/models"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var myMongoDbClient *mongo.Client
var myDBName string = "PpRerkoDB"

func Connect() {
	ctx, contextCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer contextCancel()

	var monogdbUserName = os.Getenv("MONGODB_USERNAME")
	var mongodbPassword = os.Getenv("MONGODB_PASSWORD")
	var mongodbURI = os.Getenv("MONGODB_URI")
	if len(mongodbURI) == 0 {
		mongodbURI = "localhost:27017"
	}
	var uri = "mongodb://" + mongodbURI
	if len(monogdbUserName) != 0 && len(mongodbPassword) != 0 {
		uri = "mongodb://" + monogdbUserName + ":" + mongodbPassword + "@" + mongodbURI
	}
	log.Printf("Using URI: " + uri)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri).SetConnectTimeout(10*time.Second))
	if err != nil {
		panic(err)
	}

	myMongoDbClient = client
}

func Disconnect() {
	if myMongoDbClient != nil {
		if err := myMongoDbClient.Disconnect(context.Background()); err != nil {
			panic(err)
		}
	}
}

func CreateAmbulance(ambulance *models.Ambulance) error {
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Ambulances")
	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: ambulance.Id}})
	if err != nil {
		return err
	}
	var ambulances []models.Ambulance
	err = cursor.All(ctx, &ambulances)
	if err != nil {
		return err
	}

	if len(ambulances) > 0 {
		errorMessage := "Ambulance with following id already exists: " + ambulance.Id
		return errors.New(errorMessage)
	}

	_, err = collection.InsertOne(ctx, ambulance)
	return err
}

func UpdateAmbulance(id string, ambulance models.Ambulance) (*mongo.UpdateResult, error) {
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Ambulances")

	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return nil, err
	}

	var ambulances []models.Ambulance
	err = cursor.All(ctx, &ambulances)
	if err != nil {
		return nil, err
	}

	countOfAppointWithId := len(ambulances)
	if countOfAppointWithId == 0 {
		errorMessage := "Ambulance with following id does not exist: " + id
		return nil, errors.New(errorMessage)
	}

	filter := bson.D{{Key: "Id", Value: id}}
	updateRes, err := collection.ReplaceOne(ctx, filter, ambulance)
	if err != nil {
		return nil, err
	}

	return updateRes, nil
}

func GetAmbulance(id string) (models.Ambulance, error) {
	ambulance, _, err := getAmbulance(id)
	return ambulance, err
}

func getAmbulance(id string) (models.Ambulance, *mongo.Collection, error) {
	emptyAmbulance := models.Ambulance{}
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Ambulances")
	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return emptyAmbulance, nil, err
	}

	var ambulances []models.Ambulance
	err = cursor.All(ctx, &ambulances)
	if err != nil {
		return emptyAmbulance, nil, err
	}

	countOfAppointWithId := len(ambulances)
	if countOfAppointWithId == 0 {
		errorMessage := "Ambulance with following id does not exist: " + id
		return emptyAmbulance, nil, errors.New(errorMessage)
	}

	if countOfAppointWithId > 1 {
		errorMessage := "There are" + strconv.Itoa(countOfAppointWithId) + "ambulances with following id:" + id
		return emptyAmbulance, nil, errors.New(errorMessage)
	}

	return ambulances[0], collection, nil
}

func GetAllAmbulances() ([]models.Ambulance, error) {
	emptyAmbulances := []models.Ambulance{}
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Ambulances")
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return emptyAmbulances, err
	}

	var ambulances []models.Ambulance
	err = cursor.All(ctx, &ambulances)
	if err != nil {
		return emptyAmbulances, err
	}

	/*
		if ambulances == nil {
			return emptyAmbulances, nil
		}
	*/

	return ambulances, nil
}

func DeleteAmbulance(id string) (*mongo.DeleteResult, error) {
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Ambulances")

	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return nil, err
	}

	var ambulances []models.Ambulance
	err = cursor.All(ctx, &ambulances)
	if err != nil {
		return nil, err
	}

	countOfAppointWithId := len(ambulances)
	if countOfAppointWithId == 0 {
		errorMessage := "Ambulance with following id does not exist: " + id
		return nil, errors.New(errorMessage)
	}

	collection2 := defaultDb.Collection("Appointments")
	filter := bson.D{{Key: "AmbulanceId", Value: id}}
	res, err := collection2.DeleteMany(ctx, filter)
	if err != nil {
		return nil, err
	}

	res, err = collection.DeleteOne(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return nil, err
	}
	return res, nil
}

/* appointments */

func CreateAppointment(appointment *models.MedicalAppointment) error {
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Appointments")
	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: appointment.Id}})
	if err != nil {
		return err
	}
	var appointments []models.MedicalAppointment
	err = cursor.All(ctx, &appointments)
	if err != nil {
		return err
	}

	if len(appointments) > 0 {
		errorMessage := "Appointment with following id already exists: " + appointment.Id
		return errors.New(errorMessage)
	}

	_, err = GetAmbulance(appointment.AmbulanceId)
	if err != nil {
		errorMessage := "Ambulance with following id does not exist: " + appointment.AmbulanceId
		return errors.New(errorMessage)
	}

	_, err = collection.InsertOne(ctx, appointment)
	return err
}

func GetAppointment(id string) (models.MedicalAppointment, error) {
	appointment, _, err := getAppointment(id)
	return appointment, err
}

func getAppointment(id string) (models.MedicalAppointment, *mongo.Collection, error) {
	emptyAppointment := models.MedicalAppointment{}
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Appointments")
	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return emptyAppointment, nil, err
	}

	var appointments []models.MedicalAppointment
	err = cursor.All(ctx, &appointments)
	if err != nil {
		return emptyAppointment, nil, err
	}

	countOfAppointWithId := len(appointments)
	if countOfAppointWithId == 0 {
		errorMessage := "Appointment with following id does not exist: " + id
		return emptyAppointment, nil, errors.New(errorMessage)
	}

	if countOfAppointWithId > 1 {
		errorMessage := "There are" + strconv.Itoa(countOfAppointWithId) + "appointments with following id:" + id
		return emptyAppointment, nil, errors.New(errorMessage)
	}

	return appointments[0], collection, nil
}

func DeleteAppointment(id string) (*mongo.DeleteResult, error) {
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Appointments")

	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return nil, err
	}

	var appointments []models.MedicalAppointment
	err = cursor.All(ctx, &appointments)
	if err != nil {
		return nil, err
	}

	countOfAppointWithId := len(appointments)
	if countOfAppointWithId == 0 {
		errorMessage := "Appointment with following id does not exist: " + id
		return nil, errors.New(errorMessage)
	}

	res, err := collection.DeleteOne(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return nil, err
	}
	return res, nil
}

func GetAllAppointments() ([]models.MedicalAppointment, error) {
	emptyAppoinments := []models.MedicalAppointment{}
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Appointments")
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return emptyAppoinments, err
	}

	var appointments []models.MedicalAppointment
	err = cursor.All(ctx, &appointments)
	if err != nil {
		return emptyAppoinments, err
	}

	/*
		if appointments == nil {
			return emptyAppoinments, nil
		}
	*/

	return appointments, nil
}

func UpdateAppointment(id string, appointment models.MedicalAppointment) (*mongo.UpdateResult, error) {
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Appointments")

	cursor, err := collection.Find(ctx, bson.D{{Key: "Id", Value: id}})
	if err != nil {
		return nil, err
	}

	var appointments []models.MedicalAppointment
	err = cursor.All(ctx, &appointments)
	if err != nil {
		return nil, err
	}

	countOfAppointWithId := len(appointments)
	if countOfAppointWithId == 0 {
		errorMessage := "Appointment with following id does not exist: " + id
		return nil, errors.New(errorMessage)
	}

	_, err = GetAmbulance(appointment.AmbulanceId)
	if err != nil {
		errorMessage := "Ambulance with following id does not exist: " + appointment.AmbulanceId
		return nil, errors.New(errorMessage)
	}

	filter := bson.D{{Key: "Id", Value: id}}
	updateRes, err := collection.ReplaceOne(ctx, filter, appointment)
	if err != nil {
		return nil, err
	}

	return updateRes, nil
}

func GetAmbulanceAppointments(id string) ([]models.MedicalAppointment, error) {
	emptyAppoinments := []models.MedicalAppointment{}
	ctx, contextCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer contextCancel()

	defaultDb := myMongoDbClient.Database(myDBName)
	collection := defaultDb.Collection("Appointments")
	log.Print("IDDDDDD ", id)
	cursor, err := collection.Find(ctx, bson.D{{Key: "AmbulanceId", Value: id}})
	if err != nil {
		return emptyAppoinments, err
	}

	var appointments []models.MedicalAppointment
	err = cursor.All(ctx, &appointments)
	if err != nil {
		return emptyAppoinments, err
	}

	/*
		if appointments == nil {
			return emptyAppoinments, nil
		}
	*/

	return appointments, nil
}
