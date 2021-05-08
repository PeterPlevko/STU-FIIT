package Messie.classes;

import javafx.beans.property.SimpleStringProperty;

public class AddItems {
    private SimpleStringProperty name, price, number;

    public AddItems(String name, String price, String number){
        this.name = new SimpleStringProperty(name);
        this.price = new SimpleStringProperty(price);
        this.number = new SimpleStringProperty(number);
    }


    public String getName() {
        return name.get();
    }



    public void setName(String name) {
        this.name.set(name);
    }

    public String getPrice() {
        return price.get();
    }



    public void setPrice(String price) {
        this.price.set(price);
    }

    public String getNumber() {
        return number.get();
    }



    public void setNumber(String number) {
        this.number.set(number);
    }
}

