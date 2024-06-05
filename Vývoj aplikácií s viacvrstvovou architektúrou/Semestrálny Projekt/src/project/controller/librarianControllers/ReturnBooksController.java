package project.controller.librarianControllers;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import javafx.util.Callback;
import project.controller.Main;
import project.model.books.Book;
import project.model.books.BookReservation;
import project.model.books.TableBook;
import project.model.users.Reader;
import project.model.users.User;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Locale;
import java.util.Objects;
import java.util.ResourceBundle;

public class ReturnBooksController {
    ObservableList<project.model.users.Reader> readers = FXCollections.observableArrayList();
    ObservableList<TableBook> rentedBooks = FXCollections.observableArrayList();
    private Reader reader;
    private Book book;
    @FXML private ComboBox<Reader> readersBox;
    @FXML private TableView<TableBook> tableView;
    @FXML private TableColumn<TableBook, String> authorColumn;
    @FXML private TableColumn<TableBook, String> titleColumn;
    @FXML private TableColumn<TableBook, ImageView> imageColumn;
    @FXML private DatePicker datePicker;
    @FXML private Button returnBtn;
    @FXML private Button extendBtn;
    @FXML private Label readerLabel;

    @FXML
    public void initialize(){
        for(User user: Main.userDatabase.getUsers()){
            if(user instanceof Reader){
                readers.add((Reader) user);
            }
        }
        readersBox.setItems(readers);

        tableView.setRowFactory(tv -> new TableRow<TableBook>() {
            @Override
            protected void updateItem(TableBook item, boolean empty) {
                super.updateItem(item, empty);
                if(item == null){
                    setStyle("");
                    return;
                }
                if(Main.booksDatabase.getDate().compareTo(item.getDateTo()) > 0){
                    setStyle("-fx-background-color: #ff9494;");
                }
                else setStyle("");
            }
        });

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
        imageColumn.setCellValueFactory(new PropertyValueFactory<>("imageView"));
        returnBtn.setDisable(true);
        extendBtn.setDisable(true);
        datePicker.setDisable(true);
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
        authorColumn.setText(bundle.getString("authorColumn"));
        titleColumn.setText(bundle.getString("titleColumn"));
        imageColumn.setText(bundle.getString("imageColumn"));
        readerLabel.setText(bundle.getString("reader"));
        extendBtn.setText(bundle.getString("length"));
        returnBtn.setText(bundle.getString("return"));
    }

    public void updateTableView(){
        tableView.getItems().clear();
        reader = readersBox.getValue();
        for(BookReservation bookReservation: reader.getReservations()){
            if(bookReservation.isReturned() == null){
                continue;
            }
            if(!bookReservation.isReturned()){
                Book temp = Main.booksDatabase.getBooks().get(bookReservation.getBookId());
                rentedBooks.add(new TableBook(temp.getId(), temp.getTitle(), temp.getAuthor(), temp.getNote(), temp.getImage(), bookReservation.getDateFrom(), bookReservation.getDateTo(), bookReservation.isReturned()));
            }
        }
        tableView.setItems(rentedBooks);
        tableView.refresh();
    }

    public void showDates(){
        if(rentedBooks.size() == 0){
            return;
        }
        returnBtn.setDisable(false);

        datePicker.setDisable(false);
        book = tableView.getSelectionModel().getSelectedItem();
        final Callback<DatePicker, DateCell> dayCellFactory = new Callback<DatePicker, DateCell>() {
            LocalDate dateBlock = null;
            public DateCell call(final DatePicker datePicker) {
                return new DateCell() {
                    @Override
                    public void updateItem(LocalDate dateCurr, boolean empty) {
                        super.updateItem(dateCurr, empty);
                        LocalDate now = Main.booksDatabase.getDate();
                        if(dateCurr.compareTo(now) <= 0){
                            setDisable(true);
                            return;
                        }

                        for(User user: Main.userDatabase.getUsers()){
                            if (!(user instanceof Reader) || user.getUserName().equals(reader.getUserName())){
                                continue;
                            }
                            Reader temp = (Reader) user;
                            for(BookReservation bookReservation: temp.getReservations()){
                                if(bookReservation.getBookId() == book.getId()){
                                    LocalDate dateFrom = bookReservation.getDateFrom();
                                    LocalDate dateTo = bookReservation.getDateTo();
                                    if ((dateCurr.isAfter(dateFrom) && dateCurr.isBefore(dateTo)) || dateCurr.equals(dateFrom) || dateCurr.equals(dateTo)) {
                                        setStyle("-fx-background-color: #ff4444;");
                                        setDisable(true);
                                        dateBlock = dateCurr;
                                        continue;
                                    }
                                    if (dateBlock != null && dateCurr.compareTo(dateBlock) >= 0){
                                        setDisable(true);
                                    }
                                }
                            }
                        }
                    }
                };
            }
        };

        datePicker.setDayCellFactory(dayCellFactory);
        datePicker.setDisable(false);
    }

    public void showExtendBtn(){
        extendBtn.setDisable(false);
    }

    public void returnBook(){
        for(BookReservation bookReservation: reader.getReservations()){
            if(bookReservation.getBookId() == book.getId() && bookReservation.isReturned() != null &&!bookReservation.isReturned()){
                bookReservation.setReturned(true);
                reader.removeReservation(bookReservation);
                bookReservation.setDateTo(Main.booksDatabase.getDate());
                reader.addReservation(bookReservation);
                Main.userDatabase.removeUser(reader);
                Main.userDatabase.addUser(reader);
                rentedBooks.removeIf(temp -> temp.getId() == book.getId());
                tableView.refresh();
                deleteFields();
                book = null;
                return;
            }
        }
    }

    public void extendBook(){
        LocalDate dateTo = datePicker.getValue();
        for(BookReservation bookReservation: reader.getReservations()){
            if(bookReservation.getBookId() == book.getId() && !bookReservation.isReturned()){
                reader.removeReservation(bookReservation);
                bookReservation.setDateTo(dateTo);
                reader.addReservation(bookReservation);
                Main.userDatabase.removeUser(reader);
                Main.userDatabase.addUser(reader);
                deleteFields();
                book = null;
                return;
            }
        }
    }

    private void deleteFields(){
        returnBtn.setDisable(true);
        extendBtn.setDisable(true);
        datePicker.setValue(null);
        datePicker.setDisable(true);
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
}
