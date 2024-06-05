package Data;
import javafx.scene.control.Alert;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

/**
 * this class uses gui to print eror message
 */
public class GUIInvalidPasswordException
{
    /**
     * this method print error message
     */
    public static void PrintErrorMessage()
    {
        Image image = new Image("https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Emojione_1F62D.svg/64px-Emojione_1F62D.svg.png");
        ImageView imageView = new ImageView(image);
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setGraphic(imageView);
        alert.setTitle("Warning message");
        alert.setHeaderText("Error");
        alert.setContentText("Zadaj heslo dlhsie ako 5 znakov");
        alert.showAndWait();
    }

}
