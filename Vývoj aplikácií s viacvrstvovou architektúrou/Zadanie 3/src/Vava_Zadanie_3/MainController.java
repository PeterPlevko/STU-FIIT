package Vava_Zadanie_3;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Databases.*;
import Vava_Zadanie_3.Platba.Platba;
import Vava_Zadanie_3.Reservation.Reservation;
import Vava_Zadanie_3.Room.Room;
import Vava_Zadanie_3.Ubytovanie.Ubytovanie;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.ResourceBundle;

public class MainController extends Application implements Initializable {

    public static Stage primaryStage;
    public static LocalDate dateFormat = LocalDate.now();
    @FXML TextField cas;

    @Override
    public void start(Stage primaryStage) throws Exception{

        CustomerDatabase.load();
        PlatbaDatabase.load();
        ReservationDatabase.load();
        RoomDatabase.load();
        UbytovanieDatabase.load();






//        Room room = new Room("Imperial apartma", 1, "izba urcena pre kralov", 100);
//        RoomDatabase.addToRoomList(room);
//
//        Room room1 = new Room("Normalny apartman", 2, "izba urcena pre ludi", 20);
//        RoomDatabase.addToRoomList(room1);
//
//        Customer customer = new Customer("Peter Plevko");
//        CustomerDatabase.addToCustomerList(customer);
//
//        Customer customer1 = new Customer("Martin Pirkovsky");
//        CustomerDatabase.addToCustomerList(customer1);
//
//        Reservation reservation = new Reservation(customer, room, LocalDate.of(2021, 1, 10), LocalDate.of(2021, 1, 20), 5);
//        ReservationDatabase.addToReservationList(reservation);
//
//        Ubytovanie ubytovanie = new Ubytovanie(customer, room, LocalDate.of(2021, 1, 10), LocalDate.of(2021, 1, 20), 5);
//        UbytovanieDatabase.addToUbytovanieList(ubytovanie);
//
//        Platba platba = new Platba(ubytovanie, LocalDate.of(2021, 1, 25), "V hotovosti");
//        PlatbaDatabase.addToPlatbaList(platba);


        primaryStage.setOnCloseRequest(e ->closeProgram());
        this.primaryStage = primaryStage;
        this.primaryStage.getIcons().add(new Image("Vava_Zadanie_3/Pictures/booking_logo.png"));
        this.primaryStage.setTitle("Booking");
        showMainView();
    }


    public static void main(String[] args) {
        launch(args);
    }


    public static void showMainView() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    public void changeToSetTime() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("SetTime.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        cas.setText(String.valueOf(dateFormat));
    }

    /**
     * this method creates room and adds it to the database
     * @throws IOException
     */
    public void addRoom() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("RoomCreation.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    /**
     * this method creates reservation
     */
    public void createReservation() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("CreateReservation.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }



    public void vytvorZakaznika() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("Customer.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    public void zrusRezervaciu() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("ZrusRezervaciu.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();

    }

    public void ubytujSa() throws IOException {

        Parent root = FXMLLoader.load(MainController.class.getResource("UbytovanieCloveka.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    public void zobrazUbytovanie() throws IOException {

        Parent root = FXMLLoader.load(MainController.class.getResource("ZobrazUbytovanie.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    public void makePayment() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("Payment.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void viewPayments() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("ViewAllPayments.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void changeLanguage() throws IOException {
        Parent root = FXMLLoader.load(MainController.class.getResource("EnglishMain.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();

    }

    public void closeProgram(){
        System.out.println("Data boli ulozene");
        CustomerDatabase.save();
        PlatbaDatabase.save();
        ReservationDatabase.save();
        RoomDatabase.save();
        UbytovanieDatabase.save();
    }



}
