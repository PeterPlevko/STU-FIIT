# 4 Trieda BigNum

Implementujte triedu pre reprezentáciu celého čísla s ľubovoľnou presnosťou. Implementáciu samozrejme nechávam na vás, no nejde mi o efektívnosť implementácie, za to budú až bonusové body . Názov triedy bude BigNum a podporovať nasledovné operácie. Stiahnite si hlavičkový súbor a doplňte do neho implementáciu. Potom odovzdajte iba tento súbor (hlavne tam nedávajte žiadnu funkciu ```main```).

### Konštruktory
- Konštrukcia bez parametrov (inicializuje číslo na ```0```)
- Konštrukcia z ```int64_t```
- Konštrukcia z reťazca (```const std::string&```), ak reťazec nebude v číselnom formáte (malo by to vedieť spracovať čísla ako ```-123```, ```+0```, ```0000```, ```-00012```, ...), vyhoďte výnimku. Biele znaky na začiatku a na konci neakceptujeme.

### Podpora kopírovania
- Kopírovací konštruktor a kopírovací ```operator=``` (ak vám stačia automaticky generované, tak nemusíte definovať)

### Unárne operátory
- Unárny operátor ```+``` ako vo výraze ```b = +a;```
- Unárny operátor ```-``` ako vo výraze ```b = -a;```

### Binárne aritmetické operátory
- Aritmetické operácie ```-```, ```+```, ```*```
- Ich ```+=```, ```*=```, ```-=``` ekvivalenty
- Na násobenie prosím použite trochu lepší algoritmus, ako n-krát spočítam čísla. Stačí aj také násobenie ako učia na základnej škole.

### Relačné operátory
- Relačné operátory (```<```, ```>```, ```<=```, ```>=```, ```==```, ```!=```), pri tomto vám stačí naimplementovať operátor ```<=>```, doležité je aby fungovali výrazy ako ```a < b```, ```a == b```…

### Podpora streamov
- Podporu pre výstup do streamu, teda preťaženie operátora ```<<```

## Bonusové body
- (*2body*) Implementáciu ```/```, ```/=```, ```%``` a ```%=``` (celočíselné delenie) (http://stackoverflow.com/a/5387432)
- (*1bod*) Podpora operátora ```>>``` pre vstup zo streamov, vyextrahuje číslo zo streamu pokiaľ sa dá, nastaví ```failbit``` ak sa nedá extrahovať ani jeden znak, prípadne ak je na vstupe iba ```-```, vtedy skonzumujeme ```-``` a nastavíme ```failbit```. Tu si pozrite ako sa správa ```int``` a operátor ```>>```, malo by sa to správať rovnako aj v našej triede. Musíte vyriešiť ako sa správajú neplatné vstupy, napriklad ```xyz``` a ```-xyz```.
- (*1bod*) Rýchlosť, tu urobíme pár testov, ktoré testujú násobenie, sčítanie a odčítanie a prvých 5 implementácií získa ďalší bod. Čo urobiť aby vaša implementácia bola rýchla?
  - Implementácia (ale správna) Karatsubovho násobenia (pre veľké čísla, presne si to treba otestovať, ale povedzme väčšie ako cca. 10^100).
  - Ukladanie čísla nie po 10tkových cifrách, ale po väčších častiach (povedzme ```int/2```)

*Ak sa rozhodnete implementovať bonusy, tak príslušné makrá v hlavičkovom súbore nastavte na 1.*
