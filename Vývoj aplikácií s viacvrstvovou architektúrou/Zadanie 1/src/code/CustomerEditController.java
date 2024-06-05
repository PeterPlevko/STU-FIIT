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
import Messie.classes.Customer;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class CustomerEditController implements Initializable {

    @FXML private TableView<Customer> tableView;
    @FXML private TableColumn<Customer, String> nameSurname;
    @FXML private TableColumn<Customer, String> address;
    @FXML private TableColumn<Customer, String> city;
    @FXML private TableColumn<Customer, String> postalCode;

    // metho to allow user to double click on cell and updatethe first name of the person
    public void changeFirstNameCellEvent(TableColumn.CellEditEvent edditedCell){
        Customer customerSelected = tableView.getSelectionModel().getSelectedItem();
        customerSelected.setNameSurname(edditedCell.getNewValue().toString() );
    }

    public void changeLastNameCellEvent(TableColumn.CellEditEvent edditedCell){
        Customer customerSelected = tableView.getSelectionModel().getSelectedItem();
        customerSelected.setAddress(edditedCell.getNewValue().toString() );
    }

    public void changeCityCellEvent(TableColumn.CellEditEvent edditedCell){
        Customer customerSelected = tableView.getSelectionModel().getSelectedItem();
        customerSelected.setCity(edditedCell.getNewValue().toString() );
    }

    public void changePostalCodeCellEvent(TableColumn.CellEditEvent edditedCell){
        Customer customerSelected = tableView.getSelectionModel().getSelectedItem();
        customerSelected.setPostalCode(edditedCell.getNewValue().toString() );
    }


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        nameSurname.setCellValueFactory(new PropertyValueFactory<Customer, String>("nameSurname"));
        address.setCellValueFactory(new PropertyValueFactory<Customer, String>("address"));
        city.setCellValueFactory(new PropertyValueFactory<Customer, String>("city"));
        postalCode.setCellValueFactory(new PropertyValueFactory<Customer, String>("postalCode"));

        tableView.setItems(Database.customers);

        tableView.setEditable(true);
        nameSurname.setCellFactory(TextFieldTableCell.forTableColumn());
        address.setCellFactory(TextFieldTableCell.forTableColumn());
        city.setCellFactory(TextFieldTableCell.forTableColumn());
        postalCode.setCellFactory(TextFieldTableCell.forTableColumn());
    }




    // zmenenie sceny
    public void switchToMain() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
    }

    public void deleteUser() throws IOException {
        Customer thing = tableView.getSelectionModel().getSelectedItem();
        String thing2 = thing.getNameSurname();
        FinalInfoController.nameOfCustomerClickedOn = thing2;
        Database.customers.remove(1);
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
    }



}
