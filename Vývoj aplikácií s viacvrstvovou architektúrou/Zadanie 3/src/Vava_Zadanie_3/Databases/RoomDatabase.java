package Vava_Zadanie_3.Databases;

import Vava_Zadanie_3.Platba.Platba;
import Vava_Zadanie_3.Room.Room;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class RoomDatabase {


    public static List<Room> RoomList = new ArrayList<Room>();


    public static void addToRoomList(Room room){
        RoomList.add(room);
    }


    public static Room getRoomByNumber(int roomNumber){
        Room room = null;
        for(Room i : RoomList) {
            if (i.getRoomNumber() == roomNumber){
                room = i;
            }
        }
        return room;
    }

    public static void load() //deserializacia
    {
        try
        {
            FileInputStream file = new FileInputStream("src/Vava_Zadanie_3/Databases/Room.txt");
            ObjectInputStream in = new ObjectInputStream(file);
            RoomList = (ArrayList<Room>) in.readObject();
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


    public static void save() //serializacia
    {
        try
        {
            FileOutputStream file = new FileOutputStream("src/Vava_Zadanie_3/Databases/Room.txt");
            ObjectOutputStream out = new ObjectOutputStream(file);
            out.writeObject(RoomList);
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
