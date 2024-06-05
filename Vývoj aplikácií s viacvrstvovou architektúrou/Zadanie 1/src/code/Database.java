package Messie;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import Messie.classes.AddItems;
import Messie.classes.Bill;
import Messie.classes.Customer;
import Messie.classes.Merchandise;

import java.util.ArrayList;
import java.util.List;

public class Database {

    public static List<String> customersList = new ArrayList<String>();
    public static List<String> merchandiseList = new ArrayList<String>();

    public static List<Bill> billList = new ArrayList<Bill>();

    public static ObservableList<String> nameInList = FXCollections.observableArrayList();

    public static ObservableList<Customer> observableBillList = FXCollections.observableArrayList();
    public static ObservableList<Customer> customers = FXCollections.observableArrayList();
    public static ObservableList<Merchandise> merchandises = FXCollections.observableArrayList();
    public static ObservableList<AddItems> AddItemsList = FXCollections.observableArrayList();



    public static void turnToStringListCustomers(){
        for (Customer i : Database.customers){
            customersList.add(i.getNameSurname());
        }
    }

    public static void turnToStringListMerchandise(){
        for (Merchandise i : Database.merchandises){
            merchandiseList.add(i.getName());
        }
    }

    public static void fillAddItemsList(ArrayList<String> merchandiseName, ArrayList<String> numberOfMerchandise){
        String priceOfGivenMerchandise = "0";
        for (int i = 0; i < merchandiseName.size(); i++) {

            for (int j = 0; j < Database.merchandises.size(); j++){
                if (merchandiseName.get(i).equals(Database.merchandises.get(j).getName())){
                    priceOfGivenMerchandise = Database.merchandises.get(j).getPrice();
                }
            }


            AddItemsList.add(new AddItems(merchandiseName.get(i), numberOfMerchandise.get(i), priceOfGivenMerchandise));

        }
    }

    public static Customer getCustomerByName(String name) {
        for (int i = 0; i < Database.customers.size(); i++) {
            if (Database.customers.get(i).getNameSurname().equals(name)) {
                return Database.customers.get(i);
            }

        }
        return null;
    }


    }



