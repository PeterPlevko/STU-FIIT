package Vava_Zadanie_3.Customer;

import java.io.Serializable;

public class Customer implements Serializable {
    private String name;


    public Customer(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }






}
