package project.controller.readerControllers.EventsCalendar;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import project.controller.Main;
import project.model.CustomImage;
import project.model.books.Book;
import project.model.books.SellableBook;
import project.model.books.TableBook;
import project.model.events.BookExchange;
import project.model.events.Event;
import project.model.users.Organizer;
import project.model.users.User;
import javax.swing.*;
import java.io.IOException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Locale;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AddExchangeBookController{
    ObservableList<TableBook> tableBooks = FXCollections.observableArrayList();
    private YearMonth yearMonth;
    private Event event;
    private Image bookImage;
    @FXML private TextField authorName;
    @FXML private TextField bookName;
    @FXML private TextField bookNote;
    @FXML private ImageView bookImageView;
    @FXML private TextField price;
    @FXML private TableView<TableBook> tableView;
    @FXML private TableColumn<TableBook, String> authorColumn;
    @FXML private TableColumn<TableBook, String> titleColumn;
    @FXML private TableColumn<TableBook, ImageView> imageColumn;
    @FXML private TableColumn<TableBook, Double> priceCol;
    @FXML private Button addImageBtn;
    @FXML private Button addBookBtn;
    private String choosePhoto;
    private String existingBook;
    private String error;
    private String successfulAdd;
    private String requiredError;
    private String wrongNumber;

    @FXML
    public void initialize(){
        bookImageView.setImage(new Image("project/images/other/noImage.jpg"));
        if (Main.currLanguage.equals("SK")) languageSK();
        else languageEN();
    }

    public void languageEN(){
        Main.currLanguage = "US";
        Locale enLocale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", enLocale);
        changeSigns(bundle);
    }

    public void languageSK(){
        Main.currLanguage = "SK";
        Locale skLocale = new Locale("sk_SK");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", skLocale);
        changeSigns(bundle);
    }

    public void changeSigns(ResourceBundle bundle){
        authorName.setPromptText(bundle.getString("authorName"));
        bookName.setPromptText(bundle.getString("bookName"));
        bookNote.setPromptText(bundle.getString("bookNote"));
        price.setPromptText(bundle.getString("price"));
        authorColumn.setText(bundle.getString("authorColumn"));
        titleColumn.setText(bundle.getString("titleColumn"));
        imageColumn.setText(bundle.getString("imageColumn"));
        priceCol.setText(bundle.getString("priceCol"));
        addImageBtn.setText(bundle.getString("addImageBtn"));
        addBookBtn.setText(bundle.getString("addBookBtn"));
        choosePhoto = bundle.getString("choosePhoto");
        existingBook = bundle.getString("existingBook");
        error = bundle.getString("error");
        successfulAdd = bundle.getString("successfulAdd");
        requiredError = bundle.getString("requiredError");
        wrongNumber = bundle.getString("wrongNumber");
    }

    public void setEvent(Event event) {
        this.event = event;
        authorColumn.setCellValueFactory(new PropertyValueFactory<>("author"));
        authorColumn.setCellFactory(param -> {
            TableCell<TableBook, String> cell = new TableCell<>();
            Text text = new Text();
            cell.setGraphic(text);
            cell.setTextFill(Color.RED);
            cell.setText("item");
            cell.setPrefHeight(Control.USE_COMPUTED_SIZE);
            text.wrappingWidthProperty().bind(cell.widthProperty());
            text.textProperty().bind(cell.itemProperty());
            return cell;
        });
        titleColumn.setCellValueFactory(new PropertyValueFactory<>("title"));
        titleColumn.setCellFactory(param -> {
            TableCell<TableBook, String> cell = new TableCell<>();
            Text text = new Text();
            cell.setGraphic(text);
            cell.setTextFill(Color.RED);
            cell.setPrefHeight(Control.USE_COMPUTED_SIZE);
            text.wrappingWidthProperty().bind(cell.widthProperty());
            text.textProperty().bind(cell.itemProperty());
            return cell;
        });
        priceCol.setCellValueFactory(new PropertyValueFactory<>("price"));
        imageColumn.setCellValueFactory(new PropertyValueFactory<>("imageView"));

        updateTable();
    }

    public void addImage(){
        try {
            FileChooser.ExtensionFilter imageFilter = new FileChooser.ExtensionFilter("Image Files", "*.jpg", "*.png");
            FileChooser fileChooser = new FileChooser();
            fileChooser.getExtensionFilters().add(imageFilter);
            fileChooser.setTitle(choosePhoto);
            Image image = new Image(fileChooser.showOpenDialog(Main.mainStage).toURI().toString());
            bookImage = image;
            bookImageView.setImage(image);
        }
        catch(Exception e) {
            if(bookImage == null){
                Alert alert = new Alert(Alert.AlertType.ERROR);
                Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                stage.getIcons().add(new Image("project/images/other/logo.png"));
                alert.setTitle(error);
                alert.setHeaderText(choosePhoto);
                alert.showAndWait();
                LOG.log(Level.SEVERE, "User did not choose a picture");
            }
        }
    }

    public void sendIntoDatabase(){
        if(testRequired() || testDouble()){
            return;
        }

        SellableBook sellableBook = new SellableBook(Main.booksDatabase.getBookId(), bookName.getText(), authorName.getText(), bookNote.getText(), new CustomImage(bookImage), Double.parseDouble(price.getText()), Main.currUser.getUserName());
        if (event instanceof BookExchange){
            for(Book i : ((BookExchange) event).getBooks()) {
                if (i.getTitle().equals(bookName.getText())){
                    Alert alert = new Alert(Alert.AlertType.ERROR);
                    Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
                    stage.getIcons().add(new Image("project/images/other/logo.png"));
                    alert.setTitle(error);
                    alert.setHeaderText(existingBook);
                    alert.showAndWait();
                    LOG.log(Level.INFO, "User tried to add the same book twice");
                    return;
                }
            }
        }

        sellableBook.setCreatedAt(LocalDate.now());
        ((BookExchange) event).addBook(sellableBook);

        for(User user: Main.userDatabase.getUsers()){
            if(!(user instanceof Organizer)){
                continue;
            }
            Organizer organizer = (Organizer) user;
            for(Event temp: organizer.getEvents()){
                if(temp.toString().equals(event.toString())){
                    organizer.removeEvent(event);
                    organizer.addEvent((BookExchange) event);
                    Main.userDatabase.removeUser(organizer);
                    Main.userDatabase.addUser(organizer);

                    JOptionPane.showMessageDialog(null, successfulAdd);
                    bookImageView.setImage(bookImage);
                    updateTable();
                    deleteFields();
                    return;
                }
            }
        }
    }

    private void updateTable(){
        tableView.getItems().clear();
        for(SellableBook sellableBook: ((BookExchange) event).getBooks()) {
            TableBook tableBook = new TableBook(sellableBook.getId(), sellableBook.getTitle(), sellableBook.getAuthor(), sellableBook.getNote(), sellableBook.getImage(), null, null ,false);
            ImageView imageView = tableBook.getImageView();
            imageView.setPreserveRatio(true);
            imageView.setFitWidth(225);
            tableBook.setImageView(imageView);
            tableBook.setPrice(sellableBook.getPrice());
            tableBooks.add(tableBook);
        }
        tableView.setItems(tableBooks);
        tableView.refresh();
    }

    public void setYearMonth(YearMonth yearMonth) {
        this.yearMonth = yearMonth;
    }

    private void deleteFields(){
        authorName.clear();
        bookName.clear();
        bookNote.clear();
        price.clear();
        bookImageView.setImage(new Image("project/images/other/noImage.jpg"));
        bookImage = null;
    }

    private boolean testRequired(){
        if(bookName.getText().equals("") || authorName.getText().equals("") || bookNote.getText().equals("") || bookImage == null){
            Alert alert = new Alert(Alert.AlertType.ERROR);
            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
            stage.getIcons().add(new Image("project/images/other/logo.png"));
            alert.setTitle(error);
            alert.setHeaderText(requiredError);
            alert.showAndWait();
            LOG.log(Level.INFO, "User did not enter all required information");
            return true;
        }
        return false;
    }

    private boolean testDouble(){
        try {
            Double.parseDouble(price.getText());
        }
        catch(Exception e) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            Stage stage = (Stage) alert.getDialogPane().getScene().getWindow();
            stage.getIcons().add(new Image("project/images/other/logo.png"));
            alert.setTitle(error);
            alert.setHeaderText(wrongNumber);
            alert.showAndWait();
            LOG.log(Level.SEVERE, "User entered price at invalid format");
            return true;
        }
        return false;
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

    private static final Logger LOG = Logger.getLogger(AddExchangeBookController.class.getName());
}
