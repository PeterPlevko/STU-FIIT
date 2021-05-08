package project.controller.librarianControllers;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.ListView;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import project.controller.Main;
import project.model.CustomImage;
import project.model.rooms.LibraryRoom;
import java.io.IOException;
import java.net.URL;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class EditRoomsController implements Initializable {
    ObservableList<ImageView> imageViews = FXCollections.observableArrayList();
    ObservableList<LibraryRoom> allRooms = FXCollections.observableArrayList();
    @FXML ComboBox<LibraryRoom> roomComboBox;
    @FXML ListView<ImageView> roomPictures;
    private String titleLanguage;
    private String error;
    private String notChosen;
    @FXML private Button addPictureButton;
    @FXML private Button deletePictureButton;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        allRooms.addAll(Main.roomsDatabase.getRooms());
        roomComboBox.setItems(allRooms);
        if (Main.currLanguage.equals("SK")) languageSK();
        else languageEN();
        addPictureButton.setDisable(true);
        deletePictureButton.setDisable(true);
    }

    public void languageEN(){
        Main.currLanguage = "US";
        Locale enLocale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.librarianView", enLocale);
        changeSigns(bundle);
    }

    public void languageSK(){
        Main.currLanguage = "SK";
        Locale skLocale = new Locale("sk_SK");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.librarianView", skLocale);
        changeSigns(bundle);
    }

    public void changeSigns(ResourceBundle bundle){
        titleLanguage = bundle.getString("titleLanguage");
        error = bundle.getString("error");
        addPictureButton.setText(bundle.getString("addImageBtn"));
        deletePictureButton.setText(bundle.getString("deletePicture"));
        notChosen = bundle.getString("notChosen");
    }

    public void comboClick(){
        addPictureButton.setDisable(false);
        deletePictureButton.setDisable(false);
        LibraryRoom libraryRoom = roomComboBox.getValue();
        if (libraryRoom == null){
            return;
        }
        for(LibraryRoom roomFor: Main.roomsDatabase.getRooms()) {
            if (roomFor.getName().equals(libraryRoom.getName())) {
                libraryRoom = roomFor;
            }
        }

        roomPictures.getItems().clear();

        for(CustomImage image: libraryRoom.getImages()){
            ImageView imageView = new ImageView(image.getImage());
            imageView.setPreserveRatio(true);
            imageView.setFitWidth(493);
            imageViews.add(imageView);
        }
        roomPictures.setItems(imageViews);
        roomPictures.refresh();
    }

    public void addImage() {
        try {
            FileChooser.ExtensionFilter imageFilter = new FileChooser.ExtensionFilter("Image Files", "*.jpg", "*.png");
            FileChooser fileChooser = new FileChooser();
            fileChooser.getExtensionFilters().add(imageFilter);
            fileChooser.setTitle(titleLanguage);
            Image image = new Image(fileChooser.showOpenDialog(Main.mainStage).toURI().toString());
            LibraryRoom libraryRoom = roomComboBox.getValue();

            for (LibraryRoom roomFor : Main.roomsDatabase.getRooms()) {
                List<CustomImage> imagesReal = roomFor.getRealImages();
                if (libraryRoom.getName().equals(roomFor.getName())) {
                    imagesReal.add(new CustomImage(image));
                }

                Main.roomsDatabase.removeRoom(roomFor);
                Main.roomsDatabase.addRoom(roomFor);
            }
            comboClick();

        } catch (Exception e) {
            LOG.log(Level.SEVERE, "User did not choose picture");
        }
    }

    public void deletePhoto(){
        try {
            Image imageToDel = roomPictures.getSelectionModel().getSelectedItem().getImage();
            List<LibraryRoom> rooms = Main.roomsDatabase.getRooms();

            for(LibraryRoom roomFor: rooms){
                List<CustomImage> imagesReal = roomFor.getRealImages();

                for(CustomImage imageFor: imagesReal){
                    if (imageFor.getImage().equals(imageToDel)) {
                        imagesReal.remove(imageFor);
                        Main.roomsDatabase.removeRoom(roomFor);
                        Main.roomsDatabase.addRoom(roomFor);

                        List<LibraryRoom> roomsSort;
                        roomsSort = Main.roomsDatabase.getRooms();

                        roomsSort.sort(Comparator.comparing(LibraryRoom::getName));
                        Main.roomsDatabase.setRooms(roomsSort);

                        LibraryRoom selectedRoom = roomComboBox.getSelectionModel().getSelectedItem();
                        allRooms.clear();
                        allRooms.addAll(Main.roomsDatabase.getRooms());
                        roomComboBox.setItems(allRooms);
                        roomComboBox.getSelectionModel().select(selectedRoom);

                        roomPictures.getItems().clear();
                        for(CustomImage image: roomFor.getImages()){
                            ImageView imageView = new ImageView(image.getImage());
                            imageView.setPreserveRatio(true);
                            imageView.setFitWidth(493);
                            imageViews.add(imageView);
                        }
                        roomPictures.setItems(imageViews);
                        roomPictures.refresh();
                        return;
                    }
                }
            }
        }
        catch(Exception e) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
            stage.getIcons().add(new Image("project/images/other/logo.png"));
            alert.setTitle(error);
            alert.setHeaderText(notChosen);
            alert.showAndWait();
            LOG.log(Level.SEVERE, "User did not choose picture to be deleted");
        }
    }

    public void showMenu() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.librarianView", locale);
        Parent root = FXMLLoader.load(Objects.requireNonNull(Main.class.getResource("/project/view/librarianViews/LibrarianView.fxml")), bundle);
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }

    private static final Logger LOG = Logger.getLogger(EditRoomsController.class.getName());
}