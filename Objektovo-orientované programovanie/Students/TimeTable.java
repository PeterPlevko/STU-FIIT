package Students;
import GUI.TimeTableEnvironmentStudentController;
import java.io.Serializable;

/**
 * this class is students timetable
 */
public class TimeTable implements Serializable
{
    public String lecturesMonday;
    public String lecturesTuesday;
    public String lecturesWednesday;
    public String lecturesThursday;
    public String lecturesFriday;
    public String trainingMonday;
    public String trainingTuesday;
    public String trainingWednesday;
    public String trainingThursday;
    public String trainingFriday;

    /**
     * sets lecutres
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     */
    public void setLectures(String monday, String tuesday, String wednesday, String thursday)
    {
        this.lecturesMonday=monday;
        this.lecturesTuesday=tuesday;
        this.lecturesWednesday=wednesday;
        this.lecturesThursday=thursday;
    }

    /**
     * sets trainnigs
     * @param monday
     * @param tuesday
     * @param wednesday
     * @param thursday
     */
    public void setTraining(String monday, String tuesday, String wednesday, String thursday)
    {
        this.trainingMonday=monday;
        this.trainingTuesday=tuesday;
        this.trainingWednesday=wednesday;
        this.trainingThursday=thursday;
    }

    /**
     * sets friday lecture
     * @param friday
     */
    public void setLectures(String friday)
    {
        this.lecturesFriday=friday;
    }

    /**
     * sets friday training
     * @param friday
     */
    public void setTraining(String friday)
    {
        this.trainingFriday=friday;
    }

    /**
     * prints trainings
     * @param controler
     */
    public void printTimeTableTrainings(TimeTableEnvironmentStudentController controler)
    {
        controler.monday.setText(this.trainingMonday);
        controler.tuesday.setText(this.trainingTuesday);
        controler.wednesday.setText(this.trainingWednesday);
        controler.thurstday.setText(this.trainingThursday);
        controler.friday.setText(this.trainingFriday);
    }

    /**
     * prints lectures
     * @param controler
     */
    public void printTimeTableLectures(TimeTableEnvironmentStudentController controler)
    {
        controler.monday.setText(this.lecturesMonday);
        controler.tuesday.setText(this.lecturesTuesday);
        controler.wednesday.setText(this.lecturesWednesday);
        controler.thurstday.setText(this.lecturesThursday);
        controler.friday.setText(this.lecturesFriday);
    }

}
