package Messie;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.control.cell.TextFieldTableCell;
import Messie.classes.Merchandise;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class MerchandiseEditController implements Initializable {

    @FXML
    private TableView<Merchandise> tableView;
    @FXML private TableColumn<Merchandise, String> name;
    @FXML private TableColumn<Merchandise, String> about;
    @FXML private TableColumn<Merchandise, String> price;

    public void changeNameCellEvent(TableColumn.CellEditEvent edditedCell){
        Merchandise merchandiseSelected = tableView.getSelectionModel().getSelectedItem();
        merchandiseSelected.setName(edditedCell.getNewValue().toString() );
    }

    public void changeAboutCellEvent(TableColumn.CellEditEvent edditedCell){

        Merchandise merchandiseSelected = tableView.getSelectionModel().getSelectedItem();
        merchandiseSelected.setAbout(edditedCell.getNewValue().toString() );
    }

    public void changePriceCellEvent(TableColumn.CellEditEvent edditedCell){
        Merchandise merchandiseSelected = tableView.getSelectionModel().getSelectedItem();
        merchandiseSelected.setPrice(edditedCell.getNewValue().toString() );
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        name.setCellValueFactory(new PropertyValueFactory<Merchandise, String>("name"));
        about.setCellValueFactory(new PropertyValueFactory<Merchandise, String>("about"));
        price.setCellValueFactory(new PropertyValueFactory<Merchandise, String>("price"));

        //
        tableView.setItems(Database.merchandises);

        tableView.setEditable(true);
        name.setCellFactory(TextFieldTableCell.forTableColumn());
        about.setCellFactory(TextFieldTableCell.forTableColumn());
        price.setCellFactory(TextFieldTableCell.forTableColumn());

    }

    public void switchToMain() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
        //primaryStage.setScene(scene);
        //primaryStage.show();
    }

    public void deleteUser() throws IOException {
        Merchandise thing = tableView.getSelectionModel().getSelectedItem();
        String thing2 = thing.getName();
        FinalInfoController.nameOfCustomerClickedOn = thing2;
        Database.merchandises.remove(1);
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
    }
}
