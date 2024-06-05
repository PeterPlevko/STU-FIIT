package Vava_Zadanie_3.Databases;

import Vava_Zadanie_3.Reservation.Reservation;
import Vava_Zadanie_3.Room.Room;
import Vava_Zadanie_3.Ubytovanie.Ubytovanie;

import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class UbytovanieDatabase {




    public static List<Ubytovanie> UbytovanieList = new ArrayList<Ubytovanie>();


    public static void addToUbytovanieList(Ubytovanie ubytovanie){
        UbytovanieList.add(ubytovanie);
    }


    public static void removeFromDatabase(Reservation reservation){
        UbytovanieList.remove(reservation);
    }


    public static boolean checkIfDatesOverlap(LocalDate startB, LocalDate endB)
    {
        //(StartA <= EndB) and (EndA >= StartB)
        boolean flag = true;
        for(Ubytovanie i : UbytovanieList) {
            if ((i.getReservationFrom().isBefore(endB)) && (startB.isBefore(i.getReservationTo()))){
                flag = false;
            }
        }
        return flag;
    }

    public static Ubytovanie getUbytovanieByCustomerName(String meno){
        Ubytovanie ubytovanie = null;
        for(Ubytovanie i : UbytovanieList) {
            if (i.getCustomer().getName().equals(meno)){
                ubytovanie = i;
            }

        }
        return  ubytovanie;
    }

    public static void load() //deserializacia
    {
        try
        {
            FileInputStream file = new FileInputStream("src/Vava_Zadanie_3/Databases/Ubytovanie.txt");
            ObjectInputStream in = new ObjectInputStream(file);
            UbytovanieList = (ArrayList<Ubytovanie>) in.readObject();
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
            FileOutputStream file = new FileOutputStream("src/Vava_Zadanie_3/Databases/Ubytovanie.txt");
            ObjectOutputStream out = new ObjectOutputStream(file);
            out.writeObject(UbytovanieList);
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
