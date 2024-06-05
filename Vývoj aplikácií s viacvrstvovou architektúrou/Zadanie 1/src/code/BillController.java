package Messie;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.control.cell.TextFieldTableCell;
import javafx.scene.text.Text;
import Messie.classes.AddItems;
import Messie.classes.Bill;
import Messie.classes.Customer;
import Messie.classes.Merchandise;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.stream.Collectors;

public class BillController implements Initializable {
    ArrayList<String> merchandiseName = new ArrayList<String>();
    ArrayList<String> numberOfMerchandise = new ArrayList<String>();
    ArrayList<String> priceOf = new ArrayList<String>();

    @FXML private TextField number;
    @FXML private ComboBox<String> customer;
    @FXML private ComboBox<String> merchandise;
    @FXML private DatePicker date;
    @FXML private Text finalPrice;
    @FXML private TableView<AddItems> tableView;
    @FXML private TableView<String> tableView1;
    @FXML private TableColumn<AddItems, String> nameOf;
    @FXML private TableColumn<AddItems, String> price;
    @FXML private TableColumn<AddItems, String> numberOfItems;
    @FXML private TableColumn<String, String> nameInBill;
    @FXML private TableColumn<AddItems, String> dateCol;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        Database.turnToStringListCustomers();
        Database.turnToStringListMerchandise();
        ObservableList<String> customerList = FXCollections.observableArrayList(Database.customersList);
        customer.setItems(customerList);
        ObservableList<String> merchandiseList = FXCollections.observableArrayList(Database.merchandiseList);
        merchandise.setItems(merchandiseList);
    }

    public void addMerchandise(javafx.event.ActionEvent actionEvent){
        Database.AddItemsList.clear();
        String customerNow;
        String merchandiseNow;
        Object LocalDate;
        customerNow = customer.getValue();
        merchandiseNow = merchandise.getValue();
        LocalDate = date.getValue();
        String howMany;
        merchandiseNow = merchandise.getValue();
        howMany = number.getText();
        merchandiseName.add(merchandiseNow);
        numberOfMerchandise.add(howMany);
        nameOf.setCellValueFactory(new PropertyValueFactory<AddItems, String>("name"));
        price.setCellValueFactory(new PropertyValueFactory<AddItems, String>("price"));
        numberOfItems.setCellValueFactory(new PropertyValueFactory<AddItems, String>("number"));
        Database.fillAddItemsList(merchandiseName, numberOfMerchandise);
        tableView.setItems(Database.AddItemsList);
        tableView.setEditable(true);
        nameOf.setCellFactory(TextFieldTableCell.forTableColumn());
        price.setCellFactory(TextFieldTableCell.forTableColumn());
        numberOfItems.setCellFactory(TextFieldTableCell.forTableColumn());
    }

    public void makeBill(){
        Bill bill = new Bill();
        String customerNow = customer.getValue();
        Database.nameInList.add(customerNow);
        LocalDate Localdate = date.getValue();
        bill.setLocaldate(Localdate);
        Customer customer = Database.getCustomerByName(customerNow);
        bill.setCustomer(customer);
        List<AddItems> list = Database.AddItemsList.stream().collect(Collectors.toList());
        bill.setAdditems((ArrayList<AddItems>) list);
        nameInBill.setCellValueFactory(data -> new SimpleStringProperty(data.getValue()));
        tableView.setEditable(true);
        tableView1.setItems(Database.nameInList);
        ArrayList<String> merchandiseName = new ArrayList<String>();
        ArrayList<String> merchandiseAbout = new ArrayList<String>();
        ArrayList<String> merchandiseNumberOf = new ArrayList<String>();
        ArrayList<String> merchandisePrice = new ArrayList<String>();
        numberOfMerchandise.clear();
        for (int j = 0; j < bill.getAdditems().size(); j++){

            String name = bill.getAdditems().get(j).getName();
            String price = bill.getAdditems().get(j).getPrice();
            String number = bill.getAdditems().get(j).getNumber();
            String about = null;

            for (int i = 0; i < Database.merchandises.size(); i++){
                if(Database.merchandises.get(i).getName().equals(name)) {
                    about = Database.merchandises.get(i).getAbout();
                }
            }

            merchandiseName.add(name);
            merchandisePrice.add(price);
            merchandiseAbout.add(about);
            numberOfMerchandise.add(number);
            boolean priky=true;
            for (int i = 0; i < bill.getMerchandiseBill().size(); i++) {
                if (bill.getMerchandiseBill().get(i).getName().equals(name)){
                    priky=false;
                    bill.getMerchandiseBill().get(i).setQuantity(bill.getMerchandiseBill().get(i).getQuantity() + Integer.parseInt(price));
                }
            }
            if (priky){
                Merchandise merchandise = new Merchandise(name, about, number);
                merchandise.setQuantity(Integer.parseInt(price));
                bill.addMerchandiseBill(merchandise);
            }
        }

        Database.billList.add(bill);
        Database.AddItemsList.clear();
        int elNumberos=0;
        for (int i = 0; i < Database.billList.get(0).getMerchandiseBill().size(); i++) {
            int priceor = Integer.parseInt(Database.billList.get(0).getMerchandiseBill().get(i).getPrice());
            int quantitor =  Database.billList.get(0).getMerchandiseBill().get(i).getQuantity();
            elNumberos += elNumberos + (priceor*quantitor) ;
        }
        FinalInfoController.mesie = elNumberos;
    }

    public void skuska() throws IOException {
        String thing = tableView1.getSelectionModel().getSelectedItem();
        FinalInfoController.nameOfCustomerClickedOn = thing;
        Parent root = FXMLLoader.load(Main.class.getResource("FinalInfo.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
    }
}
