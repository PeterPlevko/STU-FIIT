package Vava_Zadanie_3.Databases;

import Vava_Zadanie_3.Reservation.Reservation;
import Vava_Zadanie_3.Room.Room;

import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ReservationDatabase {




    public static List<Reservation> ReservationList = new ArrayList<Reservation>();


    public static void addToReservationList(Reservation reservation){
        ReservationList.add(reservation);
    }


    public static void removeFromDatabase(Reservation reservation){
        ReservationList.remove(reservation);
    }


    public static boolean checkIfDatesOverlap(LocalDate startB, LocalDate endB)
    {
        //(StartA <= EndB) and (EndA >= StartB)
        boolean flag = true;
    for(Reservation i : ReservationList) {
        if ((i.getReservationFrom().isBefore(endB)) && (startB.isBefore(i.getReservationTo()))){
            flag = false;
        }
    }
        return flag;
    }

    public static Reservation getReservationByCustomerName(String meno){
        Reservation reservation = null;
        for(Reservation i : ReservationList) {
            if (i.getCustomer().getName().equals(meno)){
                reservation = i;
            }

        }
        return  reservation;
    }


    public static void load() //deserializacia
    {
        try
        {
            FileInputStream file = new FileInputStream("src/Vava_Zadanie_3/Databases/Reservation.txt");
            ObjectInputStream in = new ObjectInputStream(file);
            ReservationList = (ArrayList<Reservation>) in.readObject();
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
            FileOutputStream file = new FileOutputStream("src/Vava_Zadanie_3/Databases/Reservation.txt");
            ObjectOutputStream out = new ObjectOutputStream(file);
            out.writeObject(ReservationList);
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
