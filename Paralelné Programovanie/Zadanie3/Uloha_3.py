from time import sleep, time
from threading import Thread, Lock, Condition


########## PARAMETERS ##########
POCET_ZAUJEMCOV = 25
POCET_ZA_CAS = 2
CAS_ZAUJEMCA = 4

POCET_LUKOV = 3
MAX_POCET_STRELNICA = 5

POZICIE = [False] * MAX_POCET_STRELNICA
POCET_NA_POZICII = [0] * MAX_POCET_STRELNICA
# kladne cisla - niekto striela, zaporne cisla - niekto zbiera
STATE = 0

LUK_COUNT = 0
KUSA_COUNT = 0

KUSA_CAS = 5
LUK_CAS = 2

# 1 - luk, 0 - kusa
zbran_cas = {
    0: KUSA_CAS,
    1: LUK_CAS
}

# ak Condition nedostane ako parameter mutex, vytvori si vlastny
vstup_cond = Condition()
zbrane_mutex = Lock()
strielanie_zbieranie_cond = Condition()


def zober_zbran():

    global zbrane_mutex, POCET_LUKOV, LUK_COUNT, KUSA_COUNT

    zbrane_mutex.acquire()

    if POCET_LUKOV > 0:
        POCET_LUKOV -=1
        LUK_COUNT += 1
        zbran = 1

    else:
        KUSA_COUNT += 1
        zbran = 0

    zbrane_mutex.release()
    return zbran


# return pozicia na strelnici
def vstup_na_strelnicu():

    global vstup_cond, POZICIE

    vstup_cond.acquire()

    while all(POZICIE):
        vstup_cond.wait()
    
    index = POZICIE.index(False)
    POZICIE[index] = True
    POCET_NA_POZICII[index] += 1
    vstup_cond.release()

    return index


def strielaj(zbran):

    global strielanie_zbieranie_cond, STATE

    strielanie_zbieranie_cond.acquire()

    # niekto zbiera, treba pockat
    while STATE < 0:
        strielanie_zbieranie_cond.wait()
    
    STATE += 1
    strielanie_zbieranie_cond.notify()
    strielanie_zbieranie_cond.release()

    print("SHOOTING")
    sleep(zbran_cas[zbran])
    print("END SHOOTING")

    # prestan strielat
    strielanie_zbieranie_cond.acquire()
    STATE -= 1
    strielanie_zbieranie_cond.notify()
    strielanie_zbieranie_cond.release()


def zbieraj(cas):

    global strielanie_zbieranie_cond, STATE, POZICIE

    strielanie_zbieranie_cond.acquire()

    # niekto striela, treba pockat
    while STATE > 0:
        strielanie_zbieranie_cond.wait()
    
    STATE -= 1
    strielanie_zbieranie_cond.notify()
    strielanie_zbieranie_cond.release()

    print("COLLECTING")
    sleep(cas)
    print("END COLLECTING")

    # dozbieraj
    strielanie_zbieranie_cond.acquire()
    STATE += 1
    strielanie_zbieranie_cond.notify()
    strielanie_zbieranie_cond.release()


def odid(pozicia):

    global vstup_cond, POZICIE

    vstup_cond.acquire()

    POZICIE[pozicia] = False
    vstup_cond.notify()
    vstup_cond.release()


def vrat_zbran(zbran):

    global zbrane_mutex, POCET_LUKOV
    
    zbrane_mutex.acquire()
    
    if zbran:
        POCET_LUKOV += 1
    
    zbrane_mutex.release()


def zaujemca():

    zbran = zober_zbran()
    pozicia = vstup_na_strelnicu()
    strielaj(zbran)
    zbieraj(pozicia + 1)
    odid(pozicia)
    vrat_zbran(zbran)


def main():

    zaujemci = []

    start_time = time()

    for i in range(POCET_ZAUJEMCOV):
        if i and i % POCET_ZA_CAS == 0:
            sleep(CAS_ZAUJEMCA)

        zaujemci.append(Thread(target=zaujemca))
        zaujemci[i].start()
    
    for i in range(POCET_ZAUJEMCOV):
        zaujemci[i].join()
    
    print("Všetci záujemci sa vystriedali za: {:.2f} sekúnd".format(round(time() - start_time, 2)))
    print("Z luku strieľalo: %d záujemcov" % (LUK_COUNT))
    print("Z kuše strieľalo: %d záujemcov" % (KUSA_COUNT))

    print("Pocet strelcov z pozicie:")
    
    for i, v in enumerate(POCET_NA_POZICII):
        print("miesto %d: strelcov: %d" % (i + 1, v))


main()
