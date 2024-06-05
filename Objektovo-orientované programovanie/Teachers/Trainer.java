package Teachers;
import GUI.TeacherEnvironmentController;
import GUI.TimeTableEnvironmentTeacherController;
import Students.Student;
import java.io.Serializable;

/**
 * this class is trainer
 */
public class Trainer extends Teacher implements Interaction, Serializable
{
    int pay = 1000;

    /**
     * contructor of trainer
     * @param username
     * @param password
     */
    public Trainer(String username, String password) //konstruktor cviciaceho
    {
        super(username, password);
        this.pay=super.pay+250;
    }

    /**
     * sets timetable
     * @param controler
     * @param student
     */
    @Override
    public void setTimeTableGUI(TimeTableEnvironmentTeacherController controler, Student student)
    {
        student.setTimeTableTrainings(controler.monday.getText(),controler.tuesday.getText(),controler.wednesday.getText(),controler.thurstday.getText());
    }
    /**
     * prints pay
     * @param controler
     */
    @Override
    public void printPayGUI(TeacherEnvironmentController controler)
    {
        controler.payLabel.setText("plat kazdeho cvicaceho je: "+String.valueOf(this.pay));
    }

    /**
     * prints sentence
     * @param controler
     */
    @Override
    public void explainSubjectGUI(TeacherEnvironmentController controler)
    {
        controler.explainSubjectLabel.setText("vidim ze si zhovorcivy pod to ucit namiesto mna ");
    }

    /**
     * prints sentence
     * @param controler
     */
    @Override
    public void shoutGUI(TeacherEnvironmentController controler)
    {
        controler.shoutLabel.setText("ak vas nebavi cvicit rozum tak budeme cvicit telo staci povedat");
    }

}
