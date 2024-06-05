package Students;
import GUI.StudentEnvironmentController;
import Visitor.Visitor;
import java.io.Serializable;

/**
 * this class is extern student
 */
public class StudentExtern extends Student implements Serializable
{
    /**
     * contructor of extern student
     * @param username
     * @param password
     */
    public StudentExtern(String username, String password)
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
        controler.whatTypeAmILabel.setText("Si externy student");
    }

    /**
     * sets lecutre
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
     * sets lecture on friday
     * @param friday
     */
    @Override
    public void setTimeTableLecturesFriday(String friday)
    {
        setTimeTableLecturesFriday(friday);
    }

    /**
     * sets trainings
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     */
    @Override
    public void setTimeTableTrainings(String monday, String tuesday, String wednesday, String thursday)
    {
        timeTable.setTraining(monday, tuesday, wednesday, thursday);
    }

    /**
     * sets traingnigs friday
     * @param friday
     */
    @Override
    public void setTimeTableTrainingFriday(String friday)
    {
        timeTable.setTraining(friday);
    }

    /**
     * visitor design pattern
     * @param visitor
     * @return
     */
    @Override
    public Student accept(Visitor visitor) {
        return visitor.visit(this);
    }

}
