package Messie.classes;

import java.time.LocalDate;
import java.util.ArrayList;

public class Bill {

    Customer customer;
    LocalDate localdate;
    ArrayList<AddItems> additems = new ArrayList<AddItems>();

//    ArrayList<String> merchandiseName = new ArrayList<String>();
//    ArrayList<String> merchandiseAbout = new ArrayList<String>();
//    ArrayList<String> numberOfMerchandise = new ArrayList<String>();
//    ArrayList<String> priceOfMerchandise = new ArrayList<String>();
    ArrayList<Merchandise> merchandiseBill = new ArrayList<Merchandise>();

//    public ArrayList<String> getMerchandiseAbout() {
//        return merchandiseAbout;
//    }
//
//    public void setMerchandiseAbout(ArrayList<String> merchandiseAbout) {
//        this.merchandiseAbout = merchandiseAbout;
//    }

//    public Bill(Customer customer, ArrayList<String> numberOfMerchandise, ArrayList<String> merchandiseName, ArrayList<String> priceOfMerchandise){
//        this.customer = customer;
//        this.merchandiseName = merchandiseName;
//        this.numberOfMerchandise = numberOfMerchandise;
//        this.priceOfMerchandise = priceOfMerchandise;
//    }


    public ArrayList<Merchandise> getMerchandiseBill() {
        return merchandiseBill;
    }

    public void addMerchandiseBill(Merchandise merchandise) {
        this.merchandiseBill.add(merchandise);
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }



    public ArrayList<AddItems> getAdditems() {
        return additems;
    }

    public void setAdditems(ArrayList<AddItems> additems) {
        this.additems = additems;
    }

//    public ArrayList<String> getMerchandiseName() {
//        return merchandiseName;
//    }
//
//    public void setMerchandiseName(ArrayList<String> merchandiseName) {
//        this.merchandiseName = merchandiseName;
//    }
//
//    public ArrayList<String> getNumberOfMerchandise() {
//        return numberOfMerchandise;
//    }
//
//    public void setNumberOfMerchandise(ArrayList<String> numberOfMerchandise) {
//        this.numberOfMerchandise = numberOfMerchandise;
//    }

//    public ArrayList<String> getPriceOfMerchandise() {
//        return priceOfMerchandise;
//    }
//
//    public void setPriceOfMerchandise(ArrayList<String> priceOfMerchandise) {
//        this.priceOfMerchandise = priceOfMerchandise;
//    }

    public LocalDate getLocaldate() {
        return localdate;
    }

    public void setLocaldate(LocalDate localdate) {
        this.localdate = localdate;
    }
}
