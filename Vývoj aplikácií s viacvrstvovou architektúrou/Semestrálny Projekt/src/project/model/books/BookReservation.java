package project.model.books;

import project.controller.Main;

import java.io.Serializable;
import java.time.LocalDate;

public class BookReservation implements Serializable {
    private final int bookId;
    private final LocalDate dateFrom;
    private LocalDate dateTo;
    private Boolean returned;

    public BookReservation(int bookId, LocalDate dateFrom, LocalDate dateTo) {
        this.bookId = bookId;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    public int getBookId() {
        return bookId;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public Boolean isReturned() {
        return returned;
    }

    public void setReturned(Boolean returned) {
        this.returned = returned;
    }

    public String toString(){
        return Main.booksDatabase.getBooks().get(bookId) + ", od: " + dateFrom + " do: " + dateTo;
    }

    public Object clone(){
        BookReservation bookReservation = new BookReservation(this.getBookId(), this.dateFrom, this.dateTo);
        if(this.returned != null){
            bookReservation.setReturned(this.returned);
        }
        return bookReservation;
    }
}
