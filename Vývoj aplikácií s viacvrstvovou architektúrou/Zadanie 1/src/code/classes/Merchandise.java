package Messie.classes;

import javafx.beans.property.SimpleStringProperty;

public class Merchandise {
    private SimpleStringProperty name;
    private SimpleStringProperty price;
    private SimpleStringProperty about;
    private int quantity;


    public Merchandise(String name, String about, String price){
        this.name = new SimpleStringProperty(name);
        this.about = new SimpleStringProperty(about);
        this.price = new SimpleStringProperty(price);
        this.quantity = 0;
    }

    public String getName() {
        return name.get();
    }

    public SimpleStringProperty nameProperty() {
        return name;
    }

    public SimpleStringProperty priceProperty() {
        return price;
    }

    public SimpleStringProperty aboutProperty() {
        return about;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
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

    public String getAbout() {
        return about.get();
    }



    public void setAbout(String about) {
        this.about.set(about);
    }
}
