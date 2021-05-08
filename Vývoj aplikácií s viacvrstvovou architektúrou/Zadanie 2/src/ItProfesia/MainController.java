package ItProfesia;

import ItProfesia.Controller.FirmViewController;
import ItProfesia.Databases.FirmsDatabase;
import ItProfesia.Databases.SpecialistsDatabase;
import ItProfesia.Databases.ZmluvyDatabase;
import ItProfesia.Firms.Firm;
import ItProfesia.Specialists.Admin;
import ItProfesia.Specialists.Programmer;
import ItProfesia.Specialists.SecurityConsultant;
import ItProfesia.Specialists.Specialist;
import ItProfesia.Zmluva.Zmluva;
import javafx.application.Application;
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
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class MainController extends Application implements Initializable {

    public static Stage primaryStage;
    @FXML
    private TableView<Specialist> workers;
    @FXML private TableColumn<Specialist, String> cost;
    @FXML private TableColumn<Specialist, String> praxisLength;
    @FXML private TableColumn<Specialist, String> education;
    @FXML private TableColumn<Specialist, String> certifications;
    @FXML private TableColumn<Specialist, String> zaradenie;
    @FXML private TableColumn<Specialist, String> preferovanyTypPlatformy;
    @FXML private TableColumn<Specialist, String> typSpecialistu;
    @FXML private TableColumn<Specialist, String> auditorNbu;
    @FXML private TableColumn<Specialist, String> available;
    @FXML private TableColumn<Specialist, String> userId;
    @FXML private ComboBox zamestannci;

    @FXML TableView<Firm> firms;
    @FXML private TableColumn<Firm, String> nazov;
    @FXML private TableColumn<Firm, String> oblastPodnikania;
    @FXML private TableColumn<Firm, String> pocetZamestancov;
    @FXML private TableColumn<Firm, String> logo;
    @FXML private ComboBox firmy;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception{

        Admin admin = new Admin(45, 5, "bc", "Linux", "Oracle certifikat", "Datovy analytik", "Admin", 1);
        admin.setUserId(1);
        SpecialistsDatabase.addToWorkerList(admin);

        Programmer programmer = new Programmer(50, 6, "ing", "Java", "Google certifikat", "Programmer", 1);
        programmer.setUserId(2);
        SpecialistsDatabase.addToWorkerList(programmer);

        SecurityConsultant securityConsultant = new SecurityConsultant(55, 7, "phd", true, "Twitter certifikat", "SecurityConsultant", 1);
        securityConsultant.setUserId(3);
        SpecialistsDatabase.addToWorkerList(securityConsultant);

        // sem zacinam pridavat firmy

        Firm firma1 = new Firm("google", "IT", 20);
        firma1.setImage(new ImageView(new Image(getClass().getResource("Pictures/google.png").toString())));
        FirmsDatabase.addToFirmList(firma1);

        Firm firma2 = new Firm("twitter", "IT", 40);
        firma2.setImage(new ImageView(new Image(getClass().getResource("Pictures/twitter.png").toString())));
        FirmsDatabase.addToFirmList(firma2);


        this.primaryStage = primaryStage;
        //this.primaryStage.getIcons().add(new Image("Messie/picture/mesies.png"));
        this.primaryStage.setTitle("IT profesia");
        showMainView();
    }

    public static void showMainView() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void changeToSpeacialistCreation() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("View/SpecialistCreation.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void changeToFirmCreation() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("View/FirmCreation.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        cost.setCellValueFactory(new PropertyValueFactory<Specialist, String>("priceForDay"));
        praxisLength.setCellValueFactory(new PropertyValueFactory<Specialist, String>("praxisLength"));
        education.setCellValueFactory(new PropertyValueFactory<Specialist, String>("highestEducation"));
        certifications.setCellValueFactory(new PropertyValueFactory<Specialist, String>("certificates"));
        zaradenie.setCellValueFactory(new PropertyValueFactory<Specialist, String>("Zaradenie"));
        preferovanyTypPlatformy.setCellValueFactory(new PropertyValueFactory<Specialist, String>("PreferredPlatform"));
        typSpecialistu.setCellValueFactory(new PropertyValueFactory<Specialist, String>("Type"));
        auditorNbu.setCellValueFactory(new PropertyValueFactory<Specialist, String>("Auditor"));
        available.setCellValueFactory(new PropertyValueFactory<Specialist, String>("Availability"));
        userId.setCellValueFactory(new PropertyValueFactory<Specialist, String>("UserId"));
        ObservableList<Specialist> observableArrayList =
                FXCollections.observableArrayList(SpecialistsDatabase.workerList);
        workers.setItems(observableArrayList);

        /**
         * tuto som nacital vsetky polozky o specialistovi
         */
        nazov.setCellValueFactory(new PropertyValueFactory<Firm, String>("name"));
        oblastPodnikania.setCellValueFactory(new PropertyValueFactory<Firm, String>("areaOfExpertise"));
        pocetZamestancov.setCellValueFactory(new PropertyValueFactory<Firm, String>("numberOfEmployees"));
        logo.setCellValueFactory(new PropertyValueFactory<Firm, String>("image"));

        /**
         * sem nacitam veci do komboboxov
         */

        ObservableList<String> observableArrayList3 =
                FXCollections.observableArrayList(SpecialistsDatabase.getSpecialistNames());
        zamestannci.setItems(observableArrayList3);

        ObservableList<String> observableArrayList4 =
                FXCollections.observableArrayList(FirmsDatabase.getFirmNames());
        firmy.setItems(observableArrayList4);

        ObservableList<Firm> observableArrayList1 =
        FXCollections.observableArrayList(FirmsDatabase.FirmList);
        firms.setItems(observableArrayList1);
    }



    public void vytvorPracovnuZmluvu(){
        String firma = (String) firmy.getSelectionModel().getSelectedItem();
        String zamestnanec = (String) zamestannci.getSelectionModel().getSelectedItem();
        int flag = 1;

        for (Zmluva i : ZmluvyDatabase.zmluvaList) {
            if (i.getMenoFirmy() == firma){
                i.setWorkersSpecalists(zamestnanec);
                SpecialistsDatabase.getSpecialistById(zamestnanec).setAvailability(0);
                flag = 0;
            }
        }

        if (flag == 1){
            Zmluva zmluva = new Zmluva();
            zmluva.setMenoFirmy(firma);
            zmluva.setWorkersSpecalists(zamestnanec);
            ZmluvyDatabase.addZmluvaList(zmluva);
            SpecialistsDatabase.getSpecialistById(zamestnanec).setAvailability(0);
        }

        workers.refresh();
    }

    public void changeToFirmView() throws IOException {

        FirmViewController.menofirmy = firms.getSelectionModel().getSelectedItem().getName();
        Parent root = FXMLLoader.load(MainController.class.getResource("View/FirmView.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


}
