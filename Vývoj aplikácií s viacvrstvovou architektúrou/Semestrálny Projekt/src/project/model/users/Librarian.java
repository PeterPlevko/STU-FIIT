package project.model.users;

public class Librarian extends User{

    public Librarian(String userName, String password) {
        super(userName, password);
    }

    public Object clone(){
        return new Librarian(this.getUserName(), this.getPassword());
    }
}
