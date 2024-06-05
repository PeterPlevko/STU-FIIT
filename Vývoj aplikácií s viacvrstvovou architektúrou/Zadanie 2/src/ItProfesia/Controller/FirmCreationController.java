package ItProfesia.Controller;

import ItProfesia.Databases.FirmsDatabase;
import ItProfesia.Firms.Firm;
import ItProfesia.MainController;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;

import java.io.IOException;

public class FirmCreationController {
    @FXML
    private TextField nameOfFirm;
    @FXML
    private TextField areaOfBusiness;
    @FXML
    private TextField numberOfEmployees;
    @FXML
    private TextField logo;

    public void sendIntoDatabase() throws IOException {
        boolean flag = true;
        if (nameOfFirm.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si nazov firmy");
            errorAlert.showAndWait();
            flag = false;
        }
        if (areaOfBusiness.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si area of business");
            errorAlert.showAndWait();
            flag = false;
        }
        if (numberOfEmployees.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si pocet zamestancov");
            errorAlert.showAndWait();
            flag = false;
        }


        if (flag == true) {
            FirmsDatabase.addToFirmList(new Firm(nameOfFirm.getText(), areaOfBusiness.getText(), Integer.parseInt(numberOfEmployees.getText())));
            Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
            Scene scene = new Scene(root);
            MainController.primaryStage.setScene(scene);
            MainController.primaryStage.show();
        }
        if (flag == false){
            Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
            Scene scene = new Scene(root);
            MainController.primaryStage.setScene(scene);
            MainController.primaryStage.show();
        }

    }




}
