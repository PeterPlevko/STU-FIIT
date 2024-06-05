package project.controller.readerControllers.BookReservation;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import project.model.books.Book;
import java.io.IOException;

public class CellController extends ListCell<Book> {
    @FXML private ImageView imageView;
    @FXML private Label authorLabel;
    @FXML private Label titleLabel;
    @FXML private FXMLLoader mLLoader;
    @FXML private AnchorPane anchorPane;

    @Override
    protected void updateItem(Book book, boolean empty) {
        super.updateItem(book, empty);
        if(empty || book == null) {
            setText(null);
            setGraphic(null);
        }
        else {
            if (mLLoader == null) {
                mLLoader = new FXMLLoader(getClass().getResource("/project/view/readerViews/BookReservation/CellView.fxml"));
                mLLoader.setController(this);
                try {
                    mLLoader.load();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            imageView.setImage(book.getImage().getImage());
            titleLabel.setText(book.getTitle());
            authorLabel.setText(book.getAuthor());

            setText(null);
            setGraphic(anchorPane);
        }
    }
}
