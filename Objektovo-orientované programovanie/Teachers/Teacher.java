package Teachers;
import GUI.TeacherEnvironmentController;
import GUI.TimeTableEnvironmentTeacherController;
import Students.Student;
import java.io.Serializable;

/**
 * this class is teacher
 */
public class Teacher implements Serializable {
    protected int pay = 0;
    private String password, username, messageFromStudent;
    private int hasMessage=0;

    /**
     * contructor of teacher
     * @param username
     * @param password
     */
    public Teacher(String username, String password) //konstruktor ucitela
    {
        this.username = username;
        this.password = password;
        this.pay = 500;
    }
    /**
     * sets timetable
     * @param controler
     * @param student
     */
    public void setTimeTableGUI(TimeTableEnvironmentTeacherController controler, Student student)
    {
    }
    /**
     * prints pay
     * @param controler
     */
    public void printPayGUI(TeacherEnvironmentController controler)
    {
    }

    /**
     * prints sentence
     * @param controler
     */
    public void explainSubjectGUI(TeacherEnvironmentController controler)
    {
    }

    /**
     * prints shout
     * @param controler
     */
    public void shoutGUI(TeacherEnvironmentController controler)
    {
    }

    /**
     * sets message from student
     * @param controler
     */
    public void messageGUI(TeacherEnvironmentController controler)
    {
        controler.messageLabel.setText(this.messageFromStudent);
    }

    /**
     * sets message from student
     * @param message
     */
    public void getMessage(String message)
    {
        this.messageFromStudent = message;
    }

    /**
     * uploads materials
     * @param student
     */
    public void uploadStudyMaterials(Student student)
    {
    }

    /**
     * evaluates student
     * @param student
     */
    public void evaluate(Student student)
    {
    }

    /**
     * sends assignment
     * @param student
     */
    public void sendAssignment(Student student)
    {
    }

    /**
     * sets timetable
     * @param student
     */
    public void sendAttendance(Student student)
    {
    }

    /**
     * sets exam
     * @param student
     */
    public void setExam(Student student)
    {
    }

    /**
     *
     * @param student
     */
    public void changeAssigmentDateOnly(Student student)
    {
    }

    /**
     * return password
     * @return
     */
    public String getPassword()
    {
        return password;
    }

    /**
     * return username
     * @return
     */
    public String getUsername()
    {
        return username;
    }

    /**
     * sets has message
     */
    public void setHasMessage()
    {
        hasMessage = 1;
    }

    /**
     * return if has massege
     * @return
     */
    public int getHasMessage()
    {
        return hasMessage;
    }



}
