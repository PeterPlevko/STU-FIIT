# 2 Hľadanie reťazcov

Vytvorte konzolovú aplikáciu, ktorá dostane tri pozičné argumenty
- cestu k textovému súboru (ak súbor neexistuje alebo sa z neho nedá čítať skončite s nenulovým error kódom),
- neprázdny reťazec znakov ```X``` (akceptuje maximálnu dĺžku ostro menšiu 256, pre väčšie reťazce treba skončiť s nenulovým error kódom),
- číslo ```N``` označujúce vzdiatenosť (tu akceptujeme všetky ```uint32_t``` okrem nuly, inak nenulový error kód).

Program následne na štandardný výstup vypíše v riadkoch pozície, kde sa nachádza výskyt aký chceme. Prvý znak v súbore má pozíciu 0, rovnako aj prvý riadok je 0). Whitespace sa ráta do dĺžky súboru a konce riadkov sú vždy jeden znak (teda s tým nemusíte nič robiť, to za vás vyrieši C++). Súbory budú obsahovať iba znaky s hodnotou 0 < c <= 127, ak by bol v súbore aj iný znak, tak správanie je nešpecifikované.

Hľadáme výskyty reťazca ```X```, ktoré majú vo svojom okolí (definovnom pomocou ```+-N```) ďalší výskyt reťazca ```X```.

Ak máme súbor s obsahom:
```
aaabaaabbbbbbbbaaa
```
```X = aaa``` a  ```N = 4```, tak výsledkom budú pozície ```0, 4```. Lebo prvý výskyt má vo vzdialenosti ```4``` iný výskyt reťazca, konkrétne na pozícií ```4``` a ```|4 - 0| <= 4``` druhý výskyt tam tiež zarátame, lebo pred ním je vo vzdialenosti ```4``` ten náš prvý výskyt. Posledný výskyt nepoužijeme, lebo nemá nikde v okolí ešte jeden výskyt.

Keďže v príklade vyššie je všetko na jednom riadku, vysledok bude teda
```
0 0
0 4
```
Samotná podmienka blízkosti neberie do úvahy riadky, koniec riadku je vlastne jeden znak. Riadky a pozície v nich sa berú do úvahy iba vo výpise.

### Ďalšie príklady
```X = aaa, N = 2```

```
aaaaabbbbb
bbaaaaa
```

```
0 0
0 1
0 2
1 2
1 3
1 4
```
V príklade hore sa výskyty prelínajú, ale vôbec nevadí, je tam splnená podmienka blízkosti.

---

```X = aaabaaa, N = 2```
```
aaabaaabaaa
```

Tu bude výstupom nič, síce sa oba stringy prelínajú, ale začiatok prvého je ```0``` a začiatok druhého je ```4``` a teda ich rozdiel je väčší ako ```2```.

---

Pre vstupný súbor input.txt a ```X = bbb, N = 20``` je výsledok

```
4 41
4 45
6 29
6 30
```

Súbor môže byť obrovský, pokojne aj niekoľko desiatok GB, takže neukladajte celý jeho obsah do pamäte (pozor na ```std::getline```). Ako vždy sa hodnotí to aby boli všetky chybové stavy ošetrené (nenulový error kód). Tentokrát sa bonusový body získava za rýchlosť. Čiže aby to aj nejak bežalo. Prvých desať implementácií dostane bonusový bod.
