# 5 "Kompresia" súboru

**Táto úloha je veľmi ľahká, preto je za 5 bodov, posledná (šiesta) potom bude za 15.**

Naprogramujte konzolovú aplikáciu na "kompresiu súboru po riadkoch". Bude mať tri parametre, prvý je string compress/decompress, ktorý hovorí či chceme súbor komprimovať, alebo dekomprimovať. Druhý parameter je cesta k vstupnému súboru a tretí cesta k výstupnému súboru.

Súbory na kompresiu budú obsahovať iba písmená anglickej abecedy (```a-z``` a ```A-Z```) a nové riadky (znovu riadkami sa netrápte, otvorte súbor textovo a nechajte C++ za vás vyriešiť CRLF/LF konce riadkov). Ak sa tam bude vyskytovať akýkoľvek iný znak, tak treba vypísať na konzolu (```cout```), že nastala chyba aj s uvedeným číslom riadkom (riadky číslujeme od 1) ```Error on line ###```, kde ```###``` bude číslo riadku a skončí s nenulovým error kódom.

Naša kompresia bude fungovať nasledovne. Z riadku ```aabbbc``` vyrobí ```a2b3c1```. Čiže zo znakov vyrobí dvojice znak, počet a tie vypíše do výstupněho súboru. Asi ste si všimli, že toto nie je veľmi "kompresia", respektíve funguje len pre niektoré špecifické súbory, ale to nám pre edukačné účely stačí. Dekompresia funguje opačne, teda očakáva na vstupe reťazec tvaru "x2u4" a vyrobí z neho "xxuuuu". Znovu akákoľvek chyba v formáte súbore na dekompresiu má byť hlásená užívateľovi ako ```Error on line ###``` a nenulový error kód

Iné chyby (nedarí sa zapísať súbor, vstupný súbor neexistuje…) búdú užívateľovi hlásené ako nenulový error kód.

Príklad

```
aaabbcc
xxxxx
aaBB
```
```
a3b2c2
x5
a2B2
```
