# 3 Textový editor

Vytvorte textový editor ktorý funguje na princípe command a response.

Pri spustení dostane na vstup argument – meno súboru. Ak súbor neexistuje, tak ho vytvoríte. Súbor môžete spracovávať tak, že si ho celý uložíťe do pamäte.

Editor pracuje v dvoch režímoch, buď od používateľa očakáva príkaz, alebo vstup. Rozdiel môžete vidieť na nasledujúcom priklade.  Ak chceme na koniec súboru pripísať dva riadky, spravíme to nasledovne.

```
user@bts:/home/$ editor.exe email.txt
* a
Prvy riadok <Enter>
Druhy riadok <Enter>
. <Enter>
* w
* q
```
V prvom riadku sme spustili program a otvorili súbor ```email.txt```

V druhom od nás program požadoval príkaz (to je vidieť podľa hviezdičky, ktorou je identifikovaný príkazový mód, túto hviezdičku a za ňou medzeru musíte vypísať vy), v tomto prípade to bol append ```a```.

Následne sme sa dostali do vstupného módu. Tento nezačína hviezdičkou. Čokoľvek tu napíšeme, bude appendnuté na koniec súboru. Z tohto módu sa dostaneme von tak, že na posledný riadok dáme iba bodku. Následne sem opäť v príkazovom móde (hviezdička).

Na riadku 6 sme použíli príkaz write ``` w```. Tento zapísal zmeny do vstupného súboru.

Na riadku 8 sme použíli príkaz quit ```q```.

Vstupný mód je vždy ukončený riadkom s bodkou.        

Váš editor musí podporovať nasledujúce príkazy. Niektoré z nich môžu akceptovať aj rozsah riadkov na ktorých pracujú. Rozsah je definovaný nasledovne.

| Rozsah     | Vysvetlenie                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| ```,```    | všetky riadky                                                                                                |
| ```,10```  | riadky 1 až 10 (teda ad začiatku až po 10 vrátane)                                                           |
| ```5,10``` | riadky 5, 6, 7, 8, 9, 10                                                                                     |
| ```3, ```  | od riadka 3 (vrátane) až po koniec súboru                                                                    |
| ```3,3```  | od 3 po 3, teda vlastne riadok 3                                                                             |
| ```3```    | riadok 3                                                                                                     |
| ```4,3```  | chyba (vypíše na štandartný výstup Invalid range a nový riadok), vráti sa späť do režimu zadávanie príkazov. |


## Príkazy
Nasledujúce príkazy musí podporovať každá implementácia editora.

### Write
Príkaz ```w```. Zapíše aktuálny stav súboru na disk.

### Quit
Príkaz ```q```.

Ukončí program, pokiaľ nie je rozdiel medzi aktuálnym stavom a tým, čo je zapísané na disku. Inak vypíše chybovú hlášku (```You have unsaved changes```) a vráti sa do príkazového stavu, čiže zmeny zostanú zachované.

Príkaz ```q!```.

Ukončí program bez ohľadu na to, či došlo k zmenám, alebo nie.

### Append
Príkaz ```a```. Dopíše na koniec súboru to, čo mu bude zadané na vstupe.

Príkaz ```a [line]```. Dopíše to čo bude zadané na vstupe za daný riadok. Ostatné riadky posunie nižšie. Ak je zadané neexistujúce číslo riadku, neexistujúce riadky vytvoríme a budú prázdne.

### Print
Príkaz ```p```. Vypíš celý obsah súboru na výstup.

Príkaz ```p [range]```. Vypíše iba range na výstup.

### Delete
Príkaz ```d```. Zmaže všetky riadky.

Príkaz ```d [range]```. Zmaže riadky v danom rozsahu.

<br>
Akýkoľvek iný nerozpoznaný prikaz spôsobí, že aplikácia vypíse na štandartný výstup ```Unsupported command``` a vráti sa do príkazového režimu.

## Bonusy
### Change (1bod)
Príkaz ```c```. Nahradí celý súbor dátami zo vstupu.

Príkaz ```c [range]```. Nahradí daný rozsah dátami zo vstupu.

### Oneliners (2 body)
Príkazy append a change teraz majú možnosť zapisovať zmeny bez vstupného módu. Ak za príkazom nasledujú iné znaky, tieto budú použité ako riadok, ktorý bude použítý namiesto vstupu zo vstupného módu.

Pozor na to, že používateľ môže ale aj nemusí definovať rozsah.

Napr.

```* a 12 ahoj```

Vloží medzi riadky 12 a 13 riadok ahoj, zatiaľ čo


```* a 12aa```

Zapíše na koniec riadok 12aa
