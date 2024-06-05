package Visitor;
import java.util.Random;
import Students.*;

/**
 * this class is part of visitor design pattern
 */
 public class VisitorEvaluateStudent implements Visitor
{
    /**
     * evaluates daily student
     * @param studentdaily
     * @return
     */
    @Override
    public StudentDaily visit(StudentDaily studentdaily)
    {
        Random rand = new Random();
        int rand_int1 = rand.nextInt(100);
        int[] poleIntov = new int[10];
        int present=0;
        int absent=0;
        for (int attendance: poleIntov)
        {
        if (attendance==0) present++;
        if (attendance==1) absent++;
        }
        if(present>=absent)
        {
            if (rand_int1<=100 && rand_int1>90) studentdaily.setMark("Dokonale, za A, presiel si");
            if (rand_int1<=90 && rand_int1>80) studentdaily.setMark("Vyborne, za B, presiel si");
            if (rand_int1<=80 && rand_int1>70) studentdaily.setMark("Dobre, za C, presiel si");
            if (rand_int1<=70 && rand_int1>60) studentdaily.setMark("Dostatocne, za D, presiel si");
            if (rand_int1<=60) studentdaily.setMark("Nedostatocne, FX");
        }
        else
            {
            System.out.println("Nepresiel si");
            }
    return studentdaily;
    }

    /**
     * evaluates extern student
     * @param studentextern
     * @return
     */
    @Override
    public StudentExtern visit(StudentExtern studentextern)
    {
        Random rand = new Random();
        int rand_int1 = rand.nextInt(100);
        if (rand_int1<=100 && rand_int1>90) studentextern.setMark("Dokonale, za A, presiel si ");
        if (rand_int1<=90 && rand_int1>80) studentextern.setMark("Vyborne, za B, presiel si");
        if (rand_int1<=80 && rand_int1>70) studentextern.setMark("Dobre, za C, presiel si");
        if (rand_int1<=70 && rand_int1>60) studentextern.setMark("Dostatocne, za D, presiel si");
        if (rand_int1<=60) studentextern.setMark("Nedostatocne, FX");
        return studentextern;
    }

}
