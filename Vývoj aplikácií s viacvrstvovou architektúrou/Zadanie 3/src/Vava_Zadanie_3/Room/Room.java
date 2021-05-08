package Vava_Zadanie_3.Room;

import java.io.Serializable;

public class Room implements Serializable {
    private String category;
    private int roomNumber;
    private String info;
    private int roomPrice;

    public Room(String category, int roomNumber, String info, int roomPrice) {
        this.category = category;
        this.roomNumber = roomNumber;
        this.info = info;
        this.roomPrice = roomPrice;
    }

    public int getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(int roomPrice) {
        this.roomPrice = roomPrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }



}
