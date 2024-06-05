package GUI;
import Students.Student;
import Teachers.Teacher;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import Login.LoginSystem;
import javax.swing.*;
import java.io.IOException;

/**
 * this class controls loginscene.fxml
 */
public class LoginSceneController
{
    Student student = null;
    Teacher teacher = null;
    @FXML
    private TextField username;
    @FXML
    private TextField password;

    /**
     * logs user in
     * @throws IOException
     */
    public void Login() throws IOException
    {
        LoginSystem loginSystem = new LoginSystem();
        username.getText();
        password.getText();
        student = LoginSystem.loginStudent(username.getText(),password.getText());
        teacher = LoginSystem.loginTeacher(username.getText(),password.getText());
        if (student!=null)
        {
            StudentEnvironmentController.student = student;
            ChangeScene();
        }
        if (teacher!=null)
        {
            TeacherEnvironmentController.teacher = teacher;
            ChangeScene1();
        }
        if (student==null&&teacher==null)
        {
            JOptionPane.showMessageDialog(null, "Zadal si zle heslo alebo meno skus znova");
        }
    }

    /**
     * sets stage to registration
     * @throws IOException
     */
    public void Registration() throws IOException
    {
        Parent root = FXMLLoader.load(MainGUI.class.getResource("RegistrationScene.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();
    }

    /**
     * changes scene to studentenvironment
     * @throws IOException
     */
    public void ChangeScene() throws IOException
    {
        Parent root = FXMLLoader.load(MainGUI.class.getResource("StudentEnvironment.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();
    }

    /**
     * changes scene to teacher environment
     * @throws IOException
     */
    public void ChangeScene1() throws IOException
    {
        Parent root = FXMLLoader.load(MainGUI.class.getResource("TeacherEnvironment.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();
    }

}
