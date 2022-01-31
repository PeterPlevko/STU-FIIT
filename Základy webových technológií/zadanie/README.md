# Semestrálny projekt - elektronický obchod

## Zadanie
Vytvorte webovú aplikáciu - eshop, ktorá komplexne rieši nižšie definované prípady použitia vo vami zvolenej doméne (napr. elektro, oblečenie, obuv, nábytok). Presný rozsah a konkretizáciu prípadov použitia si dohodnete s Vašim cvičiacim na cvičení.


## Tím
Projekt vypracovávate vo dvojici. Každý z dvojice sa musí podieľať na
projekte významným dielom (rovnomerné rozdelenie práce). Vypracovanie (takmer) celého projektu len jedným z dvojice autorov je neprípustné. Je potrebné, aby bol každý z autorov oboznámený s celým projektom, vrátane častí, na ktorých sám nepracoval. Autori sú hodnotení rovnakým získaným počtom bodov.


## Autorstvo
Je zakázané používať programy alebo časti projektov od iných študentov, alebo z minulého ročníka.
Všetky použité materiály z odbornej literatúry alebo z internetu musia byť citované. Ak
použijete cudzí materiál a neuvediete zdroj, práca môže byť považovaná za plagiát.


## Termíny odovzdania
* **Odovzdanie 1. fázy projektu: koniec 3. týždňa - 10.10. do 23:59 v AIS, 8 bodov,** vytvorenie skíc jednotlivých stránok pre zariadenia extra large (desktop)
* **Odovzdanie 2. fázy projektu: koniec 7. týždňa - 7.11, do 23:59 v AIS, 18 bodov (16 + 2 body),** vytvorenie responzívnych šablón (16 bodov); návrh dátového modelu (2 body)
* **Odovzdanie 3. fázy projektu: koniec 11. týždňa - 5.12. do 23:59 v AIS, 20 bodov** 
  * implementácia klientskej časti eshopu so zostavením na serveri (server-side rendering) s využitím PHP rámca (odporúčaný Laravel)
  * implementácia administrátorského panela/admin zóny so zostavením na serveri (server-side rendering) s využitím PHP rámca (odporúčaný Laravel)
  * finálna dokumentácia


## Termíny prezentovania
V čase cvičení tím predvedie na svojom počítači svoje riešenie (fázy projektu), a to:
* **Konzultácie k 1. fáze projektu, na cvičení: 4. týždeň - 11.10. a 12.10.**
* **Prezentovanie 2. fázy projektu, na cvičení: 8. týždeň - 8. a 9.11.***
* **Prezentovanie finálneho projektu: 12. týždeň - 6.12. a 7.12.**


## Aplikácia - eshop

**Aplikácia musí realizovať tieto prípady použitia:**

**Klientská časť**
* zobrazenie prehľadu všetkých produktov z vybratej kategórie používateľom
    * základné filtrovanie (aspoň podľa 3 atribútov, napr. rozsah cena od-do, značka, farba)
    * stránkovanie
    * preusporiadanie produktov (napr. podľa ceny vzostupne/zostupne)
* zobrazenie konkrétneho produktu - detail produktu
    * pridanie produktu do košíka (ľubovolné množstvo)
* plnotextové vyhľadávanie nad katalógom produktov
* zobrazenie nákupného košíka
    * zmena množstva pre daný produkt
    * odobratie produktu
    * výber dopravy
    * výber platby
    * zadanie dodacích údajov
    * dokončenie objednávky
	* umožnenie nákupu bez prihlásenia
	* prenositeľnosť nákupného košíka v prípade prihláseného používateľa
* registrácia používateľa/zákazníka
* prihlásenie používateľa/zákazníka
* odhlásenie zákazníka

**Administrátorská časť**
* prihlásenie administrátora do administrátorského rozhrania eshopu
* odhlásenie administrátora z administrátorského rozhrania
* vytvorenie nového produktu administrátorom cez administrátorské rozhranie
* upravenie/vymazanie existujúceho produktu administrátorom cez administrátorské rozhranie

## Dátový model
V druhom kontrolnom termíne sa odovzdáva JPG (JPEG) obrázok logického dátového modelu reprezentovaného UML class diagramom.

V poslednej, 3. fáze projektu, sa databáza odovzdáva kompletná (dáta aj schéma, resp. DDL).


## Spôsob odovzdávania
Výstupy všetkých kontrolných bodov sa odovzdávajú do AISu. Odovzdáva iba jeden zo študentov v tíme. Dohodnite sa vopred, aby sa nestalo, že neodovzdá ani jeden.

Odovzdávajú sa všetky zdrojové kódy aplikácie, okrem samotných rámcov a knižníc z manažéra balíkov (composer, npm). V prípade, že študent modifikoval používanú knižnicu, je potrebné pribaliť aj zmenené knižnicu a uviesť zmenu s odôvodnením v dokumentácii.

Odovzdáva sa ZIP alebo RAR archív.


## Oneskorenie odovzdania
V kontrolnom termíne sa môže odovzdanie oneskoriť maximálne o 3 dni.

Za každý deň oneskoreného odovzdania je tímu odobratých 25% bodov z pôvodného maxima (deň po termíne tím získa 3/4 bodov, dva dni po termíne 1/2, atď.) 

 Neskoršie odovzdanie nie je možné. Neodovzdanie niektorej časti projektu znamená nesplnenie podmienok absolvovania predmetu.
 
 
## Kontrolná fáza progresu implementácie
V kontrolnej fáze - v 9. týždni - sa očakáva implementovaná klientská časť aplikácie. Fáza je hodnotená 4 bodmi, a to binárne. Tím letmo predvedú cvičiacemu funkčnosť klientskej aplikácie s ohľadom na požadované prípady použitia. Ak aplikácia umožňuje realizovať všetky prípady použitia, každý študent z tímu získa 4 body.
* **Kontrolný bod: 9. týždeň, na cvičení - 15.11. a 16.11, binárne hodnotenie 0/4 body**  implementácia klientskej časti eshopu so zostavením na serveri (server-side rendering) s využitím PHP rámca (odporúčaný Laravel) - so všetkými funkciami podľa požiadaviek v stave na predvedenie


## Implementačné prostredie
Odporúčané technológie:
* Klientská časť: PHP - Laravel rámec
* Aministrátorská časť: Laravel rámec
* PostgreSQL relačný databázový systém

Použitie iných technológií, napr. iný PHP rámec alebo relačný databázový systém je podmienené súhlasom cvičiaceho.


## Dokumentácia
Dokumentácia musí obsahovať minimálne tieto časti:
* zadanie
* diagram fyzického dátového modelu, v prípade zmien z 2. fázy, zdôvodniť zmenu (pozor - nie diagram logikého modelu z 2. fázy) 
* návrhové rozhodnutia (pridanie externej knižnice - zdôvodenie, rolu sme riešili takto, nepoužili sme oprávnenia, lebo...)
* prog. prostredie (ak iné, ako odporúčané)
* strunčný opis implementácie vybraných prípadov použitia (zmena množstva pre daný produkt, prihlásenie, vyhľadávanie, pridanie produktu do košíka, stránkovanie, základné filtrovanie)
* snímky obrazoviek (angl. screenshot, snapshot) - detail produktu, prihlásenie, homepage, nákupný košík s vloženým produktom 


## Spôsob hodnotenia
### 2. fáza (18 bodov)
- šablóny vytvorené pre všetky požadované prípady použitia - 5b
- responzívny dizajn - 5b
- správne použitie HTML5 elementov - 4b
- formátovanie a logická štruktúra zdrojového kódu,
konzistencia/jednotná konvencia pri názvosloví identifikátorov - 2b
- logický dátový model - 2b

### 3. fáza
#### Klientská časť - 14 bodov
* zoznam produktov - 2 body
  * filter
  * preusporiadanie /order/
  * stránkovanie
* detail produktu - 2 body
  * pridanie/odobratie z košíka
* plnotextové vyhľadávanie nad katalógom produktov - 2 body
* košík - 4 body
  * zoznam produktov
  * zmena množstva
  * odobratie
  * doprava/platba
  * údaje (s validáciou)
* prenositeľnosť košíka - 3 body  
* zákazník - 1 bod
  * registrácia, prihlásenie, odhlásenie

#### admin časť - 7 bodov
* prihlásenie/odhlásenie (prihlásiť sa môžu používatelia s rolou ADMIN) - 1 bod
* zoznam produktov - 1 bod
* pridanie produktu - 2 body
   * s nahrávaním obrázkov
   * aspoň jeden číselník (viem si zo select-u vybrať napr. farbu)
* odobratie produktu - 1 bod
   * fyzické vymazanie obrázku
* úprava produktu - 2 body
   * s nahrávaním obrázkov
   * zoznam obrázkov s možnosťou odobratia obrázku

#### dokumentácia - 4 body
* zadanie
* diagram fyzického dátového modelu, v prípade zmien z 2. fázy, zdôvodniť zmenu (pozor - nie diagram logikého modelu z 2. fázy) - 1 bod
* návrhové rozhodnutia (pridanie externej knižnice - zdôvodenie, rolu sme riešili takto, nepoužili sme oprávnenia, lebo...) - 1 bod
* uviesť prog. prostredie (ak iné, ako odporúčané)
* strunčný opis implementácie vybraných prípadov použitia (zmena množstva pre daný produkt, prihlásenie, vyhľadávanie, pridanie produktu do košíka, stránkovanie, základné filtrovanie) - 2 body
* snímky obrazoviek (angl. screenshot, snapshot) - detail produktu, prihlásenie, homepage, nákupný košík s vloženým produktom d


**Každý študent musí vedieť vysvetliť ktorúkoľvek časť (kód) riešenia svojho tímu.**