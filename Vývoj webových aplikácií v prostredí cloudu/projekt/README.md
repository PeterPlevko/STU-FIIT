## WAC 2023 semestrálny projekt
Členovia tímu: **Peter Plevko, Samuel Řeřicha**
Názov aplikácie: **Projekt pprerko**
Názov súboru na github repe: **pprerko-team**
Zvysok veci + screenshoty v pdf subore

Pre spustenie v lokálnom clustri je potrebné spustiť port-forward cez 
**kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8088:80**

Link na samostatný FE na Azure:
https://pprerko-ambulance.azurewebsites.net/ambulance-pprerko/

Link na aplikáciu: 
https://wac-2023.germanywestcentral.cloudapp.azure.com/ui/pprerko-ambulance-frontend/


## Prípady použitia:
Zobrazenie, pridanie, úprava a mazanie informácií o lekárskych výkonoch - 
ambulácia, typ výkonu, pacient, termín, a celkový zisk pacient/poisťovňa.

Úprava a zmeny vykonávané zdravotníkmi, pridávanie ambulancií vykonávané administrátorom. 
Screenshoty v pdf.



**1. Správa ambulancií**
Ambulancie je možné vytvárať, upravovať a mazať. Ambulancia obsahuje atribúty, ako je meno, 
lokácia a meno doktora. Na každú ambulanciu môžu byť viazané výkony/appointments. 
Pre každú ambulanciu je tiež zobrazená suma cien výkonov viazaných na danú ambulanciu. 
V prípade zmazania ambulancie sú zmazané aj výkony na ňu viazané.

**2.Správa výkonov**
Podobne je možné upravovať, mazať a vytvárať appointments. Každý appointment obsahuje 
info o pacientovi, type návštevy, cene, ambulancii a tiež o tom kto daný výkon preplatil. 
Ambulancia je vyberaná zo zoznamu existujúcich ambulancií.

