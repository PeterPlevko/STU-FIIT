package Vava_Zadanie_3.Databases;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Platba.Platba;
import Vava_Zadanie_3.Room.Room;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class PlatbaDatabase  {




    public static List<Platba> PlatbaList = new ArrayList<Platba>();


    public static void addToPlatbaList(Platba platba){
        PlatbaList.add(platba);
    }


//    public static Room getPlatbaByNumber(int roomNumber){
//        Room room = null;
//        for(Room i : RoomList) {
//            if (i.getRoomNumber() == roomNumber){
//                room = i;
//            }
//        }
//        return room;
//    }


    public static void load() //deserializacia
    {
        try
        {
            FileInputStream file = new FileInputStream("src/Vava_Zadanie_3/Databases/Platba.txt");
            ObjectInputStream in = new ObjectInputStream(file);
            PlatbaList = (ArrayList<Platba>) in.readObject();
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
            FileOutputStream file = new FileOutputStream("src/Vava_Zadanie_3/Databases/Platba.txt");
            ObjectOutputStream out = new ObjectOutputStream(file);
            out.writeObject(PlatbaList);
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
