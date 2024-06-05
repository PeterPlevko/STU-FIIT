package ItProfesia.Firms;

import javafx.scene.image.ImageView;

public class Firm {
    private String name;
    private String areaOfExpertise;
    private int numberOfEmployees;
    private ImageView logo;

    public Firm(String name, String areaOfExpertise, int numberOfEmployees){
        this.name = name;
        this.areaOfExpertise = areaOfExpertise;
        this.numberOfEmployees = numberOfEmployees;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAreaOfExpertise() {
        return areaOfExpertise;
    }

    public void setAreaOfExpertise(String areaOfExpertise) {
        this.areaOfExpertise = areaOfExpertise;
    }

    public int getNumberOfEmployees() {
        return numberOfEmployees;
    }

    public void setNumberOfEmployees(int numberOfEmployees) {
        this.numberOfEmployees = numberOfEmployees;
    }

    public void setImage(ImageView value) {
        logo = value;
    }

    public ImageView getImage() {
        return logo;
    }


}
