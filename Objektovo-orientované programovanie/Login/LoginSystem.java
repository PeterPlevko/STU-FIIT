package Login;
import Data.StudentDatabase;
import Data.TeacherDatabase;
import Students.Student;
import Teachers.Teacher;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * this class is used for logging teacher, student into program and for finding teacher,student by name
 */
public class LoginSystem {
    /**
     * this method takse username and password and returns student which atributes match those
     * @param username
     * @param password
     * @return
     */
    public static Student loginStudent(String username, String password)
    {
        Predicate<Student> login_predicate = student ->
        {
            return student.getUsername().equals(username) && student.getPassword().equals(password);
        };
        try
        {
            return StudentDatabase.studentList.stream().filter(login_predicate).collect(Collectors.toList()).get(0);
        }
        catch (IndexOutOfBoundsException e)
        {

            return null;
        }
    }

    /**
     * this method takes username and password and return teacher which atributes match those
     * @param username
     * @param password
     * @return
     */
    public static Teacher loginTeacher(String username, String password)
    {
        Predicate<Teacher> login_predicate = teacher ->
        {
            return teacher.getPassword().equals(password) && teacher.getUsername().equals(username);
        };
        try
        {
            return TeacherDatabase.teacherList.stream().filter(login_predicate).collect(Collectors.toList()).get(0);
        }
        catch (IndexOutOfBoundsException e)
        {

            return null;}
    }

    /**
     * reutrn student by name
     * @param username
     * @return
     */
    public static Student findStudent(String username)
    {
        Predicate<Student> login_predicate = student ->
        {
            return student.getUsername().equals(username);
        };
        try
        {
            return StudentDatabase.studentList.stream().filter(login_predicate).collect(Collectors.toList()).get(0);
        }
        catch (IndexOutOfBoundsException e)
        {

            return null;}
    }

    /**
     * returns teacher by name
     * @param username
     * @return
     */
    public static Teacher findTeacher(String username)
    {
        Predicate<Teacher> login_predicate = teacher ->
        {
            return teacher.getUsername().equals(username);
        };
        try
        {
            return TeacherDatabase.teacherList.stream().filter(login_predicate).collect(Collectors.toList()).get(0);
        }
        catch (IndexOutOfBoundsException e)
        {

            return null;}
    }

}
