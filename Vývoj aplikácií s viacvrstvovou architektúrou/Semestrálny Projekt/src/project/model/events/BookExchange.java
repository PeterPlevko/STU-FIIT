package project.model.events;

import project.model.rooms.RoomReservation;
import project.model.books.SellableBook;
import project.model.users.Organizer;
import java.util.ArrayList;
import java.util.List;

public class BookExchange extends Event{
    private List<SellableBook> books;

    public BookExchange(String name, String note, RoomReservation roomReservation, Organizer organizer) {
        super(name, note, roomReservation, organizer);
        this.books = new ArrayList<>();
    }

    public void addBook(SellableBook book){
        books.add(book);
    }

    public List<SellableBook> getBooks() {
        List<SellableBook> returnList = new ArrayList<>();
        for(SellableBook book: books){
            returnList.add((SellableBook) book.clone());
        }
        return returnList;
    }

    public void setBooks(List<SellableBook> books) {
        List<SellableBook> list = new ArrayList<>();
        for(SellableBook book: books){
            list.add((SellableBook) book.clone());
        }
        this.books = list;
    }

    public Object clone(){
        BookExchange bookExchange = new BookExchange(this.getName(), this.getNote(), this.getReservation(), this.getOrganizer());
        bookExchange.setBooks(this.books);
        bookExchange.setVolunteers(this.getVolunteers());
        bookExchange.setParticipants(this.getParticipants());
        return bookExchange;
    }
}
