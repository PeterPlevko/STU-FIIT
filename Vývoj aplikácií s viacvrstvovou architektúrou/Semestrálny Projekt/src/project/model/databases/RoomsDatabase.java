package project.model.databases;

import javafx.scene.image.Image;
import project.model.CustomImage;
import project.model.rooms.LibraryRoom;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class RoomsDatabase {
    private List<LibraryRoom> rooms;

    public RoomsDatabase() throws IOException, ClassNotFoundException {
//        loadDemo();
        deserialize();
    }

    public List<LibraryRoom> getRooms() {
        List<LibraryRoom> returnList = new ArrayList<>();
        for(LibraryRoom room: rooms){
            returnList.add((LibraryRoom) room.clone());
        }
        return returnList;
    }

    public void setRooms(List<LibraryRoom> rooms) {
        List<LibraryRoom> list = new ArrayList<>();
        for(LibraryRoom room: rooms){
            list.add((LibraryRoom) room.clone());
        }
        this.rooms = list;
    }

    public void addRoom(LibraryRoom room){
        rooms.add(room);
    }

    public void removeRoom(LibraryRoom room){
        rooms.removeIf(temp -> temp.getId() == room.getId());
    }

    private void loadDemo(){
        rooms = new ArrayList<>();
        LibraryRoom room = new LibraryRoom(0, "Miestnost 1", 10);
        room.addImage(new CustomImage(new Image("project/images/rooms/room1_1.jpg")));
        room.addImage(new CustomImage(new Image("project/images/rooms/room1_2.jpg")));
        rooms.add(room);

        room = new LibraryRoom(1, "Miestnost 2", 100);
        room.addImage(new CustomImage(new Image("project/images/rooms/room2_1.jpg")));
        room.addImage(new CustomImage(new Image("project/images/rooms/room2_2.jpg")));
        rooms.add(room);

        room = new LibraryRoom(2, "Miestnost 3", 30);
        room.addImage(new CustomImage(new Image("project/images/rooms/room3_1.jpg")));
        room.addImage(new CustomImage(new Image("project/images/rooms/room3_2.jpg")));
        rooms.add(room);

        room = new LibraryRoom(3, "Miestnost 4", 25);
        room.addImage(new CustomImage(new Image("project/images/rooms/room4_1.jpg")));
        room.addImage(new CustomImage(new Image("project/images/rooms/room4_2.jpg")));
        rooms.add(room);

        room = new LibraryRoom(4, "Miestnost 5", 15);
        room.addImage(new CustomImage(new Image("project/images/rooms/room5_1.jpg")));
        room.addImage(new CustomImage(new Image("project/images/rooms/room5_2.jpg")));
        rooms.add(room);
    }

    public void serialize() throws IOException {
        File database = new File("src/project/model/databases/Rooms.txt");
        FileOutputStream fos = new FileOutputStream(database);
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(rooms);
        oos.close();
        fos.close();
    }

    public void deserialize() throws IOException, ClassNotFoundException {
        File database = new File("src/project/model/databases/Rooms.txt");
        FileInputStream fis = new FileInputStream(database);
        ObjectInputStream ois = new ObjectInputStream(fis);
        rooms = (List<LibraryRoom>) ois.readObject();
        ois.close();
        fis.close();
    }
}
