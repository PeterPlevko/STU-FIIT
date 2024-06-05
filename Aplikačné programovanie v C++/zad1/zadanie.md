# 1 Sudoku

Vytvorte konzolovú aplikáciu, ktorá bude mať dva voliteľné parametre

- ```-i``` vstupný súbor

- ```-o``` výstupný súbor

Ak vstupný, alebo výstupný súbor nebude uvedený použije sa štandardný vstup, respektíve výstup. Napríklad

| Príkazový riadok           | Vstup            | Výstup            | Poznámky                                                                                                |
| -------------------------- | ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| -i input.txt -o output.txt | Súbor input.txt  | Súbor output.txt  |                                                                                                         |
| -o output.txt -i input.txt | Súbor input.txt  | Súbor output.txt  | Nezáleží na poradí parametrov.                                                                          |
| -i input.txt               | Súbor input.txt  | Štandardný výstup |                                                                                                         |
|                            | Štandardný vstup | Štandardný výstup | Bez konzolových parametrov.                                                                             |
| -i -o output.txt           | N/A              | N/A               | Chyba, tri parametre sú nepodporované.                                                                  |
| -i -o                      | Súbor -o         | Štandardný výstup | Parametre sa spracúvajú od začiatku a za -i ide vždy meno súboru, takže -o sa sparsuje ako meno suboru. |

Aplikácia zo vstupu načíta po riadkoch Sudoku (formát .sdm). V riadku je práve ```81``` znakov, čo zodpovedá jednému 9x9 Sudoku zapísanému po riadkoch. Čísla ```1-9``` zodpovedajú samotným vyplneným číslam, prázdne miesta sú buď ```.```, alebo ```0```, ostatné znaky sú zakázané. Rovnako sa netrápte s koncami riadkov, spoľahnite sa, že to za vás vyrieši C++. Na výstup dá aplikácia jednotlivé vyriešené Sudoku v rovnakom poradí ako boli na vstupe (čiže ```81``` znakov ```1-9```, nebudú tam teda nevyplnené miesta). Ak náhodou zadanie Sudoku nemá riešenie, nechajte namiesto neho prázdny riadok. Pokiaľ nechcete bonusový bod, tak rýchlosť nie je potrebné riešiť. Stačí implementovať prehľadávanie všetkých možností s tým, že ich budete rezať ak nie je niečo splnené podľa pravidiel Sudoku. Štandardne sudoku nie je platné., ak má viacej ako jedno riešenia, toto nás netrápe, nato máme bonusový bod :).

Napríklad ak spustíme ```sudoku.exe -i input.sdm -o output.txt``` a vstupný súbor bude vyzerať


```
016400000200009000400000062070230100100000003003087040960000005000800007000006820
049008605003007000000000030000400800060815020001009000010000000000600400804500390
760500000000060008000000403200400800080000030005001007809000000600010000000003041
316452978285679314497318562879234156142965783653187249968721495521843697734596821
000605000003020800045090270500000001062000540400000007098060450006040700000203000
409000705000010000006207800200000009003704200800000004002801500000060000905000406
000010030040070501002008006680000003000302000300000045200500800801040020090020000
316452978285679314497318562879234156142965783653187249968721435521843697734596821
080070030260050018000000400000602000390010086000709000004000800810040052050090070
000093006000800900020006100000080053006000200370050000002500040001009000700130000
```

Potom výstupný súbor ```output.txt``` by mal byť

```
316452978285679314497318562879234156142965783653187249968721435521843697734596821
149238675623957148758146239935472861467815923281369754316794582592683417874521396
763548129421369758958172463297436815186795234345821697819254376634917582572683941

829675314673124895145398276587436921962817543431952687398761452216549738754283169
419638725728519643536247891254186379193754268867923154642891537371465982985372416
768915432943276581512438796685194273174352968329687145237569814851743629496821357
316452978285679314497318562879234156142965783653187249968721435521843697734596821
481976235267453918935821467178632549392514786546789321724165893819347652653298174
185293476647815932923746185219684753456371298378952614892567341531429867764138529
```

Ako vidieť na štvrtom riadku je sudoku, ktoré sa nedá vyriešiť (je už zle zadané), preto ostal riadok prázdny.

Ak nastane akákoľvek chyba, teda napríklad zlý počer parametrov, neexistujúce súbory, alebo zlý formát súboru, skončite s error kódom rôznym od ```0```.

Bonusový bod sa dá získať za rýchlosť. Aplikáciam sa ako vstup dá súbor so stovkami/tisíckami Sukodu a päť riešení s najrýchlejším (ale korektným) spracovaním získajú bod.

Ešte jeden bonusový bod za podporu validácie sudoku. Ak dostanete parameter ```--check 080070030260050018000000400000602000390010086000709000004000800810040052050090070```, tak na štandartný výstup vypíšte ```0``` ak sudoku nie je platné (teda buď nemá riešenie, alebo má viacej ako jedno), ```1``` ak je Sudoku v poriadku. Tu pozor, lebo ak budete len tak skúšať všetky možnosti, tak vám to môže trvať veľmi dlho a my vždy máme časový limit.
