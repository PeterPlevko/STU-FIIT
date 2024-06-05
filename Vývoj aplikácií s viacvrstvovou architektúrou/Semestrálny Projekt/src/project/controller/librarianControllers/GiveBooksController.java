package project.controller.librarianControllers;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.collections.transformation.SortedList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.ImageView;
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

public class GiveBooksController {
    ObservableList<Reader> readers = FXCollections.observableArrayList();
    ObservableList<BookReservation> bookReservations = FXCollections.observableArrayList();
    ObservableList<TableBook> freeBooks = FXCollections.observableArrayList();
    private Reader reader;
    @FXML private ComboBox<Reader> readersBox;
    @FXML private ListView<BookReservation> listView;
    @FXML private Label infoLabel;
    @FXML private Button giveBtn;
    @FXML private Button addBtn;
    @FXML private DatePicker datePicker;
    @FXML private TableView<TableBook> tableView;
    @FXML private TableColumn<TableBook, String> authorColumn;
    @FXML private TableColumn<TableBook, String> titleColumn;
    @FXML private TableColumn<TableBook, ImageView> imageColumn;
    @FXML private TextField filterField;
    @FXML private Label text1;
    @FXML private Label text2;
    @FXML private Label text4;

    @FXML
    public void initialize(){
        for(User user: Main.userDatabase.getUsers()){
            if(user instanceof Reader){
                readers.add((Reader) user);
            }

        }
        readersBox.setItems(readers);
        infoLabel.setVisible(false);
        giveBtn.setDisable(true);
        addBtn.setDisable(true);
        datePicker.setDisable(true);

        authorColumn.setCellValueFactory(new PropertyValueFactory<>("author"));
        authorColumn.setCellFactory(param -> {
            TableCell<TableBook, String> cell = new TableCell<>();
            Text text = new Text();
            cell.setGraphic(text);
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
            cell.setPrefHeight(Control.USE_COMPUTED_SIZE);
            text.wrappingWidthProperty().bind(cell.widthProperty());
            text.textProperty().bind(cell.itemProperty());
            return cell;
        });
        imageColumn.setCellValueFactory(new PropertyValueFactory<>("imageView"));
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
        text1.setText(bundle.getString("text1"));
        giveBtn.setText(bundle.getString("giveBtn"));
        text2.setText(bundle.getString("text2"));
        addBtn.setText(bundle.getString("addBtn"));
        filterField.setPromptText(bundle.getString("search"));
        text4.setText(bundle.getString("text4"));
        authorColumn.setText(bundle.getString("authorColumn"));
        titleColumn.setText(bundle.getString("titleColumn"));
        imageColumn.setText(bundle.getString("imageColumn"));
        infoLabel.setText(bundle.getString("chooseReader"));
    }

    public void showReservations(){
        reader = readersBox.getValue();
        if (reader == null){
            return;
        }
        bookReservations.clear();
        for(BookReservation bookReservation: reader.getReservations()){
            if (bookReservation.isReturned() == null && (bookReservation.getDateFrom().equals(Main.booksDatabase.getDate()) ||
                    (bookReservation.getDateFrom().isBefore(Main.booksDatabase.getDate()) &&
                            bookReservation.getDateTo().isAfter(Main.booksDatabase.getDate())))){
                bookReservations.add(bookReservation);
            }
        }
        listView.setItems(bookReservations);
        listView.refresh();
        giveBtn.setDisable(false);
        addBtn.setDisable(true);
        updateTableView();
    }

    private void updateTableView(){
        freeBooks.clear();
        for(Book book: Main.booksDatabase.getBooks()){
            boolean isFree = true;
            for(User user: Main.userDatabase.getUsers()){
                if(user instanceof Reader){
                    for(BookReservation bookReservation: ((Reader) user).getReservations()){
                        if (book.getId() == bookReservation.getBookId() &&
                                ((Main.booksDatabase.getDate().compareTo(bookReservation.getDateFrom()) >= 0 &&
                                        Main.booksDatabase.getDate().compareTo(bookReservation.getDateTo()) <= 0) ||
                                        (bookReservation.isReturned() != null && !bookReservation.isReturned()))) {
                            if(bookReservation.isReturned() != null && !bookReservation.isReturned()){
                                continue;
                            }
                            isFree = false;
                            break;
                        }
                    }
                }
            }
            if (isFree){
                freeBooks.add(new TableBook(book.getId(), book.getTitle(), book.getAuthor(), book.getNote(), book.getImage(), null, null, null));
            }
        }

        FilteredList<TableBook> filteredData = new FilteredList<>(freeBooks, b-> true);
        filterField.textProperty().addListener((observable, oldValue, newValue)-> filteredData.setPredicate(TableBook -> {
            if (newValue == null || newValue.isEmpty()) {
                return true;
            }

            String lowerCaseFilter = newValue.toLowerCase();
            if (TableBook.getAuthor().toLowerCase().contains(lowerCaseFilter)) {
                return true;
            } else return TableBook.getTitle().toLowerCase().contains(lowerCaseFilter);
        }));
        SortedList<TableBook> sortedData = new SortedList<>(filteredData);
        sortedData.comparatorProperty().bind(tableView.comparatorProperty());
        tableView.setItems(sortedData);
    }

    public void giveBooks(){
        if(reader == null){
            infoLabel.setVisible(true);
            return;
        }
        else {
            infoLabel.setVisible(false);
        }

        for(BookReservation bookReservation: bookReservations){
            bookReservation.setReturned(false);
            reader.removeReservation(bookReservation);
            reader.addReservation(bookReservation);
        }
        Main.userDatabase.removeUser(reader);
        Main.userDatabase.addUser(reader);
        deleteFields();
    }

    public void showDates(){
        datePicker.setDisable(false);
        Book book = tableView.getSelectionModel().getSelectedItem();
        final Callback<DatePicker, DateCell> dayCellFactory = new Callback<DatePicker, DateCell>() {
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
                            if (!(user instanceof Reader)){
                                continue;
                            }
                            Reader reader = (Reader) user;
                            for(BookReservation bookReservation: reader.getReservations()){
                                if(bookReservation.getBookId() == book.getId()){
                                    LocalDate dateFrom = bookReservation.getDateFrom();
                                    LocalDate dateTo = bookReservation.getDateTo();
                                    if ((dateCurr.isAfter(dateFrom) && dateCurr.isBefore(dateTo)) || dateCurr.equals(dateFrom) || dateCurr.equals(dateTo)) {
                                        setStyle("-fx-background-color: #ff4444;");
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

    public void enableAddBtn(){
        addBtn.setDisable(false);
    }

    public void addBook(){
        LocalDate dateTo = datePicker.getValue();
        Book book = tableView.getSelectionModel().getSelectedItem();
        bookReservations.add(new BookReservation(book.getId(), Main.booksDatabase.getDate(), dateTo));
        datePicker.setDisable(true);
        datePicker.setValue(null);
        freeBooks.removeIf(temp -> temp.getId() == book.getId());
        tableView.refresh();
        listView.refresh();
    }

    private void deleteFields(){
        listView.getItems().clear();
        listView.refresh();
        readersBox.getSelectionModel().clearSelection();
        giveBtn.setDisable(true);
        addBtn.setDisable(true);
        datePicker.setDisable(true);
        datePicker.setValue(null);
        freeBooks.clear();
        tableView.refresh();
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
