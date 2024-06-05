package Messie;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import Messie.classes.Merchandise;

import java.io.IOException;

public class MerchandiseController {

    @FXML
    private TextField name;
    @FXML
    private TextField about;
    @FXML
    private TextField price;

    public void text() throws IOException {

        boolean flag = true;
        if (name.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si meno");
            errorAlert.showAndWait();
            flag = false;
        }
        if (about.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si popis");
            errorAlert.showAndWait();
            flag = false;
        }
        if (price.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si cenu");
            errorAlert.showAndWait();
            flag = false;
        }

        if (flag == true) {
            Database.merchandises.add(new Merchandise(name.getText(), about.getText(), price.getText()));
        }
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
    }

}

