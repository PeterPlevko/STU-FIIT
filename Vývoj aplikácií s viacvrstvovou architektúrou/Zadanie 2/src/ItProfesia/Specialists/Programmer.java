package ItProfesia.Specialists;

public class Programmer extends Specialist {
    private String codingLanguage;
    private String zaradenie;

    public Programmer(int dayPrice, int PraxisLength, String education, String programingLanguage, String Certificates, String type, int availability){
        this.setPriceForDay(dayPrice);
        this.setPraxisLength(PraxisLength);
        this.setHighestEducation(education);
        this.setCertificates(Certificates);
        this.setType(type);
        this.setAvailability(availability);
        this.codingLanguage = programingLanguage;
    }

    public String getCodingLanguage(){
        return codingLanguage;
    }

    public String getZaradenie(){
        return zaradenie;
    }


}
