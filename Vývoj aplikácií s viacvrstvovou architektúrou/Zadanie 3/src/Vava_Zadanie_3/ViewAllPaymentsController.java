package Vava_Zadanie_3;

import Vava_Zadanie_3.Databases.PlatbaDatabase;
import Vava_Zadanie_3.Databases.UbytovanieDatabase;
import Vava_Zadanie_3.Platba.Platba;
import Vava_Zadanie_3.Ubytovanie.Ubytovanie;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class ViewAllPaymentsController implements Initializable {

    @FXML
    TableView<Platba> platba;
    @FXML private TableColumn<Ubytovanie, String> zakaznik;
    @FXML private TableColumn<Ubytovanie, String> kategoriaIzby;
    @FXML private TableColumn<Ubytovanie, String> cisloIzby;
    @FXML private TableColumn<Ubytovanie, String> info;
    @FXML private TableColumn<Ubytovanie, String> cenaIzby;
    @FXML private TableColumn<Ubytovanie, String> rezervaciaOd;
    @FXML private TableColumn<Ubytovanie, String> rezervaciaDo;
    @FXML private TableColumn<Ubytovanie, String> cena;
    @FXML private TableColumn<Ubytovanie, String> datumZaplatenia;
    @FXML private TableColumn<Ubytovanie, String> typPlatby;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        zakaznik.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("CustomerName"));
        kategoriaIzby.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("RoomCategory"));
        cisloIzby.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("RoomNumber"));
        info.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("RoomInfo"));
        cenaIzby.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("RoomPrice"));
        rezervaciaOd.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("ReservationFrom"));
        rezervaciaDo.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("ReservationTo"));
        cena.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("Price"));
        datumZaplatenia.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("DatumZaplatenia"));
        typPlatby.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("TypPlatby"));


        ObservableList<Platba> observableArrayList =
                FXCollections.observableArrayList(PlatbaDatabase.PlatbaList);
        platba.setItems(observableArrayList);
    }



    public void BackToMenu() throws IOException {

        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }






}
