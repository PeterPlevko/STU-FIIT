package ItProfesia.Databases;

import ItProfesia.Specialists.Specialist;
import ItProfesia.Zmluva.Zmluva;

import java.util.ArrayList;
import java.util.List;

public class ZmluvyDatabase {



    public static List<Zmluva> zmluvaList = new ArrayList<Zmluva>();



    public static void addZmluvaList(Zmluva zmluva){
        zmluvaList.add(zmluva);
    }


    public static Zmluva getZmluvaByName(String name) {
        Zmluva zmluva = null;
        for (Zmluva i : zmluvaList) {
            if (i.getMenoFirmy().equals(name)) {
                zmluva = i;
            }
        }
        return zmluva;
    }


}
