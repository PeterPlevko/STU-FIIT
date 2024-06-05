package Vava_Zadanie_3;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Databases.CustomerDatabase;
import Vava_Zadanie_3.Databases.ReservationDatabase;
import Vava_Zadanie_3.Databases.RoomDatabase;
import Vava_Zadanie_3.Reservation.Reservation;
import Vava_Zadanie_3.Room.Room;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;

import java.io.IOException;
import java.net.URL;
import java.time.temporal.ChronoUnit;
import java.util.ResourceBundle;

public class CreateReservationController implements Initializable {
    @FXML DatePicker dateFrom;
    @FXML DatePicker dateTo;

    @FXML TableView<Room> rooms;
    @FXML private TableColumn<Room, String> kategoria;
    @FXML private TableColumn<Room, String> cisloIzby;
    @FXML private TableColumn<Room, String> info;
    @FXML private TableColumn<Room, String> cenaIzby;
    @FXML private ComboBox zakaznik;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        kategoria.setCellValueFactory(new PropertyValueFactory<Room, String>("category"));
        cisloIzby.setCellValueFactory(new PropertyValueFactory<Room, String>("roomNumber"));
        info.setCellValueFactory(new PropertyValueFactory<Room, String>("info"));
        cenaIzby.setCellValueFactory(new PropertyValueFactory<Room, String>("roomPrice"));
        ObservableList<Room> observableArrayList =
               FXCollections.observableArrayList(RoomDatabase.RoomList);
        rooms.setItems(observableArrayList);

        ObservableList<String> observableArrayList1 =
                FXCollections.observableArrayList(CustomerDatabase.getNameList());
        zakaznik.setItems(observableArrayList1);
    }

    public void sendIntoDatabase() throws IOException {
        Room room = rooms.getSelectionModel().getSelectedItem();
        String meno = (String) zakaznik.getSelectionModel().getSelectedItem();
        long daysBetween = ChronoUnit.DAYS.between(dateFrom.getValue(), dateTo.getValue());



        boolean dates = ReservationDatabase.checkIfDatesOverlap(dateFrom.getValue(), dateTo.getValue());

        if (dates){
            int price = ((int) daysBetween * room.getRoomPrice())   ;
            ReservationDatabase.addToReservationList(new Reservation(CustomerDatabase.getCustomerByName(meno), RoomDatabase.getRoomByNumber(room.getRoomNumber()), dateFrom.getValue(), dateTo.getValue(), price));
            Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
            Scene scene = new Scene(root);
            MainController.primaryStage.setScene(scene);
            MainController.primaryStage.show();

        }
        else{

            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Error");
            errorAlert.setContentText("Rezervacia v takomto datume uz je zmen datumy");
            errorAlert.showAndWait();
        }

    }




}
