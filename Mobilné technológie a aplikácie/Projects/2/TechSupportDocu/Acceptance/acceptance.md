# **Akceptačné testy**
Adrián Ondov, Michal Minár

Akceptačné testy pre TechSupport aplikáciu [frontend](https://github.com/Mino21M/fiit-mtaa-app-front), [backend](https://github.com/Mino21M/fiit-mtaa-app-back) a [dokumentácia](https://github.com/Mino21M/fiit-mtaa-app-docu).

## **Frontend**

| 1. (Kladné) | Napísanie správy inému používateľovi |
|-------------|--------------------------------------------------|
| **Vstupné podmienky**: | Používateľ je prihlásený pod akýmkoľvek typom účtu v aplikácii a je pripojený na internet. |
| **Výstupné podmienky**: | V chatovacej histórii sa zobrazí nová správa a do databázy sa zapíše odoslaný obsah správy |
| **Postup**: | 1. Používateľ sa pomocou hlavného MENU prepne na zobrazenie správ. <br> 2. Po kliknutí sa zobrazí história používateľov s kým si prihlásený používateľ v minulosti písal. <br> 3. Používateľ klikne na meno používateľa, ktorému chce napísať správu. <br> 4. Zobrazí sa história správ medzi chceným používateľom a prihláseným používateľom. <br> 5. Používateľ zadá želanú správu a klikne na tlačidlo odoslať. <br> 6. Správa sa zobrazí v chatovacej histórii. |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 2. (Kladné) | Pridať nový príspevok do sekcie "Best practices" |
|-------------|--------------------------------------------------|
| **Vstupné podmienky**: | Používateľ je prihlásený pod používateľom s admin právami, je pripojený na internet a názov článku je jedinečný. |
| **Výstupné podmienky**: | Článok je úspešne uložený do databázy, používateľ je upozornený o úspechu a zobrazí sa mu finálna verzia článku. |
| **Postup**: | 1. Používateľ sa pomocou hlavného MENU prepne na Best practices. <br> 2. Zobrazí sa sumár aktuálnych best practices s tlačidlom "+". <br> 3. Používateľ klikne na tlačidlo. <br> 4. Po kliknutí sa zobrazí formulár na vyplnenie nového článku. <br> 5. Používateľ zadá požadované hodnoty a klikne na tlačidlo uloženia. <br> 6. Používateľ je presmerovaný na novo vytvorený článok. |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 3. (Kladné) | Položiť novú otázku do fóra |
|-------------|-----------------------------|
| **Vstupné podmienky**: | Používateľ je pripojený do internetu a prihlásený. |
| **Výstupné podmienky**: | Používateľovi je zobrazená hláška o úspešnom pridaní otázky do databázy, používateľ je automaticky presmerovaný na novo vytvorenú otázku. |
| **Postup**: | 1. Používateľ klikne na MENU a zvolí možnosť pridať novú otázku. <br> 2. Zobrazí sa mu formulár na vyplnenie požadovaných hodnôt s možnosťou pridať obrázok / video. <br> 3. Po vyplnení formuláru a stlačení tlačidla uloženia je používateľ automaticky presmerovaný na novo vytvorenú otázku. |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 4.(Záporné) | Úprava komentáru neprihláseným používateľom |
|--------------|---------------------------------------------|
| **Vstupné podmienky**: | Používateľ je pripojený do internetu, môže / nemusí byť prihlásený. |
| **Výstupné podmienky**: | Zobrazí sa hláška o nemožnosti editovať komentár cudzích používateľov. |
| **Postup**: | 1. Používateľ klikne na otázku na hlanvej obrazovke, na ktorom chce editovať komentár. <br> 2. Zobrazí sa požadovaná otázka. <br> 3. Používateľ klikne na komentár, ktorý chce upravovať. <br> 4. Zobrazí sa hláška o nutnosti prihlásenia a nemožnosti editovať komentár anonymným / neprihláseným používateľom, ktorá sa po 10 sekundách automaticky skryje. |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 5. (Záporné) | Vymazať článok bez prihlásenia |
|--------------|--------------------------------|
| **Vstupné podmienky**: | Používateľ je pripojený do internetu, nemusí byť prihlásený. |
| **Výstupné podmienky**: | Možnosť vymazať článok nie je umožnená. |
| **Postup**: | 1. Používateľ klikne v MENU na Best practices. <br> 2. Zobrazí sa prehľad Best practices. <br> 3. Používateľ klikne Best practise. <br> 4. Zobrazí sa požadovaný Best practise. <br> 5. V hornej časti obrazovky je zašednuté tlačidlo vymazania článku. <br> 6. Po kliknutí na opísané tlačidlo je používateľ upozornený na nutnosť prihlásenia pod admin účtom. |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

## **Backend**

| 1. (Kladné) | Získanie všetkých otázok a následný výber konkrétnej s načítaním komentárov |
|-------------|-----------------------------------------------------------------------------|
| **Vstupné podmienky**: | Prístup na internet. |
| **Výstupné podmienky**: | Vrátenie otázky s komentármi. |
| **Postup**: | 1. Request GET - Požiadavka na načítanie všetkých otázok. <br> 2. Reply [200] - Odpoveď so všetkými otázkami, bez komentárov a znenia samotnej otázky. **YAML**: REST API / questions.yaml > General > GET / <br> 3. Request GET - Požiadavka na vrátenie konkrétnej otázky. <br> 4. Reply [200] - Odpoveď s konkrétnou otázkou, komentármi a jej znením.  **YAML**: REST API / questions.yaml > General > GET /{question_id} |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 2. (Kladné) | Získanie histórie správ a následné prečítanie posledných správ prihláseného a žiadaného používateľa |
| ------------------------------------------------|---------------------|
| **Vstupné podmienky**: | Prihlasovacie údaje používateľa, prístup na internet, meno druhého používateľa. |
| **Výstupné podmienky**: | Zníženie počtu neprečítaných správ medzi autentifikovaným používateľom a žiadaným používateľom. |
| **Postup**: | 1. Request GET - Požiadavka na načítanie neprečítaných správ medzi používateľmi. <br> 2. Reply [200] - Vrátenie poslednej neprečítanej správy, celkového počtu neprečítaných správ, mena a ID používateľa. **YAML**: REST API / chat.yaml > General > GET / <br> 3. Request PUT - Požiadavka na označenie správ za prečítané. <br> 4. Reply [200] - Odpoveď s informovaním o úspechu. **YAML**: REST API / chat.yaml > General > PUT |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 3. (Kladné) | Získanie článku (Best practice) a načítanie zodpovedajúcich obrázkov |
| ------------------------------------------------|---------------------|
| **Vstupné podmienky**: | Prístup na internet. |
| **Výstupné podmienky**: | Vrátenie článku s obrázkami. |
| **Postup**: | 1. Request GET - Získanie všetkých aktuálnych článkov. <br> 2. Reply [200] - Vrátenie všetkých článkov bez hlavného časti článku (textu) a obrázkov. **YAML**: REST API / questions.yaml > GENERAL > GET / <br> 3. Request GET - Načítanie konkrétneho článku na základe predchádzajúcej odpovede. <br> 4. Reply [200] - Vrátenie celého článku vrátane textu a ID obrázkov, ktoré je možné načítať postupným dopytovaním sa na jednotlivé ID. **YAML**: REST API / questions.yaml > GENERAL > GET /{question_id} + REST API / questions.yaml > GENERAL > GET /{question_id}/assets/{asset_id} |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 4. (Záporné) | Získanie všetkých komentárov pre konkrétnu otázku s ich následným vymazaním neprihláseným používateľom |
|--------------|--------------------------------------------------------------------------------------------------------|
| **Vstupné podmienky**: | Prístup na internet. | 
| **Výstupné podmienky**: | Vrátenie chybovej hlášky 401 (Unauthorized).
| **Postup**: | 1. Request GET - Získanie všetkých otázok bez komentárov a znenia otázky. <br> 2. Reply [200] - Odpoveď so všetkými otázkami, bez komentárov a znenia samotnej otázky. **YAML**: REST API / questions.yaml > GENERAL > GET / <br> 3. Request GET - Získanie otázky so všetkými komentármi a jej znením. <br> 4. Reply [200] - Odpoveď s konkrétnou otázkou, komentármi a jej znením. **YAML**: REST API / questions.yaml > General > GET /{question_id} <br> 5. Request DELETE - Požiadavka na vymazanie komentára <br> 6. Reply [401] - Chybová hláška 401. **YAML**: REST API / questions.yaml > Comments > DELETE |
| **Výsledok**: | FAIL / PASS |

<div style="page-break-after: always;"></div>

| 5. (Záporné) | Vymazanie obrázku so zadaním nesprávneho ID otázky |
|--------------|----------------------------------------------------|
| **Vstupné podmienky**: | Prihlasovacie údaje privilegovaného používateľa, prístup na internet. |
| **Výstupné podmienky**: | Vrátenie chybovej hlášky 406 (Not Acceptable). |
| **Postup**: | 1. Request GET - Získanie všetkých otázok bez komentárov a znenia otázky.  <br> 2. Reply [200] - Odpoveď so všetkými otázkami, bez komentárov a znenia samotnej otázky. **YAML**: REST API / questions.yaml > GENERAL > GET / <br> 3. Request GET - Získanie otázky so všetkými komentármi, jej znením a ID príloh. <br> 4. Reply [200] - Odpoveď s konkrétnou otázkou, komentármi a jej znením. **YAML**: REST API / questions.yaml > General > GET /{question_id} <br> 5. Request DELETE - Odoslanie požiadavky obsahujúcu ID prílohy a nesprávnu hodnotu otázky. <br> 6. Reply [406] - Chybová hláška 406. **YAML**: REST API / questions.yaml > Assets > DELETE |
| **Výsledok**: | FAIL / PASS |
