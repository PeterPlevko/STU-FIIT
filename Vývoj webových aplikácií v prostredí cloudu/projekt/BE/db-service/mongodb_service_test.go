package dbservice

import (
	"fmt"
	"projekt-backend/models"

	"testing"
)

func TestCreateDeleteAmbulance(t *testing.T) {
	t.Setenv("MONGODB_USERNAME", "user")
	t.Setenv("MONGODB_PASSWORD", "password")
	dbgID := "test_id_not_used_by_anyone_else_for_sure"

	Connect()
	defer Disconnect()

	ambulance := models.Ambulance{}
	ambulance.Id = dbgID
	ambulance.DoctorName = "testAmbulanceDoctor"
	ambulance.Location = "testAmbulanceLocation"
	ambulance.Name = "testAmbulanceName"

	err := CreateAmbulance(&ambulance)
	if err != nil {
		fmt.Printf("Ambulance creation failed! %s\n", err)
	}
	fmt.Printf("Ambulance creation successful.\n")

	_, err = GetAmbulance(dbgID)
	if err != nil {
		fmt.Printf("Ambulance retrieval failed %s\n", err)
	}
	fmt.Printf("Ambulance retrieval succesful\n")

	_, err = DeleteAmbulance(dbgID)
	if err != nil {
		fmt.Printf("Ambulance deletion failed %s\n", err)
	}
	fmt.Printf("Ambulance deletion succesful\n")
}
