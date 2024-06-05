package ItProfesia.Controller;

import ItProfesia.Databases.SpecialistsDatabase;
import ItProfesia.Databases.ZmluvyDatabase;
import ItProfesia.MainController;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ComboBox;

import javax.swing.*;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class FirmViewController implements Initializable {

    @FXML private ComboBox zamestanci;
    public static String menofirmy;



    public void BackToMenu() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        try {
            ObservableList<String> observableArrayList =
                    FXCollections.observableArrayList(ZmluvyDatabase.getZmluvaByName(menofirmy).getWorkersSpecalists());
            zamestanci.setItems(observableArrayList);
        }
        catch(Exception e) {
            JOptionPane.showMessageDialog(null,
                    "Firma nema najatych ziadnych zamestnancov",
                    "Error",
                    JOptionPane.WARNING_MESSAGE);

        }


    }

    public void zmazZamestannca(){
        SpecialistsDatabase.getSpecialistByIdNull((String) zamestanci.getSelectionModel().getSelectedItem()).setAvailability(1);

    }



}
