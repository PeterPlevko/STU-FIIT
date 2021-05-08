package Vava_Zadanie_3.Reservation;

import Vava_Zadanie_3.Customer.Customer;
import Vava_Zadanie_3.Room.Room;

import java.io.Serializable;
import java.time.LocalDate;

public class Reservation implements Serializable {
    private Customer customer;
    private Room room;
    private LocalDate reservationFrom;
    private LocalDate reservationTo;
    int price;


    public Reservation(Customer customer, Room room, LocalDate reservationFrom, LocalDate reservationTo, int price) {
        this.customer = customer;
        this.room = room;
        this.reservationFrom = reservationFrom;
        this.reservationTo = reservationTo;
        this.price = price;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public LocalDate getReservationFrom() {
        return reservationFrom;
    }

    public void setReservationFrom(LocalDate reservationFrom) {
        this.reservationFrom = reservationFrom;
    }

    public LocalDate getReservationTo()
    {
        return reservationTo;
    }


    public void setReservationTo(LocalDate reservationTo) {
        this.reservationTo = reservationTo;
    }

    public String getCustomerName(){
        return this.customer.getName();
    }


    public String getRoomCategory(){
        return this.room.getCategory();
    }

    public int getRoomNumber(){
        return this.room.getRoomNumber();
    }

    public String getRoomInfo(){
        return this.room.getInfo();
    }

    public int getRoomPrice(){
        return this.room.getRoomPrice();
    }


}
