package project.model.events;

import project.model.rooms.RoomReservation;
import project.model.users.Organizer;
import project.model.users.Reader;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Event implements Serializable {
    private String name;
    private final String note;
    private final RoomReservation roomReservation;
    private Organizer organizer;
    private List<Reader> volunteers;
    private List<Reader> participants;

    public Event(String name, String note, RoomReservation roomReservation, Organizer organizer) {
        this.name = name;
        this.note = note;
        this.roomReservation = roomReservation;
        this.organizer = organizer;
        this.volunteers = new ArrayList<>();
        this.participants = new ArrayList<>();
    }

    public List<Reader> getVolunteers() {
        List<Reader> returnList = new ArrayList<>();
        for(Reader volunteer: volunteers){
            returnList.add((Reader) volunteer.clone());
        }
        return returnList;
    }

    public void setVolunteers(List<Reader> volunteers) {
        List<Reader> list = new ArrayList<>();
        for(Reader volunteer: volunteers){
            list.add((Reader) volunteer.clone());
        }
        this.volunteers = list;
    }

    public void addVolunteer(Reader reader){
        volunteers.add(reader);
    }

    public void removeVolunteer(Reader reader){
        volunteers.removeIf(temp -> temp.toString().equals(reader.toString()));
    }

    public List<Reader> getParticipants() {
        List<Reader> returnList = new ArrayList<>();
        for(Reader participant: participants){
            returnList.add((Reader) participant.clone());
        }
        return returnList;
    }

    public void setParticipants(List<Reader> participants) {
        List<Reader> list = new ArrayList<>();
        for(Reader participant: participants){
            list.add((Reader) participant.clone());
        }
        this.participants = list;
    }

    public void addParticipant(Reader reader){
        participants.add(reader);
    }

    public void removeParticipant(Reader reader){
        participants.removeIf(temp -> temp.toString().equals(reader.toString()));
    }

    public String getNote() {
        return note;
    }

    public Organizer getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Organizer organizer) {
        this.organizer = organizer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RoomReservation getReservation() {
        return (RoomReservation) roomReservation.clone();
    }

    public String toString(){
        return name + ", od: " + roomReservation.getDateFrom() + ", do: " + roomReservation.getDateTo();
    }

    public Object clone(){
        Event event = new Event(this.name, this.note, this.roomReservation, this.organizer);
        event.setVolunteers(this.volunteers);
        event.setParticipants(this.participants);
        return event;
    }
}
