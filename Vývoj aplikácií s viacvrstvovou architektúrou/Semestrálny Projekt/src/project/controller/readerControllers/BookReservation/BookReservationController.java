package project.controller.readerControllers.BookReservation;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import project.controller.Main;
import project.model.books.Book;
import java.io.IOException;
import java.time.temporal.ChronoUnit;
import java.util.*;

public class BookReservationController{
    ObservableList<List<Book>> booksQuartet = FXCollections.observableArrayList();
    ObservableList<String> choices = FXCollections.observableArrayList();
    @FXML private ListView<List<Book>> listView;
    @FXML private ComboBox<String> comboBox;
    @FXML private Label showOptionsLabel;

    @FXML
    public void initialize(){
        if (Main.currLanguage.equals("SK")) languageSK();
        else languageEN();
        listView.setCellFactory(ListView -> new InnerTableController());
        listView.setItems(booksQuartet);
        allBooks();
        comboBox.getSelectionModel().select(0);
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
        showOptionsLabel.setText(bundle.getString("showOptionsLabel"));
        int index = comboBox.getSelectionModel().getSelectedIndex();
        choices.clear();
        choices.add(bundle.getString("allBooksOption"));
        choices.add(bundle.getString("newBooksOption"));
        comboBox.setItems(choices);
        comboBox.getSelectionModel().select(index);
    }

    private void allBooks(){
        listView.getItems().clear();
        booksQuartet.clear();
        booksQuartet.add(new ArrayList<>());
        for (Book book: Main.booksDatabase.getBooks()){
            if(booksQuartet.get(booksQuartet.size() - 1).size() == 4){
                booksQuartet.add(new ArrayList<>());
            }
            booksQuartet.get(booksQuartet.size() - 1).add(book);
        }
    }

    private void newBooks(){
        listView.getItems().clear();
        booksQuartet.clear();
        booksQuartet.add(new ArrayList<>());
        for (Book book: Main.booksDatabase.getBooks()){
            if(Main.booksDatabase.getDate().compareTo(book.getCreatedAt()) >= 0){
                long daysBetween = ChronoUnit.DAYS.between(book.getCreatedAt(), Main.booksDatabase.getDate());
                if (daysBetween > 10){
                    continue;
                }
                if(booksQuartet.get(booksQuartet.size() - 1).size() == 4){
                    booksQuartet.add(new ArrayList<>());
                }
                booksQuartet.get(booksQuartet.size() - 1).add(book);
            }
        }
    }

    public void changeBooks(){
        String option = comboBox.getSelectionModel().getSelectedItem();
        if(option == null){
            return;
        }
        if(option.equals(choices.get(0))){
            allBooks();
        }
        else if(option.equals(choices.get(1))){
            newBooks();
        }
    }

    public void showMenu() throws IOException {
        Locale locale;
        if (Main.currLanguage.equals("SK")) locale = new Locale("sk_SK");
        else locale = new Locale("en_US");
        ResourceBundle bundle = ResourceBundle.getBundle("project/resources.readerView", locale);
        Parent root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("/project/view/readerViews/ReaderView.fxml")), bundle);
        Scene scene = new Scene(root);
        Main.mainStage.setScene(scene);
        Main.mainStage.show();
    }
}
