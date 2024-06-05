package Vava_Zadanie_3;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Databases.CustomerDatabase;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;


import java.io.IOException;

public class CustomerController {
    @FXML
    TextField meno;


    public void sendIntoDatabase() throws IOException {
        boolean flag = true;
        if (meno.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si svoje meno");
            errorAlert.showAndWait();
            flag = false;
        }
        if (flag == true){
            CustomerDatabase.addToCustomerList(new Customer(meno.getText()));
            Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
            Scene scene = new Scene(root);
            MainController.primaryStage.setScene(scene);
            MainController.primaryStage.show();
        }


    }


}
