package Vava_Zadanie_3;

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
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class ZrusRezervaciuController implements Initializable {

    @FXML
    TableView<Reservation> reservations;
    @FXML private TableColumn<Reservation, String> zakaznik;
    @FXML private TableColumn<Reservation, String> kategoriaIzby;
    @FXML private TableColumn<Reservation, String> cisloIzby;
    @FXML private TableColumn<Reservation, String> info;
    @FXML private TableColumn<Reservation, String> cenaIzby;
    @FXML private TableColumn<Reservation, String> rezervaciaOd;
    @FXML private TableColumn<Reservation, String> rezervaciaDo;
    @FXML private TableColumn<Reservation, String> cena;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        zakaznik.setCellValueFactory(new PropertyValueFactory<Reservation, String>("CustomerName"));
        kategoriaIzby.setCellValueFactory(new PropertyValueFactory<Reservation, String>("RoomCategory"));
        cisloIzby.setCellValueFactory(new PropertyValueFactory<Reservation, String>("RoomNumber"));
        info.setCellValueFactory(new PropertyValueFactory<Reservation, String>("RoomInfo"));
        cenaIzby.setCellValueFactory(new PropertyValueFactory<Reservation, String>("RoomPrice"));
        rezervaciaOd.setCellValueFactory(new PropertyValueFactory<Reservation, String>("ReservationFrom"));
        rezervaciaDo.setCellValueFactory(new PropertyValueFactory<Reservation, String>("ReservationTo"));
        cena.setCellValueFactory(new PropertyValueFactory<Reservation, String>("Price"));

        ObservableList<Reservation> observableArrayList =
                FXCollections.observableArrayList(ReservationDatabase.ReservationList);
        reservations.setItems(observableArrayList);
    }

    public void zrusRezervaciu() throws IOException {
        ReservationDatabase.removeFromDatabase(reservations.getSelectionModel().getSelectedItem());
        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();





    }



}
