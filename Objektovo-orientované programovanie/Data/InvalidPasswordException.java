package Data;

/**
 * this is exception class
 */
public class InvalidPasswordException extends Exception
{
    /**
     * prints error
     */
    public InvalidPasswordException()
    {
       GUIInvalidPasswordException.PrintErrorMessage();
    }

    /**
     *contructor of eror
     * @param message
     */
    public InvalidPasswordException(String message)
    {
        super(message);
    }

}
