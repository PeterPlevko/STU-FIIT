
# Cvičenie 9 - JavaScript

## Príklady na precvičenie

### Príklad 1

Vyskúšajte si prebublanie udalostí. Otvorte si konzolu a sledujte preblubanie. Keď napr. kliknete na element **three**, prebublanie aktivuje *onclick* obsluhu aj na elementoch *two* a *one*. 
```html
<div class=”one”>
  ONE
  <div class=”two”>
    TWO
    <div class=”three”>
      THREE
    </div>
  </div>
</div>
```
```js
const divs = document.querySelectorAll('div');  
function logClassName(event) {
   console.log(this.classList.value);
}
divs.forEach(div => div.addEventListener('click', logClassName));
````

Vyskúšajte si tiež delegovanie udalosti prebublaním, ktoré ilustruje nasledujúci príklad. Uvedomte si, že listener registrujeme na ``#parent-list`` a nie na každú z položiek zoznamu.

```html 
<ul id="parent-list">
	<li id="item-1">Item 1</li>
	<li id="item-2">Item 2</li>
	<ul id="child-list">
	    <li id="item-2-1">Item 2-1</li>
	    <li id="item-2-2">Item 2-2</li>
	    <li id="item-2-3">Item 2-3</li>
	</ul>
	<li id="item-3">Item 3</li>
</ul>
```

```js
document.querySelector("#parent-list").addEventListener("click", function(e) {
    if(e.target && e.target.nodeName == "LI") {
        console.log("List item ", e.target.id, " was clicked!");
    }  
});
```

### Príklad 2

V **Jednoduchom manažéri úloh** prerobte vymazanie úlohy tak, že použijete Fetch API. V zozname úloh po kliknutí na tlačidlo [Vymazať] sa vymaže daná úloha - vykoná sa `TaskController@destroy`. 

V prípade úspešnej akcie, vymazanie záznamu sa prejaví aj priamo v DOM, a teda dynamicky odoberiete HTML element reprezentujúci danú úlohu (použite JS DOM API, metódu `removeChild`). 

### Príklad 3
Prerobte tieto ES6 moduly do modulov vo formáte AMD (zavádzač RequireJS), a tiež CommonJS (zavádzač SystemJS)

```js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
  
//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```


### Príklad 4

```html
<!doctype html>
<html lang="sk">
 
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title></title>

  <link rel="stylesheet" href="css/main.css">
  <link rel="icon" href="images/favicon.png">
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
</head>
 
<body>
<div id="vue-app">
    <h1>{{ heading }}</h1>
	<p>
		{{ message }}
	</p>
	<button v-on:click="buttonClick()">Klikni na mna</button>
	Klikli ste {{ clickCounter }}-krat.
</div>
 
<script>
var app = new Vue({
  el: '#vue-app',
  data: {
    heading: 'Pocitadlo kliknuti',
    message: 'Tento komponent zobrazuje pocet kliknuti na tlacidlo',
    clickCounter: 0
  },
  methods: {
      buttonClick: function() {
          this.clickCounter++;
      }
  }
});
</script>
</body>
 
</html>
```


### Príklad 5
Vyskúšajte si príklad s jednoduchou indexovanou DB (IndexedDB). 

Z prednášky si pripomeňte obsluhu `onblocked` a `onversionchange`. V novej karte na rovnakej doméne  (same origin) nasimulujte vytvorenie novej verzie databázy a ošetrite predmetnú obsluhu - v pôvodnej karte sa uzatvorí spojenie, v novej karte sa zmení schéma pôvodnej databázy (napr., pridajte tím, v ktorom daný jazdec F1 pôsobí).

```js
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  
// open (or create) the database
var open = indexedDB.open("MyDatabase", 1);
  
// create the database schema
open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};
 
open.onsuccess = function() {
    // a new transaction
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("NameIndex");
  
    // add some data
    store.put({id: 12345, name: {first: "Fernando", last: "Alonso"}, age: 36});
    store.put({id: 67890, name: {first: "Lewis", last: "Hamilton"}, age: 33});
         
    // query the data
    var getFernando = store.get(12345);
    // via index
    var getLewis = index.get(["Alonso", "Fernando"]);
  
    getFernando.onsuccess = function() {
        console.log(getJohn.result.name.first);  // "Fernando"
    };
  
    getLewis.onsuccess = function() {
        console.log(getBob.result.name.first);   // "Lewis"
    };
  
    // close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}
```