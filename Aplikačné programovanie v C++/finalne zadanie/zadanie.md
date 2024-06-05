# File sort
Naprogramujte konzolovú aplikáciu, ktorá má tri pozičné parametre.
1. Cesta k vstupnému súboru
2. Cesta k výstupnému súboru
3. Jedno zo slov (```dec```, ```hex```, ```bin```, ```str```, ```vec```)


Úlohou je zotriediť riadky súboru od najmenšieho po najväčší. S týmito pravidlami určenými podľa posledného parametra.

## Čísla
### dec
Riadky sú čísla z rozsahu ```int32_t```. Príklad
```
-154
+1544
1112
0
487
10101010
```

### hex
Riadky sú hexa čísla s prefixom ```0x``` z max rozsahu ```uint32_t```. Príklad
```
0x1111
0xdeadbeef
0x0badc0de
0x0000
0xc001
```

### bin
Riadky sú binárne čísla (bez prefixu) z max rozsahu ```uint32_t```. Príklad
```
101010101
111111111
00000
1
0
1
11011110010110001110
```


Čísla sa triedia podľa hodnoty, kedže ale máme rôzne reprezentácie toho istého čísla (```+3``` a ```3``` pripadne ```0x0001``` a ```0x1```) tak vo výslednom súbore chceme pôvodnú reprezentáciu. Toto je za 5 bodov (viď hodnotenie na konci), môžete to urobiť aj tak, že na výstup dáte len dec hodnoty, potom stratíte iba týchto 5 bodov. Napríklad ak je vstup
```
5
-2
+3
```
tak výstup ma byť
```
-2
+3
5
```
Ak to urobíte ako
```
-2
3
5
```
tak nedostanete tých 5 bodov, ale triedenie dec budete mať OK. Podobne to platí aj pre bin, napríklad vstup
```
10001
10011
101
101010
```
potom by výstup mal byť
```
101
10001
10011
101010
```
ak ale urobíte len
```
5
17
19
42
```
tak to budete mať len za body za bin.

## Iné
### str
Riadky sú stringy, triedenie je potom lexikograficky (to je vlastne priamo ```operator<``` nad stringami). Takýto súbor môže obsahovať čokoľvek, vy ho čitajte normálne ako char.

### vec
Riadky sú čísla v desiatkovej sústave (```int32_t```) oddelené čiarkou. Triedenie je akoby to boli vectory čísel, potom ich triedime najprv podľa **dĺžky**, teda kratšie sú menšie ako dlhšie. Rovnako dlhé sa triedia normálne podľa čísel.
```
1214,45,48,1
1,1,1,2
1,1,2
3
6,7,8
121,4,5,70,0
1,1,1
1,1,1,-1
```
sa utriedi ako
```
3
1,1,1
1,1,2
6,7,8
1,1,1,-1
1,1,1,2
1214,45,48,1
121,4,5,70,0
```

## Poznámky
- Nemusíte riešiť konce riadkov, ani to, či súbor ukoncený novým riadkom (inak povedané na výstup ho môžete vždy dať).
- Veľkosť súboru bude maximálne taká, že sa vám to zmestí do pamäte.
- Akákoľvek chyba (zlý parameter, chyba pri otváraní súboru, zlý obsah súboru, ...) má skončit s nenulovým error kódom.
- Možete predpokladať, že long long je 64-bit a int je 32-bit. O ostatných typoch radšej žiadnu presnú dĺžku nepredpokladajte (ak potrebujete presne, tak použite ```int16_t``` …).
- Pre hodnotu vec je OK aj prázdny string, vtedy bude vektor na porovnanie prázdny.
- Ak sú nejaké hodnoty ekvivalentné, tak na ich poradí nezávisí, napríklad
```
0x0f
0xe
0xf
```
sa môže triediť ako
```
0xe
0x0f
0xf
```
alebo ako
```
0xe
0xf
0x0f
```

## Hodnotenie
Dokopy je možné získať 40 bodov, bodovanie je rozdelené nasledovne.
- 5 bodov za implementáciu dec
- 5 bodov za implementáciu dec
- 7 bodov za implementáciu hex
- 5 bodov za implementáciu bin
- 5 bodov za implementáciu str
- 10 bodov za implementáciu vec
- 3 bodov za správne handlovanie parametrov a chýb v súboroch (ak sa nedá otvoriť...)
- 5 bodov za implementáciu toho, že na výstupe budú rovnaké stringy ako na vstupe

**Pri testoch je presne uvedené, ktorý je za koľko.**
