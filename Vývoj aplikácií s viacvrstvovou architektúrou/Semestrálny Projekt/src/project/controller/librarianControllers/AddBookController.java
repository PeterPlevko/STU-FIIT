package project.controller.librarianControllers;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import project.controller.Main;
import project.model.CustomImage;
import project.model.books.Book;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Locale;
import java.util.Objects;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AddBookController {
    @FXML TextField authorName;
    @FXML TextField bookName;
    @FXML TextArea bookNote;
    @FXML Button send;
    @FXML ImageView bookImageView;
    @FXML Button addImageButton;
    private Image bookImage;
    private String error;
    private String errorMessage1;
    private String errorMessage2;
    private String titleLanguage;
    private String success;

    @FXML
    public void initialize(){
        if (Main.currLanguage.equals("SK")) languageSK();
        else languageEN();
    }

    public void languageEN(){
        Main.currLanguage = "US";
        Locale enLocale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.librarianView", enLocale);
        changeSigns(bundle);
    }

    public void languageSK(){
        Main.currLanguage = "SK";
        Locale skLocale = new Locale("sk_SK");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.librarianView", skLocale);
        changeSigns(bundle);
    }

    public void changeSigns(ResourceBundle bundle){
        authorName.setPromptText(bundle.getString("authorName"));
        bookName.setPromptText(bundle.getString("bookName"));
        bookNote.setPromptText(bundle.getString("note"));
        addImageButton.setText(bundle.getString("addImageBtn"));
        send.setText(bundle.getString("addBookBtn"));
        error = bundle.getString("error");
        errorMessage1 = bundle.getString("errorMessage1");
        errorMessage2 = bundle.getString("errorMessage2");
        titleLanguage = bundle.getString("titleLanguage");
        success = bundle.getString("success");
    }

    public void addImage(){
        try {
            FileChooser.ExtensionFilter imageFilter = new FileChooser.ExtensionFilter("Image Files", "*.jpg", "*.png");
            FileChooser fileChooser = new FileChooser();
            fileChooser.getExtensionFilters().add(imageFilter);
            fileChooser.setTitle(titleLanguage);
            Image image = new Image(fileChooser.showOpenDialog(Main.mainStage).toURI().toString());
            bookImage = image;
            bookImageView.setImage(image);
        }
        catch(Exception e) {
            if (bookImage == null){
                Alert alert = new Alert(Alert.AlertType.ERROR);
                Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                stage.getIcons().add(new Image("project/images/other/logo.png"));
                alert.setTitle(error);
                alert.setHeaderText(titleLanguage);
                alert.showAndWait();
                LOG.log(Level.SEVERE, "User did not choose a picture");
            }
        }
    }

    public void sendIntoDatabase(){
        if(bookName.getText().equals("") || authorName.getText().equals("") || bookNote.getText().equals("") || bookImage == null){
            Alert alert = new Alert(Alert.AlertType.ERROR);
            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
            stage.getIcons().add(new Image("project/images/other/logo.png"));
            alert.setTitle(error);
            alert.setHeaderText(errorMessage1);
            alert.showAndWait();
            LOG.log(Level.INFO, "User did not enter all required information");
            return;
        }

        Book book = new Book(Main.booksDatabase.getBookId(), bookName.getText(), authorName.getText(), bookNote.getText(), new CustomImage(bookImage));

        for(Book i : Main.booksDatabase.getBooks()) {
            if (i.getTitle().equals(bookName.getText())){
                Alert alert = new Alert(Alert.AlertType.ERROR);
                Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                stage.getIcons().add(new Image("project/images/other/logo.png"));
                alert.setTitle(error);
                alert.setHeaderText(errorMessage2);
                alert.showAndWait();
                LOG.log(Level.INFO, "User tried to add book with existing name");
                return;
            }
        }

        book.setCreatedAt(LocalDate.now());
        Main.booksDatabase.addBook(book);
        Alert alert = new Alert(Alert.AlertType.ERROR);
        Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
        stage.getIcons().add(new Image("project/images/other/logo.png"));
        alert.setTitle(error);
        alert.setHeaderText(success);
        alert.showAndWait();
        bookImageView.setImage(bookImage);
        deleteFields();
    }

    private void deleteFields(){
        authorName.clear();
        bookName.clear();
        bookNote.clear();
        bookImage = null;
        bookImageView.setImage(new Image("project/images/other/noImage.jpg"));
    }

    public void showMenu() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.librarianView", locale);
        Parent root = FXMLLoader.load(Objects.requireNonNull(Main.class.getResource("/project/view/librarianViews/LibrarianView.fxml")), bundle);
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }

    private static final Logger LOG = Logger.getLogger(AddBookController.class.getName());
}
