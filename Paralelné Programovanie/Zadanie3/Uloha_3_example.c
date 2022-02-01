// # Zadanie - strelnica

// Na strelnicu prichádzajú záujemci (každé štyri sekundy prídu dvaja), dokopy 25 ľudí. Keď príde záujemca na strelnicu, okamžite si zoberie luk alebo kušu. Ak je voľný luk, tak si ho zoberie, ináč si vezme kušu.
// Lukov je obmedzený počet (3), ale kuší je neobmedzený počet.

// Potom sa presunie na strelnicu. Na strelnici môže byť naraz 5 strelcov. Sú dva stavy - strieľanie, a zbieranie šípov. Ak niekto strieľa, tak nikto nemôže ísť zbierať šípy, a ak niekto zbiera šípy, nikto nemôže strielať.

// Strieľanie z kuše trvá 5s, z luku 2s. Zbieranie šípov trvá podľa toho, na ktorom mieste strelec strieľa (ak je na prvej pozícii, tak má najbližšie terč, a trvá mu to 1s, ak je na druhej pozícii, terč má ďalej, zbieranie trvá 2s, ak je na tretej, 3s ...). Každý záujemca si volí najnižšiu možnú pozíciu.

// Každý strelec najskôr strieľa, potom zbiera šípy, a následne odloží luk/kušu a odchádza.

// - Ošetrite, aby bol maximálny počet strelcov naraz 5
// - Ošetrite, aby mohli prísť ďalší strelci počas toho, ako už niektorí strieľajú
// - Ošetrite, aby si strelci správne zvolili svoju pozíciu
// - Doplňte do programu počítadlo, ktoré počíta počet strelcov, ktorý použili luk a kušu (každé samostatne)
// - Doplňte do programu počítadlo, ktoré počíta počet strelcov pre každé strelecké miesto


#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

////////// PARAMETERS //////////

#define POCET_ZAUJEMCOV 25
#define POCET_ZA_CAS 2
#define CAS_ZAUJEMCA 2

#define POCET_LUKOV 3
#define MAX_POCET_STRELNICA 5

#define KUSA_CAS 5
#define LUK_CAS 2

// 1 - luk, 0 - kusa
#define zbran_cas [KUSA_CAS, LUK_CAS]


/*
pthread_mutex_t mut = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

pthread_mutex_lock(&mut)
pthread_mutex_unlock(&mut)
 
pthread_cond_wait(&cond, &mut)
pthread_cond_signal(&cond)
pthread_cond_broadcast(&cond)
*/

// gcc strelnica.c -o strelnica.exe -lpthread


int zober_zbran() {

    return zbran;
}


int vstup_na_strelnicu() {

    return pozicia;
}


void strielaj(int zbran) {

    printf("SHOOTING\n");
    sleep(zbran_cas[zbran]);
    printf("END SHOOTING\n");
}


void zbieraj(int cas) {

    print("COLLECTING\n");
    sleep(cas);
    print("END COLLECTING\n");
}    


void odid(int pozicia) {

}


void vrat_zbran(int zbran){

}


void zaujemca() {
    
    int zbran = zober_zbran();
    int pozicia = vstup_na_strelnicu();
    strielaj(zbran);
    zbieraj(pozicia + 1);
    odid(pozicia);
    vrat_zbran(zbran);
}


int main() {

    pthread_t zaujemci[POCET_ZAUJEMCOV];

    for (int i = 0; i < POCET_ZAUJEMCOV; i++) {
        if (i && i % POCET_ZA_CAS == 0) {
            sleep(CAS_ZAUJEMCA);
        }

        pthread_create(&zaujemci[i], NULL, &zaujemca, NULL);
    }

    for (int i = 0; i < POCET_ZAUJEMCOV; i++) {
        pthread_join(zaujemci[i], NULL);
    }

    printf("Z luku strieľalo: %d záujemcov\n", LUK_COUNT);
    printf("Z kuše strieľalo: %d záujemcov\n", KUSA_COUNT);

    printf("Pocet strelcov z pozicie:\n");
    
    for (int i = 0; i < MAX_POCET_STRELNICA; i++) {
        printf("miesto %d: strelcov: %d\n", i + 1, POCET_NA_POZICII[i]);
    }

    return 0;
}