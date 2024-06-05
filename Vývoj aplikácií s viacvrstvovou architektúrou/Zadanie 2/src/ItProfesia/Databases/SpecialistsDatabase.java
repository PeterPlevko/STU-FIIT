package ItProfesia.Databases;

import ItProfesia.Firms.Firm;
import ItProfesia.Specialists.Specialist;

import java.util.ArrayList;
import java.util.List;

public class SpecialistsDatabase {

    /**
     * tuto je databaza pracovnikov
     */
    public static List<Specialist> workerList = new ArrayList<Specialist>();



    public static void addToWorkerList(Specialist specialist){
        workerList.add(specialist);
    }


    public static List<String> getSpecialistNames(){
        List<String> specialistNames = new ArrayList<>();
        for(Specialist i : workerList) {
            specialistNames.add(String.valueOf(i.getUserId()));
        }
        return specialistNames;
    }


    public static Specialist getSpecialistById(String specialistId){
        Specialist specialist = null;
        for(Specialist i : workerList) {
            if (String.valueOf(i.getUserId()).equals(specialistId) && i.getAvailability() == 1){
                specialist = i;
            }
        }
        return specialist;
    }


    public static Specialist getSpecialistByIdNull(String specialistId){
        Specialist specialist = null;
        for(Specialist i : workerList) {
            if (String.valueOf(i.getUserId()).equals(specialistId)){
                specialist = i;
            }
        }
        return specialist;
    }


}
