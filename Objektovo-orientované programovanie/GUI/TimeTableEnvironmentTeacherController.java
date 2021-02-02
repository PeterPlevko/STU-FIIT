package GUI;
import Data.StudentDatabase;
import Login.LoginSystem;
import Students.Student;
import Teachers.*;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import java.io.IOException;
import java.util.ArrayList;

/**
 * this class acts as controller for timetbleenvironmetteacher
 */
public class TimeTableEnvironmentTeacherController
{
    public TextField monday;
    public TextField tuesday;
    public TextField wednesday;
    public TextField thurstday;
    public TextField friday;
    public ObservableList<String> students = FXCollections.observableArrayList();
    public ComboBox studentsBox;
    public Student student;
    public static Teacher teacher;

    public void initialize()
    {
        for (Student student : StudentDatabase.studentList)
        {
            students.add(student.getUsername());
        }
        studentsBox.setItems(students);
        if(teacher instanceof Lecturer && teacher instanceof MainLecturer == false|| teacher instanceof Trainer && teacher instanceof  MainTrainer == false)
        {
            monday.setEditable(true);
            tuesday.setEditable(true);
            wednesday.setEditable(true);
            thurstday.setEditable(true);
        }
        if(teacher instanceof MainLecturer || teacher instanceof MainTrainer)
        {
            friday.setEditable(true);
        }
    }

    /**
     *  chooses student
     */
    public void chooseStudent()
{
    String name;
    name = (String) studentsBox.getValue();
    this.student= LoginSystem.findStudent(name);
    if (teacher instanceof Lecturer	|| teacher instanceof MainLecturer)
    {
        ArrayList<String> timetables = new ArrayList<String>();
        timetables = student.getTimetableLectures();
        monday.setText(timetables.get(0));
        tuesday.setText(timetables.get(1));
        wednesday.setText(timetables.get(2));
        thurstday.setText(timetables.get(3));
        friday.setText(timetables.get(4));
    }
    if (teacher instanceof Trainer || teacher instanceof MainTrainer)
    {
        ArrayList<String> timetables = new ArrayList<String>();
        timetables = student.getTimetableTrainings();
        monday.setText(timetables.get(0));
        tuesday.setText(timetables.get(1));
        wednesday.setText(timetables.get(2));
        thurstday.setText(timetables.get(3));
        friday.setText(timetables.get(4));
    }
}

    /**
     * uplaods timetable to student
     * @throws IOException
     */
    public void sendTimetables() throws IOException {
    teacher.setTimeTableGUI(this,this.student);
    Alert alert = new Alert(Alert.AlertType.INFORMATION);
    alert.setTitle("spravne");
    alert.setHeaderText(null);
    alert.setContentText("Uspesne si zmenil rozvrh");
    alert.showAndWait();
    TimeTableEnvironmentTeacherController.teacher = teacher;
    Parent root = FXMLLoader.load(MainGUI.class.getResource("TeacherEnvironment.fxml"));
    Scene scene = new Scene(root);
    MainGUI.primaryStage.setScene(scene);
    MainGUI.primaryStage.show();
}

}
