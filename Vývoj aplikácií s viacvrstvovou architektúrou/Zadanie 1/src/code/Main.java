package Messie;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;
import Messie.classes.Customer;
import Messie.classes.Merchandise;
import java.io.IOException;

public class Main extends Application {

    public static Stage primaryStage;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception{
        Database.customers.add(new Customer("Peter Plevko", "Polana 832", "Skalite", "02314"));
        Database.customers.add(new Customer("Martin Plevko", "Micigen 832", "Vychodnare", "00000"));
        Database.merchandises.add(new Merchandise("Tricko", "Tricko z bavlny", "69"));
        Database.merchandises.add(new Merchandise("Nohavice", "Nohavice z plastu", "42"));

        this.primaryStage = primaryStage;
        this.primaryStage.getIcons().add(new Image("Messie/picture/mesies.png"));
        this.primaryStage.setTitle("super faktura");
        showMainView();
    }

    public static void showMainView() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("Main.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void switchToCustomer() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("Customer.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void switchToMerchandise() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("Merchandise.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void switchToChangeCustomer() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("CustomerEdit.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void switchToChangeMerchandise() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("MerchandiseEdit.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public void switchToBill() throws IOException {
        Parent root = FXMLLoader.load(Main.class.getResource("Bill.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

}
