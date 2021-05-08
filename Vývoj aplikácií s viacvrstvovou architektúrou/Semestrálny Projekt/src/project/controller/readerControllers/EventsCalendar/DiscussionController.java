package project.controller.readerControllers.EventsCalendar;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;
import project.controller.Main;
import project.model.events.BookDiscussion;
import project.model.events.Event;
import project.model.events.Message;
import project.model.users.Organizer;
import project.model.users.User;
import java.io.IOException;
import java.time.YearMonth;
import java.util.Locale;
import java.util.ResourceBundle;

public class DiscussionController {
    ObservableList<Message> messages = FXCollections.observableArrayList();
    private YearMonth yearMonth;
    private Event event;
    @FXML private ListView<Message> listView;
    @FXML private TextArea textArea;

    public void setEvent(Event event) {
        this.event = event;
        updateList();
    }

    private void updateList(){
        listView.getItems().clear();
        messages.addAll(((BookDiscussion) event).getMessages());
        listView.setCellFactory(ListView -> new MessageController());
        listView.setItems(messages);
    }

    public void addMessage(){
        String msg = textArea.getText().trim();
        if(msg.isEmpty()){
            return;
        }
        Message message = new Message(msg, Main.currUser.getUserName());
        for(User user: Main.userDatabase.getUsers()){
            if(!(user instanceof Organizer)){
                continue;
            }
            Organizer organizer = (Organizer) user;
            for (Event temp: organizer.getEvents()){
                if(temp.toString().equals(event.toString())){
                    ((BookDiscussion) event).addMessage(message);
                    organizer.removeEvent(event);
                    organizer.addEvent((BookDiscussion) event);
                    Main.userDatabase.removeUser(organizer);
                    Main.userDatabase.addUser(organizer);
                    updateList();
                    textArea.clear();
                    return;
                }
            }
        }
    }

    public void setYearMonth(YearMonth yearMonth) {
        this.yearMonth = yearMonth;
    }

    public void showEvent() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", locale);
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/project/view/readerViews/EventsCalendar/EventEnrollView.fxml"), bundle);
        Parent root = loader.load();
        Main.mainStage.setResizable(false);
        EventEnrollController eventEnrollController = loader.getController();
        eventEnrollController.setYearMonth(yearMonth);
        eventEnrollController.setEvent(event);
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }
}
