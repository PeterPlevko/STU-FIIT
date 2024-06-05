#include <stdio.h>
#include <stdlib.h>
#include <float.h>
#include <math.h>
#include "pocty.h"

extern double Lstol[1+NDim];
extern const double polomer;

void chyba(const int ig, const int ic, const double vel, const double CasZrMozno)
{
    fprintf(stderr, " dalsia_zrazka()/chyba():\n");
    fprintf(stderr, " Zaporny cas do dalsej zrazky so stenou pre ig = %d ic = %d  VelNow = %1.16le :\n", ig, ic, vel);
    fprintf(stderr, " CasZrMozno = %1.16le . Koncim.\n", CasZrMozno);
    exit(3);
}


//==========================================================================================
// Funkcia  dalsia_zrazka()  vypocita a vrati cas najskorsej zrazky od momentalneho okamihu.
// Okrem toho vypocita a do premennych  OdrGula, OdrCart  zapise informaciu,
// ktora gula narazila a ktorej kartezianskej suradnice sa to tyka.
// PosNow  =  Positions Now   (t. j. polohy stredov gul v momentalnom okamihu)
// VelNow  =  Velicities Now  (t. j. rychlosti gul  momentalnom okamihu)
//==========================================================================================

double dalsia_zrazka(const double PosNow[1+NGul][1+NDim], const double VelNow[1+NGul][1+NDim],
                     int *OdrGula, int *OdrCart, int *igzr, int *jgzr)
{
    const double NepatrneKladneCislo = 1.0e20*DBL_MIN;
    double CasMin = DBL_MAX;
    //===========================================================
    // Vyhladaj najblizsiu zrazku so stenou, ktora mozno nastane.
    //===========================================================
    *OdrGula = 0;
    *OdrCart = -1;
    for (int ig = 1; ig <= NGul; ig++) for (int ic = 1; ic <= NDim; ic++) {
        double CasZrMozno;
        if      (VelNow[ig][ic] < 0.0) {
            //------------------------------------
            // vypocet pre pohyb dolava alebo dole
            //------------------------------------
            CasZrMozno = ( PosNow[ig][ic] - (-0.5*Lstol[ic]+polomer) ) / (-VelNow[ig][ic]);
            //------------------------------------------------------------------------------------------------
            // osetrenie numericky tazkych pripadov:
            // Velmi zaporne casove intervaly su zasadnou chybou.
            // Nepatrne zaporne CasZrMozno moze niekedy vzniknut z numerickych dovodov, nie ako zasadna chyba.
            // Preklop znamienko pre pripad nepatrnej zapornej hodnoty, inak program zhavaruje.
            //------------------------------------------------------------------------------------------------
            if      (CasZrMozno < -NepatrneKladneCislo) chyba(ig, ic, VelNow[ig][ic], CasZrMozno);
            else if (CasZrMozno < 0.0)                  CasZrMozno *= -1.0;
            //----------------------------------------------------------------------
            // Ak vypocitany casovy interval je kratsi nez zatial najkratsi najdeny,
            // zapamataj si ho, a aj prislusne ig, ic.
            //----------------------------------------------------------------------
            if (CasZrMozno < CasMin) {
                CasMin = CasZrMozno;
                *OdrGula = ig;
                *OdrCart = ic;
            }
        }
        else if (VelNow[ig][ic] >  0.0) {
            //-------------------------------------
            // vypocet pre pohyb doprava alebo hore
            //-------------------------------------
            CasZrMozno = ( PosNow[ig][ic] - (0.5*Lstol[ic]-polomer) ) / (-VelNow[ig][ic]);
            //------------------------------------------------------------------------------------------------
            // osetrenie numericky tazkych pripadov:
            // Velmi zaporne casove intervaly su zasadnou chybou.
            // Nepatrne zaporne CasZrMozno moze niekedy vzniknut z numerickych dovodov, nie ako zasadna chyba.
            // Preklop znamienko pre pripad nepatrnej zapornej hodnoty, inak program zhavaruje.
            //------------------------------------------------------------------------------------------------
            if      (CasZrMozno < -NepatrneKladneCislo) chyba(ig, ic, VelNow[ig][ic], CasZrMozno);
            else if (CasZrMozno < 0.0)                  CasZrMozno *= -1.0;
            //----------------------------------------------------------------------
            // Ak vypocitany casovy interval je kratsi nez zatial najkratsi najdeny,
            // zapamataj si ho, a aj prislusne ig, ic.
            //----------------------------------------------------------------------
            if (CasZrMozno < CasMin) {
                CasMin = CasZrMozno;
                *OdrGula = ig;
                *OdrCart = ic;
            }
        }
    }
    //====================================================================================
    // Analyzuj moznost vzajomnej zrazky gul.
    // Symbol  bij  je zovseobecnenenie oznacenia  b12  z teorie.
    // rijsq = |rj - ri|^2  je stvorec (square) vzdialenosti stredov gul  ig, jg.
    // Je to zovseobecnenie r12^2 z teorie.
    // vijsq = |vj - vi|^2
    // Hodnoty bij, rijsq, vijsq  sa pocitaju ako skalarne suciny.
    // Mohli by sme teda na ich vypocty pouzit funkciu  skalsuc()  z biliard.c,
    // ale museli by sme alokovat polia pre sucinitele.
    // Povedzme ze sa nam to neoplati alebo nechce, tak sa tu zaobideme aj bez  skalsuc().
    //====================================================================================
    *igzr = 0;
    *jgzr = 0;
    for (int ig = 2; ig <= NGul; ig++) for (int jg = 1; jg < ig; jg++) {
        // Testuj ci sa gule  ig, jg  s momentalnymi smermi a rychlostami vobec zrazia.
        double bij = 0.0;
        for (int ic = 1; ic <= NDim; ic++) bij += (PosNow[jg][ic]-PosNow[ig][ic])*(VelNow[jg][ic]-VelNow[ig][ic]);
        double rijsq = 0.0;
        for (int ic = 1; ic <= NDim; ic++) rijsq += pow(PosNow[jg][ic]-PosNow[ig][ic], 2.f);
        double vijsq = 0.0;
        for (int ic = 1; ic <= NDim; ic++) vijsq += pow(VelNow[jg][ic]-VelNow[ig][ic], 2.f);
        if (bij < 0.0  &&  bij*bij - vijsq*(rijsq-4*polomer*polomer) > 0.0) {
            // Zrazia sa, pocitaj za aku dobu.
            double tij = 1 / vijsq * ((-bij) - sqrtf(bij * bij - vijsq * (rijsq - 4 * polomer * polomer)));
            if (tij >= 0.0 && tij < CasMin) {
                CasMin = tij;
                *igzr = ig;
                *jgzr = jg;
                *OdrCart = 0;  // To znamena, ze ide o zrazku typu gula-gula.
            }
        }
    }
    return CasMin;
}
