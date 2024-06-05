package Data;
import Students.Student;
import Students.StudentDaily;
import Students.StudentExtern;
import java.io.*;
import java.util.ArrayList;

/**
 * this method is used for serialization and deserialization of students and also for their registration
 */
public class StudentDatabase extends Exception
{
    public static ArrayList <Student> studentList = new ArrayList<>();

    /**
     * int this method i add student with given name and passwordd into studentdatabase
     * @param username
     * @param password
     * @param type this tells me what type of student he is
     */
   public static void registration(String username, String password, int type)
   {
       switch(type)
       {
           case 1:
               studentList.add(new StudentDaily(username,password));
               break;
           case 2:
               studentList.add(new StudentExtern(username,password));
               break;
       }
   }

    /**
     * loads students into database
     */
    public static void load() //deserializacia
    {
      try
      {
          FileInputStream file = new FileInputStream("src/Data/students.txt");
          ObjectInputStream in = new ObjectInputStream(file);
          studentList = (ArrayList<Student>) in.readObject();
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
     * saves students databse
     */
    public static void save() //serializacia
    {
     try
     {
         FileOutputStream file = new FileOutputStream("src/Data/students.txt");
         ObjectOutputStream out = new ObjectOutputStream(file);
         out.writeObject(studentList);
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
