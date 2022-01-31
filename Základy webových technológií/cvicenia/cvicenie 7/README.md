# Cvičenie 7 - Laravel technológie

## Príklady na precvičenie

### Príklad 1 - Prerobenie aplikácie *Jednoduchý manažér úloh*
Vašou úlohou je pridať do aplikácie z predošlého cvičenia [Jednoduchý manažér úloh](/cvicenia/6-c/manazer-uloh) ďaľšiu funkcionalitu. Príklad je zameraný na precvičenie si odprednášaných Laravel technológií.
 
* Pridajte do aplikácie registráciu, prihlasovanie, a autorizáciu - rolu používateľa.
   * Úlohy v manažéri budú zdieľané, a teda všetci prihlásení používatelia uvidia v zozname úloh všetky úlohy. V zozname úloh pribudne stĺpec *Autor*, v ktorom bude meno používateľa, ktorý úlohu vytvoril. 
   * Upravte aplikáciu tak, že na jej použitie je potrebné byť prihlásený. Prihlásený používateľ vidí zoznam všetkých úloh. Oprávnený editovať a vymazať úlohu je iba jej vlastník (používateľ, ktorý ju vytvoril). Zobraziť detail úlohy môže každý používateľ.
   * Pre nastavenie role používateľa nie je potrebné vytvoriť rozhranie. Po registrácii má používateľ predvolene rolu *USER*. Zmenu roly zrealizujete (ručne) zmenou záznamu v DB. Ak má používateľ rolu *ADMINISTRATOR*, môže editovať, resp. vymazať ktorúkoľvek úlohu.  
   
* Pridajte cachovanie 
     * Cieľom je precvičiť si Cahovanie obsahu. Detail úlohy bude cachovaný. Keď si používateľ zobrazí detail úlohy, relevantný obsah je vybratý z DB a nacachovaný. Pri ďalšom zobrazení detailu je vybratý z cache (ak je platná). Cache je zneplatnená pri vymazaní a editovaní úlohy. Postačuje použiť základný driver `file`. Pre pokročilejších odporúčam *Redis*.

* Pridajte logovanie
    * Prihlásenie, (explicitné) odhlásenie používateľa; pridanie, vymazanie a editácia úlohy budú zalogované do súboru. Pokročilejším odporúčam vyskúšať si prepojenie logovania so Slackom. Zadefinujte si `slack` kanál v konfigurácii logovania, ako URL uveďte tzv. [*incoming webhook*](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks). 
    
* Pridajte lokalizáciu - vytvorte pre aplikáciu ďaľšiu jazykovú mutáciu, napr. angličtinu. 
    * Do vrchného panelu pridajte tlačidlo na prepínanie jazyka (SK | EN)
    * Vytvorte podporu zmeny jazyka a potrebný prekladový súbor (žiadna panika, aplikácia je veľmi jednoduchá, počet prekladových reťazcov je minimálny :-)).

* Upravte validáciu
    * Vytvorte validačnú logiku pri pridaní úlohy použitím tzv. *form request* triedy. Prekonajte pôvodné chybové správy validátora, a teda zadefinujte vlastné správy.

* Ošetrenie chýb - error handling
    * Vytvorte vlastnú výnimku - triedu `PermissionDeniedException`, ktorá bude vyvolaná v prípade, ak by chcel používateľ vykonať neautorizovanú akciu. Zadefinujte metódy `report()` a `render()`. Metóda `report()` zaloguje informáciu o neoprávnenom prístupe. Metóda `render()` transformuje výnimku na HTTP odpoveď s chybovou stránkou - kód 403. Pre danú výnimku vytvorte vlastnú chybovú stránku - šablónu.   

### Príklad 2 - Unit testing
 
V `app/` vytvorte jednoduchú triedu `ShoppingCart.php`. Pre metódy danej triedy vytvorte jednotkové testy.

```php
<?php
namespace App;

class ShoppingCart
{
    /**
    * @var array
    */
    protected $items = [];
  
    /**
    * Vytvorenie inštancie košíka s danými položkami
    *
    * @param array $items
    */
    public function __construct($items = [])
    {
        $this->items = $items;
    }
  
    /**
    * Kontrola, či je daná položka v košíku
    * http://php.net/manual/en/function.in-array.php
    *
    * @param string $item
    * @return bool
    */
    public function has($item)
    {
        return in_array($item, $this->items);
    }
  
    /**
    * Výber a odobratie položky z košíka, alebo null ak je košík prázdny
    * http://php.net/manual/en/function.array-shift.php
    *
    * @return string
    */
    public function takeOne()
    {
        return array_shift($this->items);
    }
  
    /**
    * Vráti všetky položky z košíka, ktoré začínajú na dané písmeno
    * http://php.net/manual/en/function.array-filter.php
    * http://php.net/manual/en/function.stripos.php
    * 
    * @param string $letter
    * @return array
    */
    public function startsWith($letter)
    {
        return array_filter($this->items, function ($item) use ($letter) {
            return stripos($item, $letter) === 0;
        });
    }
}
```

 