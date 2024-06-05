package ItProfesia.Specialists;

public class SecurityConsultant extends Specialist {
    boolean isAuditor;

    public SecurityConsultant(int dayPrice, int PraxisLength, String education, Boolean isAuditor, String Certificates, String type, int availability){
        this.setPriceForDay(dayPrice);
        this.setPraxisLength(PraxisLength);
        this.setHighestEducation(education);
        this.setCertificates(Certificates);
        this.setType(type);
        this.isAuditor = isAuditor;
        this.setAvailability(availability);
    }

    public boolean getAuditor(){
        return isAuditor;
    }




}
