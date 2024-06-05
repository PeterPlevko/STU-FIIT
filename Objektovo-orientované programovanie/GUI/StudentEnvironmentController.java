package GUI;
import Data.StudentDatabase;
import Data.TeacherDatabase;
import Login.LoginSystem;
import Students.Student;
import Teachers.Teacher;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javax.swing.*;
import java.io.IOException;

/**
 * this is controller of student envirnment fxml
 */
public class StudentEnvironmentController
{
    public static Student student;
    @FXML
    public Label assignmentLabel;
    public Label whatTypeAmILabel;
    public Label examLabel;
    public Label finalExamLabel;
    public Label mark;
    public ListView attendanceListView;
    public ComboBox comboBox;
    public ObservableList<String> teachers = FXCollections.observableArrayList();
    public TextField textField;

    /**
     * intializes teachers
     */
    public void initialize()
    {
        for (Teacher teacher : TeacherDatabase.teacherList)
        {
            teachers.add(teacher.getUsername());
        }
        comboBox.setItems(teachers);
    }

    /**
     * prints assignemnt
     */
    public void printAssignment()
    {
    student.printAssignmentGUI(this);
    }

    /**
     * prints type
     */
    public void printType()
    {
        student.printType(this);
    }

    /**
     * prints exam
     */
    public void printExam()
    {
    student.printExamInformationGUI(this);
    }

    /**
     * prints final exam
     */
    public void printFinalExam()
    {
    student.printFinalExamInformationGUI(this);
    }

    /**
     * prints attendacne
     */
    public void printAttendance()
    {
       student.printAttendanceGUI(this);
    }

    /**
     * this method logs user off
     * @throws IOException
     */
    public void signOff() throws IOException
    {
            StudentDatabase.save();
            student = null;
            Parent root = FXMLLoader.load(MainGUI.class.getResource("LoginScene.fxml"));
            Scene scene = new Scene(root);
            MainGUI.primaryStage.setScene(scene);
            MainGUI.primaryStage.show();
    }

    /**
     * sends message
     */
    public void sendMessage()
    {
        Teacher teacher;
        String text;
        String name = (String) comboBox.getValue();
        teacher = LoginSystem.findTeacher(name);
        text = textField.getText();
        teacher.getMessage(text);
        teacher.setHasMessage();
        JOptionPane.showMessageDialog(null, "Poslal si spravu");
    }

    /**
     * prints mark
     */
    public void printMark()
    {
        student.printMarkGUI(this);
    }

    /**
     * shows timetable
     * @throws IOException
     */
    public void showTimetable() throws IOException {
        TimeTableEnvironmentStudentController.student=this.student;
        Parent root = FXMLLoader.load(MainGUI.class.getResource("TimeTableEnvironmentStudent.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();
    }

}
