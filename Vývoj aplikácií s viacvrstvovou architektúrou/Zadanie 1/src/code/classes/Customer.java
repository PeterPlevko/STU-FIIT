package Messie.classes;

import javafx.beans.property.SimpleStringProperty;

public class Customer {
    private SimpleStringProperty nameSurname, address, city, postalCode;


    public Customer(String firstName, String address, String city, String postalCode){
        this.nameSurname = new SimpleStringProperty(firstName);
        this.address = new SimpleStringProperty(address);
        this.city = new SimpleStringProperty(city);
        this.postalCode = new SimpleStringProperty(postalCode);
    }

    public String getNameSurname() {
        return nameSurname.get();
    }


    public void setNameSurname(String nameSurname) {
        this.nameSurname = new SimpleStringProperty(nameSurname);
    }

    public String getAddress() {
        return address.get();
    }


    public void setAddress(String address) {
        this.address = new SimpleStringProperty(address);
    }

    public String getCity() {
        return city.get();
    }

    public void setCity(String city) {
        this.city = new SimpleStringProperty(city);
    }

    public String getPostalCode() {
        return postalCode.get();
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = new SimpleStringProperty(postalCode);
    }


}
