package Vava_Zadanie_3;

import Vava_Zadanie_3.Databases.CustomerDatabase;
import Vava_Zadanie_3.Databases.ReservationDatabase;
import Vava_Zadanie_3.Databases.RoomDatabase;
import Vava_Zadanie_3.Databases.UbytovanieDatabase;
import Vava_Zadanie_3.Reservation.Reservation;
import Vava_Zadanie_3.Room.Room;
import Vava_Zadanie_3.Ubytovanie.Ubytovanie;
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

public class UbytovanieClovekaController implements Initializable {
    @FXML
    ComboBox maRezervaciu;
    @FXML ComboBox menoUzivatela;

    @FXML
    DatePicker dateFrom;
    @FXML DatePicker dateTo;

    @FXML
    TableView<Room> rooms;
    @FXML private TableColumn<Room, String> kategoria;
    @FXML private TableColumn<Room, String> cisloIzby;
    @FXML private TableColumn<Room, String> info;
    @FXML private TableColumn<Room, String> cenaIzby;
    @FXML private ComboBox zakaznik;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        ObservableList<String> data = FXCollections.observableArrayList("Mam rezervaciu", "Nemam rezervaciu");
        maRezervaciu.setItems(data);

        ObservableList<String> observableArrayList1 =
                FXCollections.observableArrayList(CustomerDatabase.getNameList());
        menoUzivatela.setItems(observableArrayList1);

        kategoria.setCellValueFactory(new PropertyValueFactory<Room, String>("category"));
        cisloIzby.setCellValueFactory(new PropertyValueFactory<Room, String>("roomNumber"));
        info.setCellValueFactory(new PropertyValueFactory<Room, String>("info"));
        cenaIzby.setCellValueFactory(new PropertyValueFactory<Room, String>("roomPrice"));
        ObservableList<Room> observableArrayList =
                FXCollections.observableArrayList(RoomDatabase.RoomList);
        rooms.setItems(observableArrayList);

        ObservableList<String> observableArrayList2 =
                FXCollections.observableArrayList(CustomerDatabase.getNameList());
        zakaznik.setItems(observableArrayList2);

    }


    public void checkReservation(){

        if(maRezervaciu.getSelectionModel().getSelectedItem().equals("Mam rezervaciu")) {
            menoUzivatela.setVisible(true);
        }
        else{
            dateFrom.setVisible(true);
            dateTo.setVisible(true);
            zakaznik.setVisible(true);
            rooms.setVisible(true);
        }


    }


    public void sendIntoDatabase() throws IOException {
        if(maRezervaciu.getSelectionModel().getSelectedItem().equals("Mam rezervaciu")) {
                String nameOfUser = (String) menoUzivatela.getSelectionModel().getSelectedItem();
                Reservation reservation = ReservationDatabase.getReservationByCustomerName(nameOfUser);
                UbytovanieDatabase.addToUbytovanieList(new Ubytovanie (reservation.getCustomer(), reservation.getRoom(), reservation.getReservationFrom(), reservation.getReservationTo(), reservation.getPrice()));
        }
        else{
            Room room = rooms.getSelectionModel().getSelectedItem();
            String meno = (String) zakaznik.getSelectionModel().getSelectedItem();
            long daysBetween = ChronoUnit.DAYS.between(dateFrom.getValue(), dateTo.getValue());


            boolean dates = UbytovanieDatabase.checkIfDatesOverlap(dateFrom.getValue(), dateTo.getValue());

            if (dates) {
                int price = ((int) daysBetween * room.getRoomPrice())  ; ;
                UbytovanieDatabase.addToUbytovanieList(new Ubytovanie(CustomerDatabase.getCustomerByName(meno), RoomDatabase.getRoomByNumber(room.getRoomNumber()), dateFrom.getValue(), dateTo.getValue(), price));
            } else {

                Alert errorAlert = new Alert(Alert.AlertType.ERROR);
                errorAlert.setHeaderText("Error");
                errorAlert.setContentText("Rezervacia v takomto datume uz je zmen datumy");
                errorAlert.showAndWait();
            }
        }


        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();

        }



}
