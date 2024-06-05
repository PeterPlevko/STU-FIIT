package Vava_Zadanie_3.Platba;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Room.Room;
import Vava_Zadanie_3.Ubytovanie.Ubytovanie;

import java.io.Serializable;
import java.time.LocalDate;

public class Platba implements Serializable {
    private Ubytovanie ubytovanie;
    private LocalDate datumZaplatenia;
    private String TypPlatby;


    public Platba(Ubytovanie ubytovanie, LocalDate datumZaplatenia, String typPlatby) {
        this.ubytovanie = ubytovanie;
        this.datumZaplatenia = datumZaplatenia;
        TypPlatby = typPlatby;
    }


    public Ubytovanie getUbytovanie() {
        return ubytovanie;
    }

    public void setUbytovanie(Ubytovanie ubytovanie) {
        this.ubytovanie = ubytovanie;
    }

    public LocalDate getDatumZaplatenia() {
        return datumZaplatenia;
    }

    public void setDatumZaplatenia(LocalDate datumZaplatenia) {
        this.datumZaplatenia = datumZaplatenia;
    }

    public String getTypPlatby() {
        return TypPlatby;
    }

    public void setTypPlatby(String typPlatby) {
        TypPlatby = typPlatby;
    }


    public int getPrice() {
        return this.ubytovanie.getPrice();
    }

    public void setPrice(int price) {
        this.ubytovanie.setPrice(price);
    }

    public Customer getCustomer() {
        return this.ubytovanie.getCustomer();
    }

    public void setCustomer(Customer customer) {
        this.ubytovanie.setCustomer(customer);
    }

    public Room getRoom() {
        return this.ubytovanie.getRoom();
    }

    public void setRoom(Room room) {
        this.ubytovanie.setRoom(room);
    }

    public LocalDate getReservationFrom() {
        return this.ubytovanie.getReservationFrom();
    }

    public void setReservationFrom(LocalDate reservationFrom) {
        this.ubytovanie.setReservationFrom(reservationFrom);
    }

    public LocalDate getReservationTo()
    {
        return this.ubytovanie.getReservationTo();
    }


    public void setReservationTo(LocalDate reservationTo) {
        this.ubytovanie.setReservationTo(reservationTo);
    }

    public String getCustomerName(){
        return this.ubytovanie.getCustomerName();
    }


    public String getRoomCategory(){
        return this.ubytovanie.getRoomCategory();
    }

    public int getRoomNumber(){
        return this.ubytovanie.getRoomNumber();
    }

    public String getRoomInfo(){
        return this.ubytovanie.getRoomInfo();
    }

    public int getRoomPrice(){
        return this.ubytovanie.getRoomPrice();
    }


}
