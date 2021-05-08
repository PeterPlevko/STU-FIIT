package project.model.books;

import project.model.CustomImage;
import java.io.Serializable;
import java.time.LocalDate;

public class Book implements Serializable {
    private int id;
    private String title;
    private final String author;
    private final String note;
    private CustomImage image;
    private LocalDate createdAt;

    public Book(int id, String title, String author, String note, CustomImage image) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.note = note;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNote() {
        return note;
    }

    public CustomImage getImage() {
        return image;
    }

    public void setImage(CustomImage image) {
        this.image = image;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String toString(){
        return this.title + ", " + this.author;
    }

    public Object clone(){
        Book book = new Book(this.id, this.title, this.author, this.note, this.image);
        book.setCreatedAt(this.createdAt);
        return book;
    }
}
