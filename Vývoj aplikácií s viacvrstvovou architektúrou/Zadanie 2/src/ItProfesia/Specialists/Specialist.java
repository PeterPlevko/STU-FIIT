package ItProfesia.Specialists;

public class Specialist {
    private int priceForDay;
    private int praxisLength;
    private String highestEducation;
    private String certificates;
    private String type;
    private int availability;
    private int userId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAvailability(){
        return this.availability;
    }

    public void setAvailability(int availability){
        this.availability = availability;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPriceForDay() {
        return priceForDay;
    }

    public void setPriceForDay(int priceForDay) {
        this.priceForDay = priceForDay;
    }

    public int getPraxisLength() {
        return praxisLength;
    }

    public void setPraxisLength(int praxisLength) {
        this.praxisLength = praxisLength;
    }

    public String getHighestEducation() {
        return highestEducation;
    }

    public void setHighestEducation(String highestEducation) {
        this.highestEducation = highestEducation;
    }

    public String getCertificates() {
        return certificates;
    }

    public void setCertificates(String certificates) {
        this.certificates = certificates;
    }


}
