package ItProfesia.Controller;

import ItProfesia.Databases.SpecialistsDatabase;
import ItProfesia.MainController;
import ItProfesia.Specialists.Admin;
import ItProfesia.Specialists.Programmer;
import ItProfesia.Specialists.SecurityConsultant;
import ItProfesia.Specialists.Specialist;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.text.Text;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;



public class SpecialistCreationController implements Initializable {


    @FXML
    private ComboBox typeOfSpecialistComboBox;
    @FXML
    private Text differentText;
    @FXML
    private Text zaradenie;
    @FXML
    private TextField zaradenieTextField;
    @FXML
    private ComboBox classDependable;
    @FXML
    private TextField dayPrice;
    @FXML
    private TextField praxisLength;
    @FXML
    private TextField education;
    @FXML
    private TextField certificates;

    /**
     * tato metoda mi vytvori combobox s moznostami akeho specialistu si mozem vybrat
     * @param url
     * @param resourceBundle
     */
    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        ObservableList<String> options =
                FXCollections.observableArrayList(
                        "Bezpecnostny konzultant",
                        "Programator",
                        "Administrator"
                );
        typeOfSpecialistComboBox.setItems(options);
    }


    public void chooseType()
    {
        String specialistType = (String) typeOfSpecialistComboBox.getValue();
        if (specialistType.equals("Bezpecnostny konzultant")){
            differentText.setText("Auditor NBU");
            ObservableList<String> options =
                    FXCollections.observableArrayList(
                            "ano",
                            "nie"
                    );
            classDependable.setItems(options);
        }
        if (specialistType.equals("Programator")){
            differentText.setText("Zaradenie");
            ObservableList<String> options =
                    FXCollections.observableArrayList(
                            "Java",
                            "C++",
                            "ABAP",
                            "VBA",
                            "Python",
                            "Ruby",
                            "IOS"
                    );
            classDependable.setItems(options);
        }
        if (specialistType.equals("Administrator")){
            differentText.setText("Platforma");
            ObservableList<String> options =
                    FXCollections.observableArrayList(
                            "Windows",
                            "MacOS",
                            "Linux"
                    );
            classDependable.setItems(options);
            zaradenie.setText("Zaradenie");
            zaradenieTextField.setVisible(true);
        }
    }

    public void sendIntoDatabase() throws IOException {
        boolean flag = true;
        String specialistType = (String) typeOfSpecialistComboBox.getValue();
        String classDependableThing = (String) classDependable.getValue();

        int userId = 0;
        for(Specialist i : SpecialistsDatabase.workerList) {
            if (i.getUserId() > userId){
                userId = i.getUserId();
            }
        }
        userId = userId + 1;

        if (dayPrice.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si cenu za den");
            errorAlert.showAndWait();
            flag = false;
        }
        if (praxisLength.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si dlzku praxe");
            errorAlert.showAndWait();
            flag = false;
        }
        if (education.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si najvyssie dosiahnute vzdelanie");
            errorAlert.showAndWait();
            flag = false;
        }

        if (certificates.getText().equals("")) {
            Alert errorAlert = new Alert(Alert.AlertType.ERROR);
            errorAlert.setHeaderText("Nespravny vstup");
            errorAlert.setContentText("Nezadal si certifikaty");
            errorAlert.showAndWait();
            flag = false;
        }




        if (specialistType.equals("Bezpecnostny konzultant")){
            boolean classDependableThingBoolean;
            if (classDependableThing.equals("ano")){
                classDependableThingBoolean = true;
            }
            else{
                classDependableThingBoolean = false;
            }

            if (flag == true) {
                SecurityConsultant securityConsultant = new SecurityConsultant(Integer.parseInt(dayPrice.getText()), Integer.parseInt(praxisLength.getText()), education.getText(), classDependableThingBoolean, certificates.getText(), "SecurityConsultant", 1);
                securityConsultant.setUserId(userId);
                SpecialistsDatabase.addToWorkerList(securityConsultant);
            }
        }

        if (specialistType.equals("Programator")) {
            if (flag == true) {
                Programmer programmer = new Programmer(Integer.parseInt(dayPrice.getText()), Integer.parseInt(praxisLength.getText()), education.getText(), classDependableThing, certificates.getText(), "Programmer", 1);
                programmer.setUserId(userId);
                SpecialistsDatabase.addToWorkerList(programmer);
            }
        }

        if (specialistType.equals("Administrator")){
            if (flag == true) {
                Admin admin = new Admin(Integer.parseInt(dayPrice.getText()), Integer.parseInt(praxisLength.getText()), education.getText(), classDependableThing, certificates.getText(), zaradenieTextField.getText(), "Admin", 1);
                admin.setUserId(userId);
                SpecialistsDatabase.addToWorkerList(admin);
            }
        }

        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }




}
