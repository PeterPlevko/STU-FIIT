package Messie;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.text.Text;
import Messie.classes.Merchandise;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ResourceBundle;

public class FinalInfoController implements Initializable {
    public static int mesie;
    @FXML
    private Text finalnaCena;
    public static String nameOfCustomerClickedOn;
    @FXML
    private Text name;
    @FXML
    private Text address;
    @FXML
    private Text city;
    @FXML
    private Text postalCode;
    @FXML
    private Text date;
    @FXML private TableView tableview;


    @FXML private TableColumn <Merchandise, SimpleStringProperty> nameMerchandise;
    @FXML private TableColumn <Merchandise, SimpleStringProperty> about;
    @FXML private TableColumn <Merchandise, SimpleStringProperty> price;
    @FXML private TableColumn <Merchandise, SimpleStringProperty> number;
    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        for (int i = 0; i < Database.billList.size(); i++) {
            if (Database.billList.get(i).getCustomer().getNameSurname().equals(nameOfCustomerClickedOn)) {
                name.setText(Database.billList.get(i).getCustomer().getNameSurname());
                address.setText(Database.billList.get(i).getCustomer().getAddress());
                city.setText(Database.billList.get(i).getCustomer().getCity());
                postalCode.setText(Database.billList.get(i).getCustomer().getPostalCode());
                LocalDate datum = Database.billList.get(i).getLocaldate();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd LLLL yyyy");
                String formattedString = datum.format(formatter);
                date.setText(formattedString);


                nameMerchandise.setCellValueFactory(new PropertyValueFactory<Merchandise, SimpleStringProperty>("name"));
                about.setCellValueFactory(new PropertyValueFactory<Merchandise, SimpleStringProperty>("about"));
                price.setCellValueFactory(new PropertyValueFactory<Merchandise, SimpleStringProperty>("price"));
                number.setCellValueFactory(new PropertyValueFactory<Merchandise, SimpleStringProperty>("quantity"));

                ObservableList<Merchandise> list = FXCollections.observableArrayList(Database.billList.get(0).getMerchandiseBill());
                tableview.setItems(list);
                finalnaCena.setText(Integer.toString(mesie) );
            }
        }
    }

    public void goBack() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        Main.primaryStage.setScene(scene);
        Main.primaryStage.show();
    }

}
