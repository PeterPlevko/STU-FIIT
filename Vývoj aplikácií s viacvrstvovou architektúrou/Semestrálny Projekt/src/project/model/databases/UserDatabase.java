package project.model.databases;

import project.controller.Main;
import project.model.rooms.RoomReservation;
import project.model.books.BookReservation;
import project.model.events.BookDiscussion;
import project.model.events.BookExchange;
import project.model.events.Event;
import project.model.users.Librarian;
import project.model.users.Organizer;
import project.model.users.Reader;
import project.model.users.User;
import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class UserDatabase {
    private List<User> users;

    public UserDatabase() throws IOException, ClassNotFoundException {
//        loadDemo();
        deserialize();
    }

    public static User login(String name, String password){
        for( User i: Main.userDatabase.getUsers()){
            if((i.getUserName().equals(name)) && (i.getPassword().equals(password))){
                Main.currUser = i;
                return i;
            }
        }
        return null;
    }

    public static void registration(String username, String password, String type) {
        switch(type) {
            case "Knihovník":
                Librarian librarian = new Librarian(username,password);
                Main.userDatabase.addUser(librarian);
                break;
            case "Organizátor":
                Organizer organizer = new Organizer(username,password);
                Main.userDatabase.addUser(organizer);
                break;
            case "Čitateľ":
                Reader reader = new Reader(username,password);
                Main.userDatabase.addUser(reader);
                break;
        }
    }

    public static boolean checkIfExists(String username){
        for(User i: Main.userDatabase.getUsers()){
            if(i.getUserName().equals(username)){
                return true;
            }
        }
        return false;
    }

    public List<User> getUsers() {
        List<User> returnList = new ArrayList<>();
        for(User user: users){
            if(user instanceof Reader){
                returnList.add((Reader) user.clone());
            }
            else if(user instanceof Librarian){
                returnList.add((Librarian) user.clone());
            }
            else if(user instanceof Organizer){
                returnList.add((Organizer) user.clone());
            }
        }
        return returnList;
    }

    public void setUsers(List<User> users) {
        List<User> list = new ArrayList<>();
        for(User user: users){
            if(user instanceof Reader){
                list.add((Reader) user.clone());
            }
            else if(user instanceof Librarian){
                list.add((Librarian) user.clone());
            }
            else if(user instanceof Organizer){
                list.add((Organizer) user.clone());
            }
        }
        this.users = list;
    }

    public void removeUser(User user){
        users.removeIf(temp -> user.getUserName().equals(temp.getUserName()));
    }

    public void addUser(Librarian librarian){
        this.users.add(librarian);
    }

    public void addUser(Organizer organizer){
        this.users.add(organizer);
    }

    public void addUser(Reader reader){
        this.users.add(reader);
    }

    private void loadDemo(){
        users = new ArrayList<>();
        List<BookReservation> reservations = new ArrayList<>();
        reservations.add(new BookReservation(0, LocalDate.parse("2021-04-20"), LocalDate.parse("2021-04-28")));
        reservations.add(new BookReservation(1, LocalDate.parse("2021-04-15"), LocalDate.parse("2021-04-26")));
        reservations.add(new BookReservation(2, LocalDate.parse("2021-04-14"), LocalDate.parse("2021-05-16")));
        reservations.add(new BookReservation(3, LocalDate.parse("2021-04-16"), LocalDate.parse("2021-04-30")));

        Reader reader = new Reader("peto", "reader");
        reader.setReservations(reservations);
        users.add(reader);

        reservations = new ArrayList<>();
        reservations.add(new BookReservation(5, LocalDate.parse("2021-04-21"), LocalDate.parse("2021-04-27")));
        reservations.add(new BookReservation(12, LocalDate.parse("2021-04-15"), LocalDate.parse("2021-04-28")));
        reservations.add(new BookReservation(10, LocalDate.parse("2021-04-10"), LocalDate.parse("2021-04-29")));
        reservations.add(new BookReservation(9, LocalDate.parse("2021-04-17"), LocalDate.parse("2021-04-30")));

        reader = new Reader("mato", "reader");
        reader.setReservations(reservations);
        users.add(reader);

        users.add(new Librarian("deli", "librarian"));

        Organizer organizer = new Organizer("pazo", "organizer");
        List<Event> events = new ArrayList<>();
        events.add(new BookDiscussion("Diskusia o knihe Sapiens", "veľmi zaujímavá diskusia", new RoomReservation(LocalDate.parse("2021-04-20"), LocalDate.parse("2021-04-21"), 0), organizer, "Yuval Harari"));
        events.add(new BookDiscussion("Diskusia o knihe Homo Deus", "veľmi pestrá diskusia", new RoomReservation(LocalDate.parse("2021-04-28"), LocalDate.parse("2021-04-30"), 1), organizer, "Yuval Harari"));
        events.add(new BookExchange("Májová výmena kníh", "Témou Májová výmeny kníh sú romány minulého storočia", new RoomReservation(LocalDate.parse("2021-05-23"), LocalDate.parse("2021-05-30"), 4), organizer));

        organizer.setEvents(events);
        users.add(organizer);

        organizer = new Organizer("roman", "organizer");
        events = new ArrayList<>();
        events.add(new BookDiscussion("Diskusia o knihe Life 3.0", "veľmi intelektuálna diskusia", new RoomReservation(LocalDate.parse("2021-04-24"), LocalDate.parse("2021-04-29"), 2), organizer, "Max Tegmark"));
        events.add(new BookExchange("Aprílová výmena kníh", "Témou Aprílovej výmeny kníh sú detektívky", new RoomReservation(LocalDate.parse("2021-04-23"), LocalDate.parse("2021-04-30"), 3), organizer));
        organizer.setEvents(events);
        users.add(organizer);
    }

    public void serialize() throws IOException {
        File database = new File("src/project/model/databases/Users.txt");
        FileOutputStream fos = new FileOutputStream(database);
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(users);
        oos.close();
        fos.close();
    }

    public void deserialize() throws IOException, ClassNotFoundException {
        File database = new File("src/project/model/databases/Users.txt");
        FileInputStream fis = new FileInputStream(database);
        ObjectInputStream ois = new ObjectInputStream(fis);
        users = (List<User>) ois.readObject();
        ois.close();
        fis.close();
    }
}
