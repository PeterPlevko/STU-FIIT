package Vava_Zadanie_3;

import Vava_Zadanie_3.Databases.RoomDatabase;
import Vava_Zadanie_3.Room.Room;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;

import java.io.IOException;

public class RoomCreationController {
    @FXML TextField category;
    @FXML TextField roomNumber;
    @FXML TextField info;
    @FXML TextField roomPrice;


    public void createRoom() throws IOException {
        boolean flag = true;
        if (category.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal kategoriu izby");
            errorAlert.showAndWait();
            flag = false;
        }
        if (roomNumber.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si cislo izby");
            errorAlert.showAndWait();
            flag = false;
        }
        if (info.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si informacie o izbe");
            errorAlert.showAndWait();
            flag = false;
        }

        if (flag == true){
            Room room = new Room(category.getText(),Integer.parseInt(roomNumber.getText()), info.getText(), Integer.parseInt(roomPrice.getText()));
            RoomDatabase.addToRoomList(room);
        }
        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }



}
