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
int AKTUALNY_POCET_LUKOV = POCET_LUKOV;
int AKTUALNY_POCET_STRELNICA = 0;

int POZICIE[MAX_POCET_STRELNICA] = {0};
int POCET_NA_POZICII[MAX_POCET_STRELNICA] = {0};
// kladne cisla - niekto striela, zaporne cisla - niekto zbiera
int STATE = 0;

int LUK_COUNT = 0;
int KUSA_COUNT = 0;

#define KUSA_CAS 5
#define LUK_CAS 2

// 1 - luk, 0 - kusa
int zbran_cas[2] = {KUSA_CAS, LUK_CAS};

pthread_mutex_t vstup_mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t vstup_cond = PTHREAD_COND_INITIALIZER;
pthread_mutex_t zbrane_mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t strielanie_zbieranie_mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t strielanie_zbieranie_cond = PTHREAD_COND_INITIALIZER;


int zober_zbran() {

    pthread_mutex_lock(&zbrane_mutex);

    int zbran;

    if (AKTUALNY_POCET_LUKOV > 0) {
        --AKTUALNY_POCET_LUKOV;
        ++LUK_COUNT;
        zbran = 1;
    }
    
    else {
        ++KUSA_COUNT;
        zbran = 0;
    }

    pthread_mutex_unlock(&zbrane_mutex);
    return zbran;
}


// return pozicia na strelnici
int vstup_na_strelnicu() {

    pthread_mutex_lock(&vstup_mutex);

    while (AKTUALNY_POCET_STRELNICA == MAX_POCET_STRELNICA) {
        pthread_cond_wait(&vstup_cond, &vstup_mutex);
    }

    int index;

    for (int i = 0; i < MAX_POCET_STRELNICA; i++) {
        if (!POZICIE[i]) {
            index = i;
            break;
        }
    }

    POZICIE[index] = 1;
    ++POCET_NA_POZICII[index];
    ++AKTUALNY_POCET_STRELNICA;

    pthread_mutex_unlock(&vstup_mutex);

    return index;
}


void strielaj(int zbran) {

    pthread_mutex_lock(&strielanie_zbieranie_mutex);

    // niekto zbiera, treba pockat
    while (STATE < 0) {
        pthread_cond_wait(&strielanie_zbieranie_cond, &strielanie_zbieranie_mutex);
    }

    ++STATE;
    pthread_cond_signal(&strielanie_zbieranie_cond);
    pthread_mutex_unlock(&strielanie_zbieranie_mutex);

    printf("SHOOTING\n");
    sleep(zbran_cas[zbran]);
    printf("END SHOOTING\n");

    // prestan strielat
    pthread_mutex_lock(&strielanie_zbieranie_mutex);
    --STATE;
    pthread_cond_signal(&strielanie_zbieranie_cond);
    pthread_mutex_unlock(&strielanie_zbieranie_mutex);
}


void zbieraj(int cas) {

    pthread_mutex_lock(&strielanie_zbieranie_mutex);

    // niekto striela, treba pockat
    while (STATE > 0) {
        pthread_cond_wait(&strielanie_zbieranie_cond, &strielanie_zbieranie_mutex);
    }

    --STATE;
    pthread_cond_signal(&strielanie_zbieranie_cond);
    pthread_mutex_unlock(&strielanie_zbieranie_mutex);

    printf("COLLECTING\n");
    sleep(cas);
    printf("END COLLECTING\n");

    // dozbieraj
    pthread_mutex_lock(&strielanie_zbieranie_mutex);
    ++STATE;
    pthread_cond_signal(&strielanie_zbieranie_cond);
    pthread_mutex_unlock(&strielanie_zbieranie_mutex);
}    


void odid(int pozicia) {

    pthread_mutex_lock(&vstup_mutex);

    POZICIE[pozicia] = 0;
    --AKTUALNY_POCET_STRELNICA;

    pthread_cond_signal(&vstup_cond);
    pthread_mutex_unlock(&vstup_mutex);
}


void vrat_zbran(int zbran) {

    pthread_mutex_lock(&zbrane_mutex);

    if (zbran) {
        ++AKTUALNY_POCET_LUKOV;
    }

    pthread_mutex_unlock(&zbrane_mutex);
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

    printf("Z luku strielalo: %d zaujemcov\n", LUK_COUNT);
    printf("Z kuse strielalo: %d zaujemcov\n", KUSA_COUNT);

    printf("Pocet strelcov z pozicie:\n");
    
    for (int i = 0; i < MAX_POCET_STRELNICA; i++) {
        printf("miesto %d: strelcov: %d\n", i + 1, POCET_NA_POZICII[i]);
    }

    return 0;
}