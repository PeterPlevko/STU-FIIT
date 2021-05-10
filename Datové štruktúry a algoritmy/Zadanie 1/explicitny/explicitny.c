#include <stdio.h>
#define POSUNUTIE_NA_UVOLNENIE_PAMATE(smernik)  smernik = smernik+size+4;
#define PRETIPOVANIE_NA_CHAR(smernik,pretypovanie) char*smernik = (char*)pretypovanie;
#define PRETIPOVANIE_NA_INT(smernik,pretypovanie) int*smernik=(int*)pretypovanie;
#define ZAPIS_HODNOTY(kam , size)  *(kam) = size*-1;
#define UVOLNENIE(smernik) *smernik = (*smernik)*-1;

#define VELKOST 200





int *mem;

void *memory_alloc(unsigned int size)
{
    if(size < 8) return NULL; //+12 lebo 4 zaberá veľkosť celého,4 hlavička a 4 pätička +8 lebo to je moja réžia
    int linked_liste=0, total = *mem, spustac = 0, offset = *(mem+1), value_best_block = 0, minimum = 2147483646;
    PRETIPOVANIE_NA_CHAR(p_head_move,mem);
    p_head_move+= 4 + offset; //4 lebo offset je uložený na 4-smej pozícii
    char *p_to_search_best_fit = p_head_move;
    int *p_to_value_head;

    //best fit
    while(*p_to_search_best_fit!= 0) //nájst maximum
    {
        p_to_value_head = (int*)p_to_search_best_fit;
        value_best_block = *p_to_value_head;
        if (value_best_block >= size && value_best_block < minimum) //pozriem sa na hodnotu hlavičky bloku a porovnájum s predchádzajúcim minimom a sizom
        {
            p_head_move = p_to_search_best_fit; //presun smerníka na vhodnejší
            minimum = value_best_block;  //ak je value_best_block prijateľnejšia ako tá predtým minimum sa prepíše na tú hodnotu
        }
        p_to_search_best_fit += (*(p_to_search_best_fit+4))+4;
        spustac  +=  1;

    }

    if (minimum == 2147483646) p_head_move = p_to_search_best_fit;
    int empty_nunmber = total - ((char*)p_head_move-(char*)mem);
    if(size > empty_nunmber ) return NULL; //kontrola či sa vôbec zmestí blok do pamäte

    PRETIPOVANIE_NA_INT(p_head_read,p_head_move)
    int prev_offset = *(p_head_read+2);
    if (prev_offset > 0) (prev_offset += 8);
    else prev_offset +=8;
    char *p_previous = p_head_move + (prev_offset);
    if(*p_head_read>0) linked_liste=1;
    int next_free_block = *(p_head_read+1);
    int vzdialenost = p_previous - p_head_move; //zistim vzdialenost smernikov
    PRETIPOVANIE_NA_INT(predchdzajuci_zapis,p_previous)
    if(*predchdzajuci_zapis == *(mem+1)) predchdzajuci_zapis = predchdzajuci_zapis - 1;
    if(vzdialenost > 0 && next_free_block !=0 ) *(predchdzajuci_zapis+1) = next_free_block - vzdialenost; //nasmerovanie smerníka na najbližšie voľné, ak je ten voľný blok za aktuálnym
    if(vzdialenost < 0 && spustac >0) *(predchdzajuci_zapis+1) += (next_free_block ) + 4 ; //toto je posunutie smerníka na najbližšie voľné ak je voľné miesto po aktuálnom

    PRETIPOVANIE_NA_INT(p_head_write,p_head_move) //toto je časť kde konkrétne alokujem ten blok
    ZAPIS_HODNOTY(p_head_write,size)
    PRETIPOVANIE_NA_CHAR(smernik_na_posun,p_head_write)
    POSUNUTIE_NA_UVOLNENIE_PAMATE(smernik_na_posun)
    PRETIPOVANIE_NA_INT(p_heel_write,smernik_na_posun)
    ZAPIS_HODNOTY(p_heel_write,size)

    if (spustac == 0 && linked_liste == 0){ //presmerovanie root smerníka na novo alokovaný ak sa ešte neuvoľnovalo
        if(*(mem+3)==0) {
            *(mem + 1) = *(mem + 1) + (4 + 4 + size);
        }
        else {
            *(mem + 1) = *(mem+1) + *(mem+3) + 4;
        }
    }
    if(spustac == 0 && linked_liste) //presmerovanie root smerníka na novo alokovaný ak je to prvá pozícia v liste
    {
        *(mem+1) += (*(p_head_write+1))+4;

    }
    if(minimum - size > 16 && minimum !=2147483646 ) //rozdelenie bloku ak sa to oplatí
    {
        int posun_na_dalsi = *(p_head_write+1) - (size+8) ;
    int old_size = size;
    size = minimum - (old_size+8);
     *(p_heel_write+1) = minimum - (old_size+8);
     *(p_heel_write+2) = posun_na_dalsi;
     if(*(p_head_move+1) < 0) *(p_heel_write+3) = *(p_head_write+2) - (old_size+8); //ak je predchadzajuci blok pred novym blokm tak musím záporne zväčiť vzdialenosť
     else *(p_heel_write+3) = *(p_head_write+2) + (old_size+8);
     int posun_na_predosli = *(p_head_write+2);
     PRETIPOVANIE_NA_CHAR(smer,p_head_write);
     smer = smer +8  + posun_na_predosli;
     PRETIPOVANIE_NA_INT(s,smer);
     *s = *s + old_size + 8;
     p_heel_write +=1;
     PRETIPOVANIE_NA_CHAR(move,p_heel_write)
     POSUNUTIE_NA_UVOLNENIE_PAMATE(move)
     PRETIPOVANIE_NA_INT(move_heel,move)
     *move_heel = size;
    }
    return (p_head_move+4);
}

int memory_free(void *valid_ptr)
{
    valid_ptr = valid_ptr-4;
    int*smernik_na_uvolnenie = (int*)valid_ptr;

    int celkova_velkost = 0; //zistenie nasledujuceho bloku a predchadazujeho bloku a či sú voľné
    int size = (*smernik_na_uvolnenie)*-1;
    PRETIPOVANIE_NA_CHAR(smernik_na_kontrolu,smernik_na_uvolnenie);
    smernik_na_kontrolu = smernik_na_kontrolu + 8 + size;
    PRETIPOVANIE_NA_INT(smernik_na_kontrolu_int,smernik_na_kontrolu);
    int nasled = *smernik_na_kontrolu_int;
    int pred = *(smernik_na_uvolnenie-1);

    UVOLNENIE(smernik_na_uvolnenie) //konkretne uvolnenie
    PRETIPOVANIE_NA_CHAR(smernik_na_posun,smernik_na_uvolnenie)
    POSUNUTIE_NA_UVOLNENIE_PAMATE(smernik_na_posun)
    PRETIPOVANIE_NA_INT(smernik_na_uvolnenie_paty,smernik_na_posun)
    UVOLNENIE(smernik_na_uvolnenie_paty)

    char *na_kontrolu = (char*)mem; //zreťazenie s predchadzajucim voľným blokom
    na_kontrolu = na_kontrolu + *(mem+1) + 8;
    int ukazuje_na_posledne_miesto = *na_kontrolu; //ak to je prvé čo idem uvoľnovať tak ten root ukazuje na prázdne miesto a preto to nemám s čím zreťaziť
    int pozicia_uvolneneho_bloku = (char*)valid_ptr-(char*)mem;
    *(smernik_na_uvolnenie+1) = (*(mem+1)-pozicia_uvolneneho_bloku);
    *(smernik_na_uvolnenie+2) = (pozicia_uvolneneho_bloku+4)*-1;
    if(ukazuje_na_posledne_miesto) {
        int stara_pozicia = 4 + *(mem + 1);
        PRETIPOVANIE_NA_CHAR(s, mem);
        s = s + stara_pozicia + 8;
        PRETIPOVANIE_NA_INT(sme, s);
        *sme = pozicia_uvolneneho_bloku - stara_pozicia - 8;
    }

    *(mem+1) = (char*)valid_ptr-((char *) mem + 4); //dám blok na začiatok zoznamu
    int posun_na_nasled = 0;
    int stara_pozicia;
    if (pred > 0 && pozicia_uvolneneho_bloku > 12) {
            char *p_prev = (char *) smernik_na_uvolnenie - 8 - pred;
            PRETIPOVANIE_NA_INT(p_prev_write, p_prev);
            celkova_velkost = size + pred + 8;
            stara_pozicia = *(p_prev_write + 1);
            *p_prev_write = celkova_velkost;
            int stara_velkost = *(p_prev_write + 1);
            //to čo ukazovalo na druhy blok teraz musí ukazovať na prvý
            char *p_prev_move = (char *) p_prev;
            p_prev_move = p_prev_move + size + 4;
            PRETIPOVANIE_NA_INT(novy_smernik_zapis, p_prev_move);
            int novy_offset = *(novy_smernik_zapis) + 4;
            size = celkova_velkost;
            *(p_prev_write + 1) = *(p_prev_write + 1) + novy_offset;
            PRETIPOVANIE_NA_CHAR(p_to_move, p_prev_write);
            POSUNUTIE_NA_UVOLNENIE_PAMATE(p_to_move);
            PRETIPOVANIE_NA_INT(smernik_na_uvolnenie_pat, p_to_move);
            int posun_na_predosli_blok = *(smernik_na_uvolnenie + 2);
            PRETIPOVANIE_NA_CHAR(p_to_prev_left_move, smernik_na_uvolnenie);
            p_to_prev_left_move = p_to_prev_left_move + posun_na_predosli_blok + 8;
            PRETIPOVANIE_NA_INT(p_to_prev_left_int, p_to_prev_left_move);
            *p_to_prev_left_int = (*(p_to_prev_left_int)) - pred - 8;
            p_to_prev_left_move += (*p_to_prev_left_move) + 4;
            PRETIPOVANIE_NA_INT(s_na_p_int_2, p_to_prev_left_move);
            *s_na_p_int_2 = *(smernik_na_uvolnenie + 1) + 8 + pred; //nasmerovanie nového bloku na root
            *(s_na_p_int_2 + 1) = (char *) mem - (char *) s_na_p_int_2;
            *smernik_na_uvolnenie_pat = celkova_velkost;
            //posun na nasledujuce
            posun_na_nasled = *(smernik_na_uvolnenie + 1);
            PRETIPOVANIE_NA_CHAR(smer_na_nasled, smernik_na_uvolnenie);
            smer_na_nasled = smer_na_nasled + posun_na_nasled + 8;
            PRETIPOVANIE_NA_INT(smer_na_nasled_int, smer_na_nasled);
            *smer_na_nasled_int = *smer_na_nasled_int + stara_velkost + 4; //presmerovanie smerníka na ďalší voľný blok
            smernik_na_uvolnenie = p_prev_write;

        }


    if(nasled > 0)
    {
        //vypocitat ich velkost
        celkova_velkost = nasled + (*(smernik_na_uvolnenie)) + 8;
        *smernik_na_uvolnenie = celkova_velkost;
        //to čo ukazovalo na druhy blok teraz musí ukazovať na prvý
        char *novy_smernik = (char*)smernik_na_uvolnenie;
        int novy_offset = *(novy_smernik + size + 8) + 4 ;
        size = celkova_velkost; //nova velkost bloku
        if(posun_na_nasled != 0) *(smernik_na_uvolnenie+1) = stara_pozicia ; //ak sa spájalo aj s predchadzajucim tak je posun rozdielny od 0 a smerník na nasledujúci ostáva z toho prvého bloku
        else*(smernik_na_uvolnenie+1) = *(smernik_na_uvolnenie+1) + novy_offset + 4;
        PRETIPOVANIE_NA_CHAR(smernik_na_po,smernik_na_uvolnenie);
        POSUNUTIE_NA_UVOLNENIE_PAMATE(smernik_na_po);
        PRETIPOVANIE_NA_INT(smernik_na_uvolnenie_pat,smernik_na_po);
        *smernik_na_uvolnenie_pat = celkova_velkost;
    }

}

int memory_check(void *ptr)
{
    int* check = (int*)ptr;
    int size = (*check)*-1;
    PRETIPOVANIE_NA_CHAR(check_move,check);
    POSUNUTIE_NA_UVOLNENIE_PAMATE(check_move);
    PRETIPOVANIE_NA_INT(check_hell,check_move)
    if(check < 0 && check == check_hell) return 0; //ak je to hlavička tak aj posunutie o veľkosť musí byť to isté čislo lebo je to potom pätička
    else return 1;


}
void memory_init(void *ptr, unsigned int size)
{
    char *s_ptr = ptr;
    for(int i = 0;i<size;i++) //vynuloval som si to, kvôli prehľadnosti kódu
    {
        *(s_ptr+i) = 0;
    }
    mem = ptr;
    *mem = size;
    *(mem+1) = 4; //root offset na prvý voľný blok

}



int main() {
    char region[VELKOST];
    memory_init(region, VELKOST);
    void *a = memory_alloc(8);
    void *b = memory_alloc(9);
    void *c = memory_alloc(10);
    void *d = memory_alloc(11);
    memory_free(a);
    memory_free(d);
    memory_free(b);
    memory_alloc(50);



    return 0;
}
