package Vava_Zadanie_3;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;


import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class SetTimeController {


    @FXML private TextField rok;
    @FXML private TextField mesiac;
    @FXML private TextField den;

    public void setTime() throws ParseException, IOException {
        boolean flag = true;
        if (rok.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si rok");
            errorAlert.showAndWait();
            flag = false;
        }
        if (mesiac.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si mesiac");
            errorAlert.showAndWait();
            flag = false;
        }


        if (flag == true){
            LocalDate date = LocalDate.of(Integer.parseInt(rok.getText()), Integer.parseInt(mesiac.getText()), Integer.parseInt(den.getText()));
            MainController.dateFormat = date;
            Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
            Scene scene = new Scene(root);
            MainController.primaryStage.setScene(scene);
            MainController.primaryStage.show();
        }





    }


}
