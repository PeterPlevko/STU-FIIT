package project.controller.readerControllers.EventsCalendar;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.stage.Stage;
import javafx.util.Callback;
import project.controller.Main;
import project.model.books.SellableBook;
import project.model.events.BookDiscussion;
import project.model.events.BookExchange;
import project.model.events.Event;
import project.model.users.Organizer;
import project.model.users.Reader;
import project.model.users.User;
import java.io.IOException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

public class EventEnrollController {
    private YearMonth yearMonth;
    private Event event;
    @FXML private Label typeLabel;
    @FXML private Label hostLabel;
    @FXML private TextArea titleArea;
    @FXML private TextArea noteArea;
    @FXML private TextField hostField;
    @FXML private DatePicker datePickerFrom;
    @FXML private DatePicker datePickerTo;
    @FXML private Button volunteerBtn;
    @FXML private Button participantBtn;
    @FXML private Button cancelBtn;
    @FXML private Button forumBtn;
    @FXML private Button booksBtn;
    @FXML private Label participantLabel;
    @FXML private Label eventTitleLabel;
    @FXML private Label startEventLabel;
    @FXML private Label endEventLabel;
    @FXML private Label eventNoteLabel;
    private String successfulRegistration;
    private String successfulRegistrationMsgParticipant;
    private String successfulRegistrationMsgVolunteer;
    private String successfulCancel;
    private String successfulCancelMsg;

    @FXML
    public void initialize(){
        final Callback<DatePicker, DateCell> dayCellFactory = new Callback<DatePicker, DateCell>() {
            public DateCell call(final DatePicker datePicker) {
                return new DateCell() {
                    @Override
                    public void updateItem(LocalDate dateCurr, boolean empty) {
                        super.updateItem(dateCurr, empty);
                        setDisable(true);
                    }
                };
            }
        };
        datePickerFrom.setDayCellFactory(dayCellFactory);
        datePickerTo.setDayCellFactory(dayCellFactory);
    }

    public void languageEN(){
        Main.currLanguage = "US";
        if(event instanceof BookDiscussion) typeLabel.setText("Book Discussion");
        else typeLabel.setText("Books Exchange");
        Locale enLocale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", enLocale);
        changeSigns(bundle);
    }

    public void languageSK(){
        Main.currLanguage = "SK";
        if(event instanceof BookDiscussion) typeLabel.setText("Beseda");
        else typeLabel.setText("Burza");
        Locale skLocale = new Locale("sk_SK");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", skLocale);
        changeSigns(bundle);
    }

    public void changeSigns(ResourceBundle bundle){
        volunteerBtn.setText(bundle.getString("volunteerBtn"));
        participantBtn.setText(bundle.getString("participantBtn"));
        cancelBtn.setText(bundle.getString("cancelBtn"));
        forumBtn.setText(bundle.getString("forumBtn"));
        booksBtn.setText(bundle.getString("booksBtn"));
        eventTitleLabel.setText(bundle.getString("eventTitleLabel"));
        startEventLabel.setText(bundle.getString("startEventLabel"));
        endEventLabel.setText(bundle.getString("endEventLabel"));
        eventNoteLabel.setText(bundle.getString("eventNoteLabel"));
        hostLabel.setText(bundle.getString("hostLabel"));
        successfulRegistration = bundle.getString("successfulRegistration");
        successfulRegistrationMsgParticipant = bundle.getString("successfulRegistrationMsgParticipant");
        successfulRegistrationMsgVolunteer = bundle.getString("successfulRegistrationMsgVolunteer");
        successfulCancel = bundle.getString("successfulCancel");
        successfulCancelMsg = bundle.getString("successfulCancelMsg");
        findParticipation();
    }

    public void cancelParticipation() throws IOException {
        event.removeParticipant((Reader) Main.currUser);
        event.removeVolunteer((Reader) Main.currUser);
        if(event instanceof BookExchange){
            List<SellableBook> books = new ArrayList<>();
            for(SellableBook book: ((BookExchange) event).getBooks()){
                if (book.getUserName().equals(Main.currUser.getUserName())){
                    continue;
                }
                books.add(book);
            }
            ((BookExchange) event).setBooks(books);
        }
        enroll(3);
    }

    public void enrollParticipant() throws IOException {
        event.addParticipant((Reader) Main.currUser);
        enroll(1);
    }

    public void enrollVolunteer() throws IOException {
        event.addVolunteer((Reader) Main.currUser);
        enroll(2);
    }

    private void enroll(int option) throws IOException {
        for(User user: Main.userDatabase.getUsers()){
            if(!(user instanceof Organizer)){
                continue;
            }
            Organizer organizer = (Organizer) user;
            for(Event temp: organizer.getEvents()){
                if (temp.toString().equals(event.toString())){
                    organizer.removeEvent(event);
                    if(event instanceof BookDiscussion){
                        organizer.addEvent((BookDiscussion) event);
                    }
                    else{
                        organizer.addEvent((BookExchange) event);
                    }
                    Main.userDatabase.removeUser(organizer);
                    Main.userDatabase.addUser(organizer);

                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                    Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                    stage.getIcons().add(new Image("project/images/other/logo.png"));
                    if(option == 1){
                        alert.setTitle(successfulRegistration);
                        alert.setHeaderText(successfulRegistrationMsgParticipant);
                    }
                    else if(option == 2){
                        alert.setTitle(successfulRegistration);
                        alert.setHeaderText(successfulRegistrationMsgVolunteer);
                    }
                    else if(option == 3){
                        alert.setTitle(successfulCancel);
                        alert.setHeaderText(successfulCancelMsg);
                    }
                    alert.showAndWait();
                    showCalendar();
                    return;
                }
            }
        }
    }

    public void setEvent(Event event) {
        this.event = event;
        if (Main.currLanguage.equals("SK")) languageSK();
        else languageEN();
        if(event instanceof BookDiscussion){
            if(Main.currLanguage.equals("SK")) typeLabel.setText("Beseda");
            else typeLabel.setText("Book Discussion");
            hostLabel.setVisible(true);
            hostField.setVisible(true);
            hostField.setText(((BookDiscussion) event).getHost());
        }
        else{
            if(Main.currLanguage.equals("SK")) typeLabel.setText("Burza");
            else typeLabel.setText("Books Exchange");
            hostLabel.setVisible(false);
            hostField.setVisible(false);
        }

        int capacity = Main.roomsDatabase.getRooms().get(event.getReservation().getRoomId()).getCapacity();
        int count = event.getParticipants().size() + event.getVolunteers().size();
        if(count >= capacity){
            participantBtn.setVisible(false);
            volunteerBtn.setVisible(false);
        }

        forumBtn.setVisible(false);
        booksBtn.setVisible(false);
        titleArea.setText(event.getName());
        noteArea.setText(event.getNote());
        datePickerFrom.setValue(event.getReservation().getDateFrom());
        datePickerTo.setValue(event.getReservation().getDateTo());
        if(findParticipation()){
            participantBtn.setVisible(false);
            volunteerBtn.setVisible(false);
            cancelBtn.setVisible(true);
            participantLabel.setVisible(true);
            if(event instanceof BookDiscussion) {
                forumBtn.setVisible(true);
            }
            else{
                booksBtn.setVisible(true);
            }
        }
        else{
            participantBtn.setVisible(true);
            volunteerBtn.setVisible(true);
            cancelBtn.setVisible(false);
            participantLabel.setVisible(false);
        }

        if(event.getReservation().getDateFrom().compareTo(Main.booksDatabase.getDate()) <= 0){
            cancelBtn.setVisible(false);
            volunteerBtn.setVisible(false);
        }
        if(event.getReservation().getDateTo().compareTo(Main.booksDatabase.getDate()) < 0){
            participantBtn.setVisible(false);
        }
    }

    private boolean findParticipation(){
        for(Reader reader: event.getParticipants()){
            if(reader.toString().equals(Main.currUser.toString())){
                if(Main.currLanguage.equals("SK")) participantLabel.setText("Účastník");
                else participantLabel.setText("Participant");
                return true;
            }
        }

        for(Reader reader: event.getVolunteers()){
            if(reader.toString().equals(Main.currUser.toString())){
                if(Main.currLanguage.equals("SK")) participantLabel.setText("Dobrovoľník");
                else participantLabel.setText("Volunteer");
                return true;
            }
        }
        return false;
    }

    public void setYearMonth(YearMonth yearMonth) {
        this.yearMonth = yearMonth;
    }

    public void showForum() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", locale);
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/project/view/readerViews/EventsCalendar/DiscussionView.fxml"), bundle);
        Parent root = loader.load();
        DiscussionController discussionController = loader.getController();
        discussionController.setYearMonth(yearMonth);
        discussionController.setEvent(event);
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }

    public void showBooks() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", locale);
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/project/view/readerViews/EventsCalendar/AddExchangeBookView.fxml"), bundle);
        Parent root = loader.load();
        AddExchangeBookController addExchangeBookController = loader.getController();
        addExchangeBookController.setYearMonth(yearMonth);
        addExchangeBookController.setEvent(event);
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }

    public void showCalendar() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", locale);
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/project/view/readerViews/EventsCalendar/EventsView.fxml"), bundle);
        Parent root = loader.load();
        Main.mainStage.setResizable(false);
        EventsController eventsController = loader.getController();
        eventsController.setCurrYearMonth(yearMonth);
        eventsController.updateCalendar();
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }
}
