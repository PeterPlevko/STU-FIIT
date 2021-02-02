package Students;
import GUI.StudentEnvironmentController;
import GUI.TeacherEnvironmentController;
import GUI.TimeTableEnvironmentStudentController;
import Login.LoginSystem;
import Visitor.Visitor;
import java.io.Serializable;
import java.util.ArrayList;
import Teachers.Teacher;
import Visitor.Visitable;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;

/**
 * this class is used as student
 */
public class Student implements Visitable,Serializable {

    protected String mark, message, assignment, assignmentDeadline, scripts, exam, finalExam, password, username;
    protected String examDate, finalExamDate, scriptsReleaseDate = null;
    private int[] attendance = new int[10];
    private String[] lectures = new String[10];
    TimeTable timeTable = new TimeTable();

    /**
     * contructor of student
     * @param username
     * @param password
     */
    public Student(String username, String password)
    {
        this.username=username;
        this.password=password;
    }

    /**
     * prints assignment
     * @param controler
     */
    public void printAssignmentGUI(StudentEnvironmentController controler)
    {
        controler.assignmentLabel.setText(this.assignment);
    }

    /**
     * prints examinformation
     * @param controler
     */
    public void printExamInformationGUI(StudentEnvironmentController controler)
    {
        controler.examLabel.setText(this.exam +" datum: "+this.examDate);
    }

    /**
     * prints final exam information
     * @param controler
     */
    public void printFinalExamInformationGUI(StudentEnvironmentController controler)
    {
        controler.finalExamLabel.setText(this.finalExam+" datum: "+this.finalExamDate);
    }

    /**
     * prints attendance
     * @param controler
     */
    public void printAttendanceGUI(StudentEnvironmentController controler)
    {
        int i=0;
        for (int data :attendance)
        controler.attendanceListView.getItems().add("tyzden " + ++i + ": "+data);
    }

    /**
     * loads students information into listview
     * @param controler
     * @param student
     */
    public void showStudentInformationGUI(TeacherEnvironmentController controler, Student student)
    {
        controler.studentListView.getItems().removeAll();
        controler.studentListView.getItems().add(student.finalExam);
        controler.studentListView.getItems().add(student.finalExamDate);
        controler.studentListView.getItems().add(student.exam);
        controler.studentListView.getItems().add(student.examDate);
        controler.studentListView.getItems().add(student.assignment);
        controler.studentListView.getItems().add(student.assignmentDeadline);
        controler.studentListView.getItems().add(student.mark);
        controler.studentListView.getItems().add(student.lectures[1]);
        controler.studentListView.getItems().add(student.scripts);
        controler.studentListView.getItems().add(student.scriptsReleaseDate);
    }

    /**
     * prints mark
     * @param controler
     */
    public void printMarkGUI(StudentEnvironmentController controler)
    {
        controler.mark.setText(this.mark);
    }

    /**
     * prints type of student
     * @param controler
     */
    public void printType(StudentEnvironmentController controler)
    {
    }

    /**
     * sets lectures into timetable
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     */
    public void setTimeTableLectures(String monday, String tuesday, String wednesday, String thursday)
    {
    }

    /**
     * sets trainnings into timetable
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     */
    public void setTimeTableTrainings(String monday, String tuesday, String wednesday, String thursday)
    {
    }

    /**
     * sets friday lectures
     * @param friday
     */
    public void setTimeTableLecturesFriday(String friday)
    {
    }

    /**
     * sets friday trainings
     * @param friday
     */
    public void setTimeTableTrainingFriday(String friday)
    {
    }

    /**
     * sets assignment
     * @param paAssignment
     */
    public void setAssignment(String paAssignment)
    {
        this.assignment=paAssignment;
    }

    /**
     * sets assignment deadline
     * @param paAssignemnt_deadline
     */
    public void setAssignmentDeadline(String paAssignemnt_deadline)
    {
        this.assignmentDeadline =paAssignemnt_deadline;
    }

    /**
     * sets attendance
     * @param week
     * @param yesOrNo
     */
    public void setAttendance(int week,int yesOrNo)
    {
        this.attendance[week] = yesOrNo;
    }

    /**
     * sets lectures material
     * @param lectures
     * @param number_of_lecture
     */
    public void receiveMaterials(String lectures, int number_of_lecture)
    {
        this.lectures[number_of_lecture]=lectures;
    }

    /**
     * sets scripts
     * @param scripts_name
     * @param scripts_release_date
     */
    public void receiveMaterials(String scripts_name, String scripts_release_date )
    {
        this.scripts=scripts_name;
        this.scriptsReleaseDate = scripts_release_date;
    }

    /**
     * sets exam information
     * @param exam_name
     * @param exam_date
     */
    public void receiveExamInformation(String exam_name, String exam_date)
    {
        this.exam=exam_name;
        this.examDate =exam_date;
    }

    /**
     * sets final exam information
     * @param finale_exam_name
     * @param final_exam_date
     */
    public void receiveFinalExamInformation(String finale_exam_name, String final_exam_date )
    {
        this.finalExam =finale_exam_name;
        this.finalExamDate =final_exam_date;
    }

    /**
     * gets attendance
     * @param student
     * @return
     */
    public int[] getAttendance(Student student)
    {
        return student.attendance;
    }

    /**
     * prints lectures
     * @param controler
     */
    public void printTimeTableLectures(TimeTableEnvironmentStudentController controler)
    {
        timeTable.printTimeTableLectures(controler);
    }

    /**
     * prints trainings
     * @param controler
     */
    public void printTimeTableTrainings(TimeTableEnvironmentStudentController controler)
    {
        timeTable.printTimeTableTrainings(controler);
    }

    /**
     * returns pasword
     * @return
     */
    public String getPassword()
    {
        return password;
    }

    /**
     * sets password
     * @param password
     */
    public void setPassword(String password)
    {
        this.password = password;
    }

    /**
     * returns name
     * @return
     */
    public String getUsername()
    {
        return username;
    }

    /**
     * nastavi meno
     * @param username
     */
    public void setUsername(String username)
    {
        this.username= username;
    }

    /**
     * sets mark
     * @param mark
     */
    public void setMark(String mark)
    {
        this.mark=mark;
    }

    /**
     * visitor design pattern
     * @param visitor
     * @return
     */
    @Override
    public Student accept(Visitor visitor)
    {
        return null;
    }

    /**
     * returns lecutres
     * @return
     */
    public ArrayList<String>  getTimetableLectures()
    {
        ArrayList<String> timetables = new ArrayList<String>();
        timetables.add(timeTable.lecturesMonday);
        timetables.add(timeTable.lecturesTuesday);
        timetables.add(timeTable.lecturesWednesday);
        timetables.add(timeTable.lecturesThursday);
        timetables.add(timeTable.lecturesFriday);
        return timetables;
    }

    /**
     * returns trainings
     * @return
     */
    public ArrayList<String>  getTimetableTrainings()
    {
        ArrayList<String> timetables = new ArrayList<String>();
        timetables.add(timeTable.trainingMonday);
        timetables.add(timeTable.trainingTuesday);
        timetables.add(timeTable.trainingWednesday);
        timetables.add(timeTable.trainingThursday);
        timetables.add(timeTable.trainingFriday);
        return timetables;
    }

}
