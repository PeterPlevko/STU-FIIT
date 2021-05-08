package project.controller.organizerControllers;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.ImageView;
import javafx.scene.text.Text;
import project.controller.Main;
import project.model.CustomImage;
import project.model.rooms.LibraryRoom;
import project.model.rooms.RoomReservation;
import project.model.events.BookDiscussion;
import project.model.events.BookExchange;
import project.model.events.Event;
import project.model.users.Organizer;
import java.io.IOException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class EditEventController {
    ObservableList<Event> eventsObservable = FXCollections.observableArrayList();
    ObservableList<ImageView> roomImages = FXCollections.observableArrayList();
    private Event globalEvent;
    @FXML private ListView<ImageView> listView;
    @FXML private TextArea hostArea;
    @FXML private TextArea nameArea;
    @FXML private TextArea noteArea;
    @FXML private Label hostLabel;
    @FXML private Label infoLabel;
    @FXML private Button btn1;
    @FXML private ComboBox<Event> events;
    @FXML private Text capacity;
    @FXML private Text typeEvent;
    @FXML private Text text2;
    @FXML private Label label2;
    @FXML private Label label4;
    @FXML private Button button3;

    @FXML
    public void initialize(){
        Organizer organizer = (Organizer) Main.currUser;
        for(Event event: organizer.getEvents()){
            if(event.getReservation().getDateFrom().compareTo(Main.booksDatabase.getDate()) > 0){
                eventsObservable.add(event);
            }
        }
        events.setItems(eventsObservable);
        infoLabel.setVisible(false);
        hostLabel.setVisible(false);
        hostArea.setVisible(false);
        nameArea.setDisable(true);
        noteArea.setDisable(true);
        btn1.setDisable(false);
    }

    public void languageEN(){
        Main.currLanguage = "US";
        Locale enLocale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.organizerView", enLocale);
        changeSigns(bundle);
    }

    public void languageSK(){
        Main.currLanguage = "SK";
        Locale skLocale = new Locale("sk_SK");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.organizerView", skLocale);
        changeSigns(bundle);
    }

    public void changeSigns(ResourceBundle bundle){
        text2.setText(bundle.getString("capacityText"));
        label2.setText(bundle.getString("label2"));
        hostLabel.setText(bundle.getString("label3"));
        label4.setText(bundle.getString("label4"));
        btn1.setText(bundle.getString("btn1"));
        button3.setText(bundle.getString("button3"));
        infoLabel.setText(bundle.getString("error"));
        if(globalEvent instanceof BookExchange){
            if(Main.currLanguage.equals("SK")) typeEvent.setText("Burza");
            else typeEvent.setText("Books Exchange");
        }
        else {
            if(Main.currLanguage.equals("SK")) typeEvent.setText("Diskusia");
            else typeEvent.setText("Discussion");
        }
    }

    public void comboClicked(){
        nameArea.setDisable(false);
        noteArea.setDisable(false);
        hostLabel.setVisible(true);
        hostArea.setVisible(true);

        Organizer organizer = (Organizer) Main.currUser;

        List<BookDiscussion> bookDiscussionList = new java.util.ArrayList<>(Collections.emptyList());
        List<BookExchange> bookExchangeList = new java.util.ArrayList<>(Collections.emptyList());
        List<Event> eventsList = organizer.getEvents();

        for(Event event : eventsList){
            if (event instanceof BookDiscussion){
                bookDiscussionList.add((BookDiscussion) event);
            }
            else if (event instanceof BookExchange){
                bookExchangeList.add((BookExchange) event);

            }
        }

        if (events.getSelectionModel().getSelectedItem() instanceof BookDiscussion){
            hostLabel.setVisible(true);
            hostArea.setVisible(true);
            globalEvent = events.getSelectionModel().getSelectedItem();

            for (BookDiscussion bookDisc : bookDiscussionList) {
                if(bookDisc.getName().equals(events.getSelectionModel().getSelectedItem().getName())){
                    globalEvent = bookDisc;
                    nameArea.setText(bookDisc.getName());
                    noteArea.setText(bookDisc.getNote());
                    hostArea.setText(bookDisc.getHost());
                    if(Main.currLanguage.equals("SK")) typeEvent.setText("Diskusia");
                    else typeEvent.setText("Discussion");

                    LibraryRoom room = Main.roomsDatabase.getRooms().get(bookDisc.getReservation().getRoomId());
                    if (room == null){
                        return;
                    }
                    listView.getItems().clear();
                    for(CustomImage image: room.getImages()){
                        ImageView imageView = new ImageView(image.getImage());
                        imageView.setPreserveRatio(true);
                        imageView.setFitWidth(493);
                        roomImages.add(imageView);
                    }
                    listView.setItems(roomImages);
                    listView.refresh();

                    for(LibraryRoom room1 : Main.roomsDatabase.getRooms()) {
                        if (room1.getId() == bookDisc.getReservation().getRoomId()) {
                            capacity.setText(String.valueOf(room.getCapacity()));
                        }
                    }
                }
            }
        }
        else if (events.getSelectionModel().getSelectedItem() instanceof BookExchange){
            hostLabel.setVisible(false);
            hostArea.setVisible(false);
            globalEvent = events.getSelectionModel().getSelectedItem();

            for (BookExchange bookExchange : bookExchangeList) {
                if(bookExchange.getName().equals(events.getSelectionModel().getSelectedItem().getName())){
                    nameArea.setText(bookExchange.getName());
                    noteArea.setText(bookExchange.getNote());

                    if(Main.currLanguage.equals("SK")) typeEvent.setText("Burza");
                    else typeEvent.setText("Books Exchange");
                    listView.getItems().clear();

                    LibraryRoom room = Main.roomsDatabase.getRooms().get(bookExchange.getReservation().getRoomId());
                    if (room == null){
                        return;
                    }
                    listView.getItems().clear();
                    for(CustomImage image: room.getImages()){
                        ImageView imageView = new ImageView(image.getImage());
                        imageView.setPreserveRatio(true);
                        imageView.setFitWidth(493);
                        roomImages.add(imageView);
                    }
                    listView.setItems(roomImages);
                    listView.refresh();

                    for(LibraryRoom room1 : Main.roomsDatabase.getRooms()) {
                        if (room1.getId() == bookExchange.getReservation().getRoomId()) {
                            capacity.setText(String.valueOf(room.getCapacity()));
                        }
                    }
                }
            }
        }
    }

    public void createEvent() {
        LibraryRoom room = Main.roomsDatabase.getRooms().get(globalEvent.getReservation().getRoomId());
        String name = nameArea.getText();
        String host;

        if (typeEvent.getText().equals("diskusia")) {
            host = hostArea.getText();
        } else {
            host = "nothing";
        }
        String note = noteArea.getText();
        if (testRequired(name, host, note)) {
            return;
        }

        Main.userDatabase.removeUser(Main.currUser);
        Organizer organizer = (Organizer) Main.currUser;

        if (typeEvent.getText().equals("burza")) {
            BookExchange bookExchange = new BookExchange(name, note, new RoomReservation(globalEvent.getReservation().getDateFrom(), globalEvent.getReservation().getDateTo(), room.getId()), (Organizer) Main.currUser);
            organizer.removeEvent(globalEvent);
            globalEvent = bookExchange;
            organizer.addEvent(bookExchange);
        } else if (typeEvent.getText().equals("diskusia")) {
            BookDiscussion bookDiscussion = new BookDiscussion(name, note, new RoomReservation(globalEvent.getReservation().getDateFrom(), globalEvent.getReservation().getDateTo(), room.getId()), (Organizer) Main.currUser, host);
            organizer.removeEvent(globalEvent);
            globalEvent = bookDiscussion;
            organizer.addEvent(bookDiscussion);
        }

        Main.userDatabase.addUser(organizer);
        Main.currUser = organizer;
        events.getItems().clear();
        eventsObservable.addAll(organizer.getEvents());
        events.setItems(eventsObservable);
        deleteFields();
    }

    private boolean testRequired(String name, String host, String note){
        if(name.isEmpty() || host.isEmpty() || note.isEmpty()){
            LOG.log(Level.INFO, "User did not enter all required fields");
            infoLabel.setVisible(true);
            return true;
        }

        infoLabel.setVisible(false);
        return false;
    }

    private void deleteFields(){
        nameArea.clear();
        hostArea.clear();
        noteArea.clear();
        listView.getItems().clear();
        listView.refresh();
        hostLabel.setVisible(false);
        hostArea.setVisible(false);
        nameArea.setDisable(true);
        noteArea.setDisable(true);
    }

    public void deleteEvent(){
        Organizer organizer = (Organizer) Main.currUser;
        organizer.removeEvent(globalEvent);
        events.getItems().clear();
        eventsObservable.addAll(organizer.getEvents());
        events.setItems(eventsObservable);
        deleteFields();
    }

    public void showMenu() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.organizerView", locale);
        Parent root = FXMLLoader.load(Objects.requireNonNull(Main.class.getResource("/project/view/organizerViews/OrganizerView.fxml")), bundle);
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }

    private static final Logger LOG = Logger.getLogger(EditEventController.class.getName());
}
