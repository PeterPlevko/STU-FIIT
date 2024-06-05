package ItProfesia.Databases;

import ItProfesia.Firms.Firm;
import ItProfesia.Specialists.Specialist;

import java.util.ArrayList;
import java.util.List;

public class FirmsDatabase {

    /**
     * toto je databaza firiem
     */
    public static List<Firm> FirmList = new ArrayList<Firm>();


    public static void addToFirmList(Firm firm){
        FirmList.add(firm);
    }


    public static List<String> getFirmNames(){
        List<String> firmNames = new ArrayList<>();
        for(Firm i : FirmList) {
            firmNames.add(i.getName());
        }
        return firmNames;
    }

    public Firm getFirmByName(String menoFirmy){
        Firm firm = null;
        for(Firm i : FirmList) {
            if (i.getName().equals(menoFirmy)){
                firm = i;
            }
        }
        return firm;
    }



}
