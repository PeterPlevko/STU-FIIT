package ItProfesia.Zmluva;

import ItProfesia.Specialists.Specialist;

import java.util.ArrayList;
import java.util.List;

public class Zmluva {

    private String menoFirmy;
    private List<String> workersSpecalists = new ArrayList<>();


    public String getMenoFirmy() {
        return menoFirmy;
    }

    public void setMenoFirmy(String menoFirmy) {
        this.menoFirmy = menoFirmy;
    }

    public List<String> getWorkersSpecalists() {
        return workersSpecalists;
    }

    public void setWorkersSpecalists(String worker) {
        this.workersSpecalists.add(worker);
    }




}
