package Vava_Zadanie_3;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Databases.*;
import Vava_Zadanie_3.Platba.Platba;
import Vava_Zadanie_3.Reservation.Reservation;
import Vava_Zadanie_3.Room.Room;
import Vava_Zadanie_3.Ubytovanie.Ubytovanie;
import javafx.application.Application;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.stage.Stage;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.util.ResourceBundle;

public class EnglishMainController implements Initializable {


    @FXML
    TextField cas;


//    Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
//    Scene scene = new Scene(root);
//        MainController.primaryStage.setScene(scene);
//        MainController.primaryStage.show();




    public void changeToSetTime() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("SetTime.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        cas.setText(String.valueOf(MainController.dateFormat));
    }

    /**
     * this method creates room and adds it to the database
     * @throws IOException
     */
    public void addRoom() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("RoomCreation.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }

    /**
     * this method creates reservation
     */
    public void createReservation() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("CreateReservation.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }



    public void vytvorZakaznika() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("Customer.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }


    public void zrusRezervaciu() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("ZrusRezervaciu.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();

    }

    public void ubytujSa() throws IOException {

        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("UbytovanieCloveka.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }


    public void zobrazUbytovanie() throws IOException {

        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("ZobrazUbytovanie.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }


    public void makePayment() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("Payment.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }

    public void viewPayments() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("ViewAllPayments.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }

    public void changeLanguage() throws IOException {
        Parent root = FXMLLoader.load(Vava_Zadanie_3.MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        MainController.primaryStage.setScene(scene);
        MainController.primaryStage.show();
    }





}
