package Data;
import Teachers.Teacher;
import Teachers.Trainer;
import Teachers.MainTrainer;
import Teachers.Lecturer;
import Teachers.MainLecturer;
import java.io.*;
import java.util.ArrayList;

/**
 * this class is used for serialization and deserialization of teachers nad also for their registration
 */
public class TeacherDatabase extends Exception
{
    public static ArrayList<Teacher> teacherList = new ArrayList<>();

    /**
     * registers teacher
     * @param username
     * @param password
     * @param type is used for identifing teacher type
     */
    public static void registration(String username, String password, int type)
    {
        switch(type)
        {
            case 1:
                teacherList.add(new Lecturer(username,password));
                break;
            case 2:
                teacherList.add(new MainLecturer(username,password));
                break;
            case 3:
                teacherList.add(new Trainer(username,password));
                break;
            case 4:
                teacherList.add(new MainTrainer(username,password));
                break;
        }
    }

    /**
     * loads teacher databse from file
     */
    public static void load() //deserializacia
    {
        try
        {
            FileInputStream file = new FileInputStream("src/Data/teachers.txt");
            ObjectInputStream in = new ObjectInputStream(file);
            teacherList = (ArrayList<Teacher>) in.readObject();
            in.close();
            file.close();
        }
        catch (FileNotFoundException e)
        {
            e.printStackTrace();
        } catch (IOException e)
        {
            e.printStackTrace();
        } catch (ClassNotFoundException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * saves teacher database into txt file
     */
    public static void save() //serializacia
    {
        try
        {
            FileOutputStream file = new FileOutputStream("src/Data/teachers.txt");
            ObjectOutputStream out = new ObjectOutputStream(file);
            out.writeObject(teacherList);
            out.close();
            file.close();
        } catch (FileNotFoundException e)
        {
            e.printStackTrace();
        } catch (IOException e)
        {
            e.printStackTrace();
        }
    }

}
