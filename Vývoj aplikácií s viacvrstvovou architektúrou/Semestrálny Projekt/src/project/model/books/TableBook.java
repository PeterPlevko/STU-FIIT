package project.model.books;

import javafx.scene.image.ImageView;
import project.model.CustomImage;
import java.time.LocalDate;

public class TableBook extends Book{
    private ImageView imageView = new ImageView();
    private final LocalDate dateFrom;
    private final LocalDate dateTo;
    private final Boolean returned;
    private double price;

    public TableBook(int id, String title, String author, String note, CustomImage image, LocalDate dateFrom, LocalDate dateTo, Boolean returned) {
        super(id, title, author, note, image);
        this.imageView.setImage(image.getImage());
        this.imageView.setPreserveRatio(true);
        this.imageView.setFitHeight(150);
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.returned = returned;
    }

    public Boolean getReturned() {
        return returned;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public ImageView getImageView() {
        return imageView;
    }

    public void setImageView(ImageView imageView) {
        this.imageView = imageView;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Object clone(){
        return new TableBook(this.getId(), this.getTitle(), this.getAuthor(), this.getNote(), this.getImage(), this.dateFrom, this.dateTo, this.returned);
    }
}
