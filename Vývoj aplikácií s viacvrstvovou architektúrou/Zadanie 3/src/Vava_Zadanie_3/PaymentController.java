package Vava_Zadanie_3;

import Vava_Zadanie_3.Databases.PlatbaDatabase;
import Vava_Zadanie_3.Databases.ReservationDatabase;
import Vava_Zadanie_3.Databases.RoomDatabase;
import Vava_Zadanie_3.Databases.UbytovanieDatabase;
import Vava_Zadanie_3.Platba.Platba;
import Vava_Zadanie_3.Room.Room;
import Vava_Zadanie_3.Ubytovanie.Ubytovanie;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.util.ResourceBundle;

public class PaymentController implements Initializable {
    @FXML
    TableView ubytovanie;
    @FXML
    TableColumn<Ubytovanie, String> ubytovanieColumn;

    @FXML ComboBox typPlatby;
    @FXML DatePicker datumPlatby;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        ubytovanieColumn.setCellValueFactory(new PropertyValueFactory<Ubytovanie, String>("CustomerName"));
        ObservableList<Ubytovanie> observableArrayList =
                FXCollections.observableArrayList(UbytovanieDatabase.UbytovanieList);
        ubytovanie.setItems(observableArrayList);

        ObservableList<String> data = FXCollections.observableArrayList("V hotovosti", "Bez Hotovostna");
        typPlatby.setItems(data);
    }


    public void sendIntoDatabase() throws IOException {
        Ubytovanie mesie = (Ubytovanie) ubytovanie.getSelectionModel().getSelectedItem();

        Ubytovanie ubytovanieN = UbytovanieDatabase.getUbytovanieByCustomerName(mesie.getCustomerName());
        ubytovanieN.setIzZaplatena("Ano");
        LocalDate datumPlatbyN = datumPlatby.getValue();
        PlatbaDatabase.addToPlatbaList(new Platba(ubytovanieN, datumPlatbyN, (String) typPlatby.getSelectionModel().getSelectedItem()));
        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }



}
