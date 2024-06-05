package GUI;
import Data.InvalidPasswordException;
import Data.StudentDatabase;
import Data.TeacherDatabase;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javax.swing.*;
import java.io.IOException;

/**
 * this is controller of registrationscene.fxml
 */
public class RegistrationSceneController
{
    public Label label;
    public Button button1;
    public Button button2;
    public Button button3;
    public Button button4;
    public Button button5;
    public Button button6;
    public String name;
    public String password;
    public TextField usernameField;
    public TextField passwordField;

    /**
     * checks if password is long enough
     */
    public void checkPassword()
{
    String name = null;
    String password = null;
    int flag=0;
        try
        {
            password = passwordField.getText();
            if (password.length() <= 5)
            {
                throw new InvalidPasswordException();
            }
        } catch (InvalidPasswordException e)
        {
            System.out.println(e.getMessage());
        }
        if (password.length() > 5)
        {
            JOptionPane.showMessageDialog(null, "Heslo je dostatocne silne");

            this.name = usernameField.getText();
            this.password = passwordField.getText();
            flag=1;
            view();
        }
}

    /**
     * sets buttons as viewable
     */
    public void view()
{
    label.setVisible(true);
    button1.setVisible(true);
    button2.setVisible(true);
    button3.setVisible(true);
    button4.setVisible(true);
    button5.setVisible(true);
    button6.setVisible(true);
}

    /**
     * registers user as student daily
     * @throws IOException
     */
    public void registerStudentDaily() throws IOException
{
    StudentDatabase.registration(name, password, 1);
    registrationDone();
}

    /**
     * registers user as student extern
     * @throws IOException
     */
    public void registerStudentExtern() throws IOException
{
    StudentDatabase.registration(name, password, 2);
    registrationDone();
}

    /**
     * registers user as lecturer
     * @throws IOException
     */
    public void registerLecturer() throws IOException {
    TeacherDatabase.registration(name, password, 1);
    registrationDone();
}

    /**
     * registers user as mainlecturer
     * @throws IOException
     */
    public void registerMainLecturer() throws IOException {
    TeacherDatabase.registration(name, password, 2);
    registrationDone();
}

    /**
     * registers user as trainer
     * @throws IOException
     */
    public void registerTrainer() throws IOException {
    TeacherDatabase.registration(name, password, 3);
    registrationDone();
}

    /**
     * registers user as main trainer
     * @throws IOException
     */
    public void registerMainTrainer() throws IOException {
    TeacherDatabase.registration(name, password, 4);
    registrationDone();
}

    /**
     * changes scene to login scene
     * @throws IOException
     */
    public void registrationDone() throws IOException
{
        JOptionPane.showMessageDialog(null, "Bol si uspesne registrovany teraz sa prihlas");
        Parent root = FXMLLoader.load(MainGUI.class.getResource("LoginScene.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();
}

}
