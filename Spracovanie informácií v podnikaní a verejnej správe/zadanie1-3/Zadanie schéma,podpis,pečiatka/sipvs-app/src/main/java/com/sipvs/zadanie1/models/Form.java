package com.sipvs.zadanie1.models;

import com.sipvs.zadanie1.xml.DateAdapter;

import javax.xml.bind.annotation.*;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import java.sql.Date;
import java.util.List;

@XmlRootElement(name = "form")
@XmlType(propOrder={"firstName", "lastName", "emailAddreess", "reservationDate", "wantsEquipment", "reservations"})

public class Form {
  private String firstName;
  private String lastName;
  private String emailAddreess;
  private String namespace = "http://sipvs-projekt.com/sipvs-teamABBBC";
  private Date reservationDate = new Date(System.currentTimeMillis());

  private List<Reservation> reservations;
  private Boolean wantsEquipment = Boolean.FALSE;

  @XmlAttribute(name = "xmlns")
  public String getNamespace() {
    return namespace;
  }

  public String getFirstName() {
    return firstName;
  }

  @XmlElement(name = "first-name")
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  @XmlElement(name = "last-name")
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmailAddreess() {
    return emailAddreess;
  }

  @XmlElement(name = "email-address")
  public void setEmailAddreess(String emailAddreess) {
    this.emailAddreess = emailAddreess;
  }

  public List<Reservation> getReservations() {
    return reservations;
  }

  @XmlElementWrapper(name = "reservations")
  @XmlElement(name = "reservation")
  public void setReservations(List<Reservation> reservations) {
    this.reservations = reservations;
  }
  public Date getReservationDate() {
    return reservationDate;
  }
  @XmlElement(name = "reservation-date")
  @XmlJavaTypeAdapter(DateAdapter.class)
  public void setReservationDate(Date reservationDate) {
    this.reservationDate = reservationDate;
  }

  @XmlElement(name = "wants-equipment")
  public void setWantsEquipment(Boolean wantsEquipment) {
    this.wantsEquipment = wantsEquipment;
  }

  public Boolean getWantsEquipment() {
    return wantsEquipment;
  }

  public String getContent() {
    StringBuilder reservationsText = new StringBuilder();
    for (Reservation r : reservations) {
      reservationsText.append(r.getContent());
    }

    return "First name: " + firstName + "\n" +
        "Last name: " + lastName + "\n" +
        "Email address: " + emailAddreess + "\n" +
        "Datum rezervacie: " + reservationDate + "\n" +
        "Zapozicanie pomocok: " + wantsEquipment + "\n" +
        "Repeating section: \n" + reservationsText + "\n";
  }

}
