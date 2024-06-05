package ItProfesia.Specialists;

public class Admin extends Specialist{
    private String preferredPlatform;
    private String zaradenie;


    public Admin(int dayPrice, int PraxisLength, String education, String preferredPlatform, String Certificates, String zaradenie, String type, int availability){
        this.setPriceForDay(dayPrice);
        this.setPraxisLength(PraxisLength);
        this.setHighestEducation(education);
        this.setCertificates(Certificates);
        this.setType(type);
        this.preferredPlatform = preferredPlatform;
        this.zaradenie = zaradenie;
        this.setAvailability(availability);
    }



    public String getPreferredPlatform() {
        return preferredPlatform;
    }

    public String getZaradenie(){
        return zaradenie;
    }


}
