package Vava_Zadanie_3.Databases;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Room.Room;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class CustomerDatabase {

    public static List<Customer> CustomerList = new ArrayList<Customer>();


    public static void addToCustomerList(Customer customer){
        CustomerList.add(customer);
    }

    public static Customer getCustomerByName(String name){
        Customer customer = null;
        for(Customer i : CustomerList) {
            if (i.getName().equals(name)){
                customer = i;
            }
        }
        return customer;
    }


    public static List<String> getNameList(){
        List<String> names = new ArrayList<>();
        for(Customer i : CustomerList) {
          names.add(i.getName());
        }
        return names;
    }
/**
 * sem nacitavam zo suboru
 */


public static void load() //deserializacia
{
    try
    {
        FileInputStream file = new FileInputStream("src/Vava_Zadanie_3/Databases/Customer.txt");
        ObjectInputStream in = new ObjectInputStream(file);
        CustomerList = (ArrayList<Customer>) in.readObject();
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
            FileOutputStream file = new FileOutputStream("src/Vava_Zadanie_3/Databases/Customer.txt");
            ObjectOutputStream out = new ObjectOutputStream(file);
            out.writeObject(CustomerList);
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
