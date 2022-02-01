# # Zadanie - strelnica

# Na strelnicu prichádzajú záujemci (každé štyri sekundy prídu dvaja), dokopy 25 ľudí. Keď príde záujemca na strelnicu, okamžite si zoberie luk alebo kušu. Ak je voľný luk, tak si ho zoberie, ináč si vezme kušu.
# Lukov je obmedzený počet (3), ale kuší je neobmedzený počet.

# Potom sa presunie na strelnicu. Na strelnici môže byť naraz 5 strelcov. Sú dva stavy - strieľanie, a zbieranie šípov. Ak niekto strieľa, tak nikto nemôže ísť zbierať šípy, a ak niekto zbiera šípy, nikto nemôže strielať.

# Strieľanie z kuše trvá 5s, z luku 2s. Zbieranie šípov trvá podľa toho, na ktorom mieste strelec strieľa (ak je na prvej pozícii, tak má najbližšie terč, a trvá mu to 1s, ak je na druhej pozícii, terč má ďalej, zbieranie trvá 2s, ak je na tretej, 3s ...). Každý záujemca si volí najnižšiu možnú pozíciu.

# Každý strelec najskôr strieľa, potom zbiera šípy, a následne odloží luk/kušu a odchádza.

# - Ošetrite, aby bol maximálny počet strelcov naraz 5
# - Ošetrite, aby mohli prísť ďalší strelci počas toho, ako už niektorí strieľajú
# - Ošetrite, aby si strelci správne zvolili svoju pozíciu
# - Doplňte do programu počítadlo, ktoré počíta počet strelcov, ktorý použili luk a kušu (každé samostatne)
# - Doplňte do programu počítadlo, ktoré počíta počet strelcov pre každé strelecké miesto


from time import sleep, time
from threading import Thread, Lock, Condition


########## PARAMETERS ##########
POCET_ZAUJEMCOV = 25
POCET_ZA_CAS = 2
CAS_ZAUJEMCA = 2

POCET_LUKOV = 3
MAX_POCET_STRELNICA = 5

KUSA_CAS = 5
LUK_CAS = 2

# 1 - luk, 0 - kusa
zbran_cas = {
    0: KUSA_CAS,
    1: LUK_CAS
}


def zober_zbran():

    return zbran


def vstup_na_strelnicu():

    return pozicia


def strielaj(zbran):

    print("SHOOTING")
    sleep(zbran_cas[zbran])
    print("END SHOOTING")


def zbieraj(cas):

    print("COLLECTING")
    sleep(cas)
    print("END COLLECTING")


def odid(pozicia):

    ...


def vrat_zbran(zbran):

    ...


def zaujemca():

    zbran = zober_zbran()
    pozicia = vstup_na_strelnicu()
    strielaj(zbran)
    zbieraj(pozicia + 1)
    odid(pozicia)
    vrat_zbran(zbran)


def main():

    zaujemci = []

    for i in range(POCET_ZAUJEMCOV):
        if i and i % POCET_ZA_CAS == 0:
            sleep(CAS_ZAUJEMCA)

        zaujemci.append(Thread(target=zaujemca))
        zaujemci[i].start()
    
    for i in range(POCET_ZAUJEMCOV):
        zaujemci[i].join()

    print("Z luku strieľalo: %d záujemcov" % (LUK_COUNT))
    print("Z kuše strieľalo: %d záujemcov" % (KUSA_COUNT))

    print("Pocet strelcov z pozicie:")
    
    for i, v in enumerate(POCET_NA_POZICII):
        print("miesto %d: strelcov: %d" % (i + 1, v))

main()
