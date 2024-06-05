package Teachers;
import GUI.TeacherEnvironmentController;
import GUI.TimeTableEnvironmentTeacherController;
import Students.Student;
import java.io.Serializable;

/**
 * this class is lecturer
 */
public class Lecturer extends Teacher implements Interaction, Serializable
{

    protected int pay = 1000;

    /**
     * contrucotr of lecturer
     * @param username
     * @param password
     */
    public Lecturer(String username, String password) //konsturktor prednasajuceho
    {
        super(username, password);
        this.pay=super.pay+300;
    }

    /**
     * prints pay
     * @param controler
     */
    @Override
    public void printPayGUI(TeacherEnvironmentController controler)
    {
        controler.payLabel.setText("plat kazdeho prednasajuceho je: "+String.valueOf(this.pay));
    }

    /**
     * explains subject
     * @param controler
     */
    public void explainSubjectGUI(TeacherEnvironmentController controler)
    {
        controler.explainSubjectLabel.setText("Vysvetlil si prednasku ako spravny prednasajuci!");
    }

    /**
     * shouts
     * @param controler
     */
    @Override
    public void shoutGUI(TeacherEnvironmentController controler)
    {
        controler.shoutLabel.setText("Ticho na prednaske");
    }

    /**
     * sets timetable
     * @param controler
     * @param student
     */
    @Override
    public void setTimeTableGUI(TimeTableEnvironmentTeacherController controler, Student student)
    {
      student.setTimeTableLectures(controler.monday.getText(),controler.tuesday.getText(),controler.wednesday.getText(),controler.thurstday.getText());
    }

}
