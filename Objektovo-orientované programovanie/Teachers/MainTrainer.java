package Teachers;
import GUI.TeacherEnvironmentController;
import GUI.TimeTableEnvironmentTeacherController;
import Students.Student;
import java.io.Serializable;

/**
 * this class is main trainer
 */
public class MainTrainer extends Trainer implements Serializable
{
    int pay=1500;

    /**
     * this is contructor trainer
     * @param username
     * @param password
     */
    public MainTrainer(String username, String password) //konstruktor hlavneho cvicaceho
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
        student.setTimeTableTrainingFriday(controler.friday.getText());
    }

    /**
     * prints pay
     * @param controler
     */
    @Override
    public void printPayGUI(TeacherEnvironmentController controler)
    {
        controler.payLabel.setText("plat kazdeho hlavneho cvicaceho je: "+String.valueOf(this.pay));
    }

    /**
     * explains subject
     * @param controler
     */
    @Override
    public void explainSubjectGUI(TeacherEnvironmentController controler)
    {
        controler.explainSubjectLabel.setText("vysvetlil si latku lepsie ako cviciaci");
    }

    /**
     * shouts
     * @param controler
     */
    @Override
    public void shoutGUI(TeacherEnvironmentController controler)
    {
        controler.shoutLabel.setText("vidim ze si zhovorcivy pod to ucit namiesto mna ");
    }

}
