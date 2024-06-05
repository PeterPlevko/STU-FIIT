package com.sipvs.zadanie1.models;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlType(propOrder={"sportsmanName", "courtNumber"})
public class Reservation {
    private String sportsmanName = "";
    private int courtNumber = 5;
    private int id = 0;

    public int getId() {
        return id;
    }

    @XmlAttribute(name = "reservation_id")
    public void setId(int id) {
        this.id = id;
    }

    public String getSportsmanName() {
        return sportsmanName;
    }

    @XmlElement(name = "sportsman-name")
    public void setSportsmanName(String sportsmanName) {
        this.sportsmanName = sportsmanName;
    }

    public int getCourtNumber() {
        return courtNumber;
    }

    @XmlElement(name = "court-number")
    public void setCourtNumber(int courtNumber) {
        this.courtNumber = courtNumber;
    }


    public String getContent() {
        return "Meno sportovca: " + sportsmanName + "\n" +
                "Cislo kurtu: " + courtNumber + "\n";
    }
}
