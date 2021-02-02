package GUI;
import Students.Student;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import java.io.IOException;

/**
 * this class acts as timetableenvronmentstudent controller
 */
public class TimeTableEnvironmentStudentController
{
    public TextField monday;
    public TextField tuesday;
    public TextField wednesday;
    public TextField thurstday;
    public TextField friday;
    public static Student student;

    /**
     * prints lectures
     */
    public void showLectures()
{
    student.printTimeTableLectures(this);
}

    /**
     * prints traingings
     */
    public void showTrainings()
{
    student.printTimeTableTrainings(this);
}

    /**
     * switches scene
     * @throws IOException
     */
    public void goBack() throws IOException
    {
        Parent root = FXMLLoader.load(MainGUI.class.getResource("StudentEnvironment.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();

    }

}
