package Students;
import GUI.StudentEnvironmentController;
import GUI.TimeTableEnvironmentStudentController;
import Visitor.Visitor;
import java.io.Serializable;

/**
 * this class is daily student
 */
public class StudentDaily extends Student implements Serializable
{
    /**
     * contructor of daily student
     * @param username
     * @param password
     */
    public StudentDaily(String username, String password)
    {
        super(username, password);
    }

    /**
     * prints student type
     * @param controler
     */
    @Override
    public void printType(StudentEnvironmentController controler)
    {
        controler.whatTypeAmILabel.setText("Si denny student");
    }

    /**
     * sets lecture
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     */
    @Override
    public void setTimeTableLectures(String monday, String tuesday, String wednesday, String thursday)
    {
        timeTable.setLectures( monday,  tuesday,  wednesday,  thursday);
    }

    /**
     * sets lecture friday
     * @param friday
     */
    @Override
    public void setTimeTableLecturesFriday(String friday)
    {
        timeTable.setLectures(friday);
    }

    /**
     * sets trainnings
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     */
    @Override
    public void setTimeTableTrainings(String monday, String tuesday, String wednesday, String thursday)
    {
        timeTable.setTraining( monday,  tuesday,  wednesday,  thursday);
    }

    /**
     * sets training friday
     * @param friday
     */
    @Override
    public void setTimeTableTrainingFriday(String friday)
    {
        timeTable.setTraining(friday);
    }

    /**
     * prints lecture
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
     * visitor
     * @param visitor
     * @return
     */
    @Override
    public Student accept(Visitor visitor)
    {
    return visitor.visit(this);
    }

}
