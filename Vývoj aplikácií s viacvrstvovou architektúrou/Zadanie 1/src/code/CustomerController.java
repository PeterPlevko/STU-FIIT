package Messie;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import Messie.classes.Customer;

import java.io.IOException;

public class CustomerController {
    @FXML
    private TextField nameSurname;
    @FXML
    private TextField address;
    @FXML
    private TextField city;
    @FXML
    private TextField postalCode;

    public void sendInfor() throws IOException {
        Boolean flag = true;
        if (nameSurname.getText().equals("")) {

            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si meno");
            errorAlert.showAndWait();
            flag = false;
        }
        if (address.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si adresu");
            errorAlert.showAndWait();
            flag = false;
        }
        if (city.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si mesto");
            errorAlert.showAndWait();
            flag = false;
        }
        if (postalCode.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si psc");
            errorAlert.showAndWait();
            flag = false;
        }




        if (flag == true) {
            Database.customers.add(new Customer(nameSurname.getText(), address.getText(), city.getText(), postalCode.getText()));
        }
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
    }




}
