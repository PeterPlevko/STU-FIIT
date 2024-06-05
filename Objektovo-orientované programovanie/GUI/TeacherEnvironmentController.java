package GUI;

import Data.StudentDatabase;
import Data.TeacherDatabase;
import Login.LoginSystem;
import Students.Student;
import Teachers.*;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;

import javax.swing.*;
import java.io.IOException;

public class TeacherEnvironmentController {
    public static Teacher teacher = null;
    public static Student student = null;
    @FXML
    public Button button;
    public Label payLabel;
    public Label explainSubjectLabel;
    public Label shoutLabel;
    public Label messageLabel;
    public ObservableList<String> students = FXCollections.observableArrayList();
    public ObservableList<String> actions = FXCollections.observableArrayList();
    public ComboBox comboBoxStudents;
    public ComboBox comboBoxThings;
    public TextField firstLabel;
    public TextField secondLabel;
    public ListView studentListView;
    public Label hasMessageLabel;

    public void initialize()
    {
        for (Student student : StudentDatabase.studentList)
        {
            students.add(student.getUsername());
            int message=teacher.getHasMessage();
            if(message==1)hasMessageLabel.setVisible(true);
        }
        comboBoxStudents.setItems(students);

       if(teacher instanceof Lecturer)
       {
           actions.add("Nastav zapocet");
           comboBoxThings.setItems(actions);
       }
        if(teacher instanceof MainLecturer)
        {
            actions.add("Nastav skusku");
            actions.add("Vyhodnot studenta");
            comboBoxThings.setItems(actions);
        }
        if(teacher instanceof Trainer)
        {
            actions.add("Nastav zadanie");
            comboBoxThings.setItems(actions);
        }
        if(teacher instanceof MainTrainer)
        {
            actions.add("Nastav dochadzku");
            comboBoxThings.setItems(actions);
        }

    }

    public void setStudent()
    {
         String name = (String) comboBoxStudents.getValue();
         student = LoginSystem.findStudent(name);
         showStudentInformation(student);
    }

    public void showStudentInformation(Student student)
    {
        student.showStudentInformationGUI(this, student);
    }

    public void printPay()
    {
        teacher.printPayGUI(this);
    }

    public void explaintSubject()
    {
        teacher.explainSubjectGUI(this);
    }

    public void shout()
    {
        teacher.shoutGUI(this);
    }

    public void printMessage()
    {
        teacher.messageGUI(this);
    }

    public void findOut()
    {
        String action = (String) comboBoxThings.getValue();
        if ((action).equals("Nastav zapocet")) setExam();
        if ((action).equals("Nastav skusku")) setFinalExam();
        if ((action).equals("Vyhodnot studenta")) evaluteStudent();
        if ((action).equals("Nastav dochadzku")) setAttendance();
        if ((action).equals("Nastav zadanie")) setAssignment();
    }

    public void setAssignment()
    {
        String text1 = firstLabel.getText();
        String text2 = secondLabel.getText();
        student.setAssignment(text1);
        student.setAssignmentDeadline(text2);
        JOptionPane.showMessageDialog(null, "Nastavil si zadanie");
        firstLabel.setText("");
        secondLabel.setText("");
    }

    public void evaluteStudent()
    {
        teacher.evaluate(student);
        JOptionPane.showMessageDialog(null, "Studenta si uspesne ohodnotil");
    }


    public void setAttendance()
    {
        String week = firstLabel.getText();
        String yesOrNo = secondLabel.getText();
        student.setAttendance(Integer.parseInt(week),Integer.parseInt(yesOrNo));
        JOptionPane.showMessageDialog(null, "Nastavil si dochadzku");
        firstLabel.setText("");
        secondLabel.setText("");
    }

    public void setExam()
    {
        String text1 = firstLabel.getText();
        String text2 = secondLabel.getText();
        student.receiveExamInformation(text1,text2);
        JOptionPane.showMessageDialog(null, "Nastavil si zapocet");
        firstLabel.setText("");
        secondLabel.setText("");
    }

    public void setFinalExam()
    {
            String text1 = firstLabel.getText();
            String text2 = secondLabel.getText();
            student.receiveFinalExamInformation(text1,text2);
            JOptionPane.showMessageDialog(null, "Nastavil si skusku");
            firstLabel.setText("");
            secondLabel.setText("");
    }



    public void chooseAction()
    {
        String action = (String) comboBoxThings.getValue();
        if ((action).equals("Nastav zapocet"))
        {
         firstLabel.setPromptText("napis meno zapoctu");
         secondLabel.setPromptText("napis datum zapoctu");
        }
        if ((action).equals("Nastav skusku"))
        {
            firstLabel.setPromptText("napis meno skusky");
            secondLabel.setPromptText("napis datum skusky");
        }
        if ((action).equals("Nastav zadanie"))
        {
            firstLabel.setPromptText("napis meno zadania");
            secondLabel.setPromptText("napis deadline");
        }
        if ((action).equals("Nastav dochadzku"))
        {
            firstLabel.setPromptText("Cislo tyzdna");
            secondLabel.setPromptText("1 pre bol 0 pre nebol");
        }
    }

    public void signOut() throws IOException {
        TeacherDatabase.save();
        teacher = null;
        Parent root = FXMLLoader.load(MainGUI.class.getResource("LoginScene.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();
    }


    public void setTimetable() throws IOException {
        TimeTableEnvironmentTeacherController.teacher = teacher;
        Parent root = FXMLLoader.load(MainGUI.class.getResource("TimeTableEnvironmentTeacher.fxml"));
        Scene scene = new Scene(root);
        MainGUI.primaryStage.setScene(scene);
        MainGUI.primaryStage.show();
    }

}


