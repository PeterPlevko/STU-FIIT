package project.model.users;

import project.model.books.BookReservation;
import java.util.ArrayList;
import java.util.List;

public class Reader extends User{
    private List<BookReservation> reservations;

    public Reader(String userName, String password) {
        super(userName, password);
        this.reservations = new ArrayList<>();
    }

    public List<BookReservation> getReservations() {
        List<BookReservation> returnList = new ArrayList<>();
        for(BookReservation reservation: reservations){
            returnList.add((BookReservation) reservation.clone());
        }
        return returnList;
    }

    public void setReservations(List<BookReservation> reservations) {
        List<BookReservation> list = new ArrayList<>();
        for(BookReservation reservation: reservations){
            list.add((BookReservation) reservation.clone());
        }
        this.reservations = list;
    }

    public void addReservation(BookReservation bookReservation){
        reservations.add((BookReservation) bookReservation.clone());
    }

    public void removeReservation(BookReservation bookReservation){
        reservations.removeIf(temp -> temp.toString().equals(bookReservation.toString()));
    }

    public Object clone(){
        Reader reader = new Reader(this.getUserName(), this.getPassword());
        if(!(this.reservations == null)){
            reader.setReservations(this.reservations);
        }
        return reader;
    }
}
