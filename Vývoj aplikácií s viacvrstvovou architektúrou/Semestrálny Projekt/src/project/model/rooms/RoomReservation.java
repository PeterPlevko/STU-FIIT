package project.model.rooms;

import java.io.Serializable;
import java.time.LocalDate;

public class RoomReservation implements Serializable {
    private final LocalDate dateFrom;
    private final LocalDate dateTo;
    private final int roomId;

    public RoomReservation(LocalDate dateFrom, LocalDate dateTo, int roomId) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.roomId = roomId;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public int getRoomId() {
        return roomId;
    }

    public Object clone(){
        return new RoomReservation(this.dateFrom, this.dateTo, this.roomId);
    }
}
