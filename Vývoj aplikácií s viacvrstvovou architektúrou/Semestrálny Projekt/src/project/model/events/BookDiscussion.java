package project.model.events;

import project.model.rooms.RoomReservation;
import project.model.users.Organizer;
import java.util.ArrayList;
import java.util.List;

public class BookDiscussion extends Event{
    private final String host;
    private List<Message> messages;

    public BookDiscussion(String name, String note, RoomReservation roomReservation, Organizer organizer, String host) {
        super(name, note, roomReservation, organizer);
        this.host = host;
        this.messages = new ArrayList<>();
    }

    public List<Message> getMessages() {
        List<Message> returnList = new ArrayList<>();
        for(Message message: messages){
            returnList.add((Message) message.clone());
        }
        return returnList;
    }

    public void setMessages(List<Message> messages) {
        List<Message> list = new ArrayList<>();
        for(Message message: messages){
            list.add((Message) message.clone());
        }
        this.messages = list;
    }

    public void addMessage(Message message){
        messages.add(message);
    }

    public String getHost() {
        return host;
    }

    public Object clone(){
        BookDiscussion bookDiscussion = new BookDiscussion(this.getName(), this.getNote(), this.getReservation(), this.getOrganizer(), this.host);
        bookDiscussion.setVolunteers(this.getVolunteers());
        bookDiscussion.setParticipants(this.getParticipants());
        bookDiscussion.setMessages(this.messages);
        return bookDiscussion;
    }
}
