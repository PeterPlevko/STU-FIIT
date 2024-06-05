package Teachers;
import GUI.TeacherEnvironmentController;
import GUI.TimeTableEnvironmentTeacherController;
import Students.Student;
import java.io.Serializable;
import Visitor.VisitorEvaluateStudent;

/**
 * this class is mainlecturer
 */
public class MainLecturer extends Lecturer implements Serializable
{
    private int pay = 1500;

    /**
     * contructor of mainlecturer
     * @param username
     * @param password
     */
    public MainLecturer(String username, String password) //konstruktor hlavneho prednasajuceho
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
        controler.payLabel.setText("plat kazdeho hlavneho prednasajuceho je: "+String.valueOf(this.pay));
    }

    /**
     * explains subjects
     * @param controler
     */
    @Override
    public void explainSubjectGUI(TeacherEnvironmentController controler)
    {
        controler.explainSubjectLabel.setText("vysvetlil si prednasku lepsie ako prednasajuci!");
    }

    /**
     * prints sentence
     * @param controler
     */
    @Override
    public void shoutGUI(TeacherEnvironmentController controler) {
        controler.shoutLabel.setText("Ticho time");
    }

    /**
     * evaluates student
     * @param student
     */
    public void evaluate(Student student)
    {
        VisitorEvaluateStudent evaluate_student_object = new VisitorEvaluateStudent();
        student.accept(evaluate_student_object);
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

}
