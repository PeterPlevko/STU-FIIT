package GUI;
import java.io.*;
import java.util.Scanner;
import Data.StudentDatabase;
import Data.TeacherDatabase;
import Students.Student;
import Students.StudentDaily;
import Students.StudentExtern;
import Teachers.*;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.MenuBar;
import javafx.scene.image.Image;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

/**
 * this acts as main and everything starts here
 */
public class MainGUI extends Application{
    public static Stage primaryStage;
    public static AnchorPane mainLayout;
    public static Student curr_student;
    public static Teacher curr_teacher;
    public static Student zmen_student;// zmen na ang

    /**
     * i am loading people into database
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception
    {
        StudentDaily jozo = new StudentDaily("Jozef", "123");
        jozo.setTimeTableLectures("Matematika","Fyzika","Slovencina","Programovanie");
        jozo.setTimeTableLecturesFriday("Nemcina");
        jozo.setTimeTableTrainings("Programovanie","Slovencina","Fyzika","Nemcina");
        jozo.setTimeTableTrainingFriday("Matematika");
        jozo.setAssignment("Zadanie z matematiky");
        jozo.setAssignmentDeadline("20.4.2020");
        jozo.receiveExamInformation("zapocet z matematickej logiky","21.5.2020");
        jozo.receiveFinalExamInformation("skuska z programovania","21.5.2020");
        jozo.receiveMaterials("Prednaska 1" ,1);
        jozo.receiveMaterials("skripta z javy","1.2.2000");
        jozo.setAttendance(1,1);
        jozo.setMark("1");
        jozo.receiveMaterials("prednaska 1", 1);
        StudentDatabase.studentList.add(jozo);

//serializacia studentov
//        StudentDatabase.studentList.add(new StudentDaily("Martin", "456"));
//        StudentDatabase.studentList.add(new StudentExtern("Roman", "789"));
//        StudentDatabase.save();
//serializacia studentov

//deserializacia studentov
        StudentDatabase.load();
//deserializacia studentov

//serializacia ucitelov
//        TeacherDatabase.teacherList.add(new Trainer("Monika", "123456"));
//        TeacherDatabase.teacherList.add(new MainTrainer("Rado", "1234567"));
//        TeacherDatabase.teacherList.add(new Lecturer("Matej", "12345678"));
//        TeacherDatabase.teacherList.add(new MainLecturer("Peter", "123456789"));
//        TeacherDatabase.save();
//serializacia ucitelov

//deserializacia studentov
 TeacherDatabase.load();
//Deserializacia studentov
        launch(args);
    }

    /**
     * starts gui
     * @param primaryStage
     * @throws Exception
     */
    @Override
    public void start(Stage primaryStage) throws Exception {

        this.primaryStage = primaryStage;
        this.primaryStage.setTitle("Bezpecny informacny system");
        this.primaryStage.getIcons().add(new Image("GUI/Pictures/bis2.png"));
        showMainView();
    }

    public static void showMainView() throws IOException {

        Parent root = FXMLLoader.load(MainGUI.class.getResource("LoginScene.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

}
