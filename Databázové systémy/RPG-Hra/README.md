# Logický model
![Logický model](https://github.com/PeterPlevko/STU-FIIT/blob/main/Datab%C3%A1zov%C3%A9%20syst%C3%A9my/RPG-Hra/LogickyModel.png)

# Fyzicky model
![Fyzický model](https://github.com/PeterPlevko/STU-FIIT/blob/main/Datab%C3%A1zov%C3%A9%20syst%C3%A9my/RPG-Hra/FyzickyModel.png)

# Úvod do hry

Hra je žánru RPG. Hráči našej hry si môžu vytvárať postavy, ktoré sú určitého typu - teda triedy. Každá trieda má schopnosti, ktoré môže využívať pre súboj s nepriateľmi. Nepriateľmi môžu byť monštrá, alebo iní hráči, ktorí nie sú súčasťou hráčovho tímu.
Monštrá sú v hre reprezentované ako inštancie určitého typu monštra. každý typ monštra má svoj level a svoje schopnosti, ktoré môže používať. Niektoré typy monštra sa objavia hráčovi len ak už zabil iný typ monštra, alebo splnil nejakú úlohu. Tieto podmienky sú obsiahnuté v tabuľke Monster_class.
Herná mapa je reprezentovaná lokáciami (dungeon-mi), ktoré majú svoj level - hráč nie je schopný vstúpiť na lokáciu, pokiaľ nedosiahol určitý level. V lokácii sa môžu objavovať nepriatelia minimálne rovnakej úrovne, nanajvýš o pár levelov skúsenejší, než je level lokácie.
S každou lokáciou sú spojené určité úlohy, ktoré môže postava plniť, a za ktoré dostáva určitý počet bodov skúseností, prípadne určitý premet, ktorý jej pomôže v boji s nepriateľmi.


# Popis tabuliek

Funkčnosť týchto atribútov sa naprieč tabuľkami nemení, nebudú vždy v popise tabuľky uvádzané.

- created_at - určuje kedy bol záznam vytvorený
- updated_at - určuje kedy bol záznam zmenený
- id - slúži ako unikátny identifikátor

## Tabuľka Player:  

Táto tabuľka reprezentuje nášho hráča a jej atribútmi sú:

- user_name - používateľské meno hráča.
- registration_type - udáva akým spôsobom sa náš hráč registroval.
- sex – špecifikuje pohlavie hráča.

Na tabuľku ukazuje tabuľka Characters a jej atribút Id_player - teda ktoré postavy patria ku hráčovi. 
Je dôležité si pamätať údaje o každom hráčovi. Dôležitými údajmi sú jeho hráčske meno, jeho pohlavie a typ jeho registrácie.

## Tabuľka Team: 

Táto tabuľka slúži na reprezentáciu tímov v našej hre, má v sebe atribúty:
- name - obsahuje názov tímu
- members_num - obsahuje počet členov tímu

Tabuľka využíva tabuľku Player_teams na vyhľadanie členov daného tímu, nakoľko každý hráč môže mať viacero tímov a každý tím má viacero hráčov.
Hra obsahuje rôzne tímy. Každý tým ma svoj názov a počet členov. Do tímu sa človek môže dostáť len cez pozvánku. Samozrejme každý tím sa potrebuje aj nejako dorozumievať a na to slúži tímový chat.

## Tabuľka Team_chat:

Tato tabuľka slúži na reprezentáciu posielania sprav v rámci tímu a má v sebe atribúty :

- id_team_to - uchováva id teamu do ktorého chceme poslať správu.
- id_player_from - uchováva id hráča ktorý správu napísal.
- message - obsahuje poslanú správu.

Id_player_from ukazuje na tabuľku Player a na jej atribút id - teda umožňuje zistiť, od akého hráča správa prišla.
Id_team_to ukazuje na tabuľku Team a na jej atribút id - teda umožňuje zistiť, pre aký tím je správa mienená

Aká by to bola hra keby si hráči nemohli posielať správy. Na to aby sme mohli poslať správu potrebujeme tri doležíte údaje. Prvým dôležitým údajom je id hráča ktorý posiela správu, id tímu, pre ktorý je táto správa určená a v neposlednom rade samotná sprava, ktorá má však obmedzenú dĺžku - 100 znakov/ správu. 


## Tabuľka Team_invites: 

Táto tabuľka slúži na reprezentáciu pozvánok do tímu. Jej atribútmi sú:

- id_player_to - id hráča ktorému chceme pozvánku poslať.
- id_player_from - id hráča ktorý túto konkrétnu pozvánku poslal.
- id_team - id teamu do ktorého chceme hráča pozvať.
- accepted - ukazuje či daná pozvánka bola prijatá alebo bola zamietnutá.
- answered_at - určuje kedy používateľ na pozvánku zareagoval.

Id_player_to ukazuje na tabuľku Player a jej atribút id - teda pre akého hráča je pozvánka myslená. Id_player_from ukazuje na tabuľku Player a jej atribút id - teda kto pozvánku poslal. 
Id_team reprezentuje, do akého tímu je konkrétna pozvánka.
Hráč si vyberie iného hráča, ktorému chce poslať pozvánku do tímu a následne ju pošle. Avšak hráč túto pozvánku môže neprijať - atribút accepted. 

## Tabuľka Friendship_invites:

Táto tabuľka slúži na reprezentáciu pozvánok do priateľstva. Jej atribútmi sú:

- id_player_to - id hráča ktorému chceme pozvánku poslať.
- id_player_from - id hráča ktorý túto konkrétnu pozvánku poslal.
- accepted - ukazuje či daná pozvánka bola prijatá alebo bola zamietnutá.
- answered_at - určuje kedy používateľ na pozvánku zareagoval.

Id_player_to ukazuje na tabuľku Player a jej atribút id - teda pre akého hráča je pozvánka myslená. Id_player_from ukazuje na tabuľku Player a jej atribút id - teda kto pozvánku poslal. 
Hráč si vyberie hráča ktorému chce poslať pozvánku a následne mu ju pošle. Avšak ak užívateľ tuto pozvánku neprijme nestanú sa priateľmi (atribút accepted). 

## Tabuľka Player_chat:

Tato tabuľka slúži na reprezentáciu posielania sprav a má v sebe atribúty :

- id_player_to - uchováva id hráča, ktorému chceme poslať správu
- id_player_from - uchováva id hráča ktorý správu napísal
- message - obsahuje poslanú správu

Id_player_from ukazuje na tabuľku Player a na jej atribút id - teda umožňuje zistiť, od akého hráča správa prišla.
Id_player_to ukazuje na tabuľku Player a na jej atribút id - teda umožňuje zistiť, pre ktorého hráča je správa určená.
Aká by to bola hra keby si hráči nemohli posielať správy. Na to aby sme mohli poslať správu potrebujeme tri doležíte údaje. Prvým dôležitým údajom je id hráča ktorý posiela správu, id hráča, pre ktorého je táto správa určená a v neposlednom rade samotná sprava, ktorá má však obmedzenú dĺžku - 100 znakov/ správu. Hráči si môžu posielať správy aj keď nie sú priateľmi.

## Tabuľka Player_teams: 

Tato tabuľka slúži na uloženie si, ktorí hráči sú v danom tíme. Jej atribútmi sú:
- id_player - id hráča, ktorý sa nachádza v tomto tíme
- id_team - id teamu, v ktorom sa hráč nachádza
- member - slúži na soft delete záznamu, drží informáciu o tom, či je hráč stále členom tímu

Atribút Id_player ukazuje na tabuľku Player a jej atribút id.
Dôvodom vzniku tejto tabuľky je to, že si potrebujeme pamätať ktorý hráč sa nachádza v ktorých tímoch, nakoľko medzi hráčmi a tímami je many-to-many vzťah.

## Tabuľka User_blocks:  

Tato tabuľka slúži na zapamätanie si hráčov ktorých si hráč zablokoval. Jej atribútmi sú:
- id_player – id hráča
- id_blocked – id zablokovaného hráča

Občas sa môže stať, že niektorí hráči si povedia, že nám budú sťažovať život a budú nám neustále posielať žiadosti o priateľstvo, do tímu, alebo len obyčajné správy. Aby sme takémuto spamovaniu zabránili, vieme si takéhoto otravného používateľa zablokovať - to znamená, že už od neho nebudeme dostávať nijaké žiadosti.

## Tabuľka User_credentials:  

Táto tabuľka slúži na uchovanie si informácii o užívateľovi jej atribútmi sú:

- player_id – id hráča
- pwd_hash - uchováva heslo hráča ako hash
- registration_type – uchováva, cez čo sa náš užívateľ registroval napr. (Google, Facebook)
- external_id – používa sa na odkazovanie na id z externého systému
- email – uchováva email užívateľa
- confirmed – ukazuje, či bola registrácia schválená

Na to, aby sa nejaký hráč mohol pripojiť do našej hry a hrať, je potrebné, aby sa registroval. Registrácia prebieha veľmi jednoducho - užívateľ si vyberie cez čo sa chce registrovať, ci už to bude Facebook, Gmail alebo sa chce registrovať priamo prostredníctvom hry. Následne vyplní heslo s ktorým sa chce prihlasovať a ktoré slúži na ochranu jeho účtu. Následne zadá meno pod ktorým sa chce registrovať a už má hotovo. Dôležíte je, aby sme si takéto údaje o užívateľovi dobre odložili a patrične ich aj chránili, pretože sú to citlivé informácie.

## Tabuľka User_friends:

Táto tabuľka vytvára takzvaný friends list - to znamená,  že vďaka tejto tabuľke vieme, aký hráč má akého v priateľoch. Jej atribúty sú:

- id_player – id hráča ktorý je pravé zvolený.
- id_friend – id hráča ktorý je náš priateľ.

Friends list je veľmi dôležitý v hocijakej hre pre viacerých hráčov. Podporuje nadviazanie vzťahov v rámci hry, čo vedie k tomu, že si ju hráči viac užívajú a teda do nej investujú viac svojho času.

## Tabuľka Character:

-  id_player bigint   - odkaz na hráča, ktorému postava patrí
-  id_coordinates - odkaz na súradnice postavy v danej lokácii
-  id_class  - odkaz na triedu, druh postavy 
-  level  - level postavy
-  name - názov postavy (slúži na to, aby sa všetky hráčove postavy nemuseli volať rovnako)
-  attack - útočné číslo postavy
-  defense - obranné číslo postavy
-  health - život postavy, teda akú veľkosť zranenia vydrží pred tým, ako umrie
-  experience - body skúsenosti postavy

Tabuľka reprezentuje jednotlivé inštancie postáv. Každá postava má práve jednu triedu - class-u a level, na základe ktorých má nejaké základné atribúty, teda útok, obranu, životy a podobne. Nakoľko je však každá reálnou postava inštanciou, uchováva si svoje aktuálne parametre života, obrany, útoku. Tieto môžu byť modifikované buď ako dôsledok nejakého súboju, schopností, alebo ako dôsledok toho, že postava používa určitý predmet. 

## Tabuľka Character_stats:

- character_id - postava, ktorej záznam patrí
- character_class - odkaz na triedu postáv
- monster_class - odkaz na triedu monštier
- died - koľkokrát postava zomrela v súboji s týmto typom postavy/ monštra
- killed  - koľkokrát postava vyhrala v súboji s týmto typom postavy/ monštra

Tabuľka umožňuje zobraziť koľko monštier/hráčov daného typu postava zabila, alebo koľkokrát počas súboja s nimi prehrala - teda zomrela.

## Tabuľka Class: 

- name - názov triedy

Tabuľka reprezentuje druhy postáv z ktorých si môže hráč pri vytváraní postavy vybrať. Týmito triedami môže byť napríklad ranger, paladin, ... . Jednotlivé triedy majú vlastný strom schopností, majú rôzne hodnoty základných atribút (útok, obranu, životy), ktoré sa taktiež na základe levelu postavy menia rôznym spôsobom.

## Tabuľka Class_level:
 
-  level - úroveň triedy, určuje atribúty pre danú triedu na danom leveli
-  experience_required - množstvo skúseností potrebných na prejdenie na ďalšiu úroveň
-  attack - útočné číslo triedy na danom leveli
-  defense - obranné číslo triedy na danom leveli
-  health - život  triedy na danom leveli, teda akú veľkosť zranenia vydrží pred tým, ako umrie

Tabuľka reprezentuje atribúty triedy pre daný level - umožňuje dohľadať základné atribúty postavy, nakoľko rôznym typom postáv sa atribúty na základe levelu menia rôznym spôsobom.  

## Tabuľka Skills:

-  skill_name - názov schopnosti
-  skill_class - odkaz na triedu, ktorej patrí daná schopnosť
-  required_skill - schopnosť potrebná pre odomknutie tejto schopnosti
-  description - opis schopnosti
-  damage_modifier - veľkosť škody ktorú môže schopnosť napáchať, je ovplyvnená útočným číslom postavy/monštra, ktoré ju použije
-  defense_modifier - schopnosť môže zvýšiť obranné číslo entity, ktorá ju použije
-  health_modifier - schopnosť môže zvýšiť život entity, ktorá ju použije

Tabuľka uchováva informácie o schopnostiach, ktoré sa v hre nachádzajú. Každá schopnosť je daná názvom, a každá trieda má vlastnú množinu schopností. Schopnosť má nejaký popis, modifikátor útoku - teda koľko života odoberie monštru v závislosti od útočného čísla postavy, modifikátor obrany - teda schopnosť môže byť použitá na hráča a zvýšiť mu obranné číslo, alebo health_modifier - teda nejaký spôsob získania späť strateného života.
Aby postava získala schopnosť, je nutné aby bola danej triedy a s daným levelom. Schopnosť však môže požadovať znalosť inej schopnosti, preto je nutné aby tabuľka odkazovala aj na samú seba, teda pre schopnosť môže byť daný záznam inej schopnosti, ktorú je nutné poznať pred získaním tejto schopnosti.

## Tabuľka Character_skills:

-  id_skill -  odkaz na záznam schopnosti v tabuľke
-  id_character - odkaz na postavu, ovládajúcu danú schopnosť

Pomocná tabuľka slúžiaca pre uchovávanie záznamu o tom, či postava ovláda danú schopnosť, alebo nie.

## Tabuľka Item: 

 - id_coordinates - odkaz na súradnice na mape, kde sa môže predmet nachádzať
-  id_character - odkaz na postavu využívajúcu daný premet
-  id_monster - odkaz na príšeru nosiacu daný premet
-  item_class - druh predmetu, ovplyvňuje ako predmet mení atribúty svojho používateľa
-  is_equipped - či je daný predmet používaný

V hre existujú predmety, ktoré môžu postavy využívať na zlepšenie svojich atribútov. Predmet je inštanciou druhu predmetu, ktorý opisuje, akým spôsobom predmet modifikuje atribúty postavy, ktorá ho používa. Predmet môže byť používaný alebo nepoužívaný.

## Tabuľka Item_class:
-  class_name - názov typu predmetu
-  attack_modifier - ako predmet ovplyvňuje útočné číslo nositeľa
-  defense_modifier - ako predmet ovplyvňuje obranné číslo nositeľa
-  health_modifier- ako predmet ovplyvňuje počet životov nositeľa

Druh predmetu určuje, akým spôsobom inštancie daného predmetu modifikujú atribúty postavy, ktorá ho používa. taktiež je prostredníctvom druhu predmetu možné zistiť, ktoré typy monštier ho môžu po zabití dať postave.
  
## Tabuľka Quest:

-  quest_name - názov úlohy
-  id_location - odkaz na lokáciu, kde sa úloha nachádza
-  item_reward - odkaz na druh predmetu, ktorý môže byť odmenou za splnenie úlohy
-  required_level - úroveň potrebná pre začatie úlohy
-  experience - počet skúseností, ktoré postava po splnení úlohy dostane
-  monster_class - druh monštra, ktoré je potrebné zabíjať pre splnenie úlohy
-  monster_num - počet monštier ktoré treba zabiť pre splnenie úlohy

Hra obsahuje rôzne úlohy, ktoré môže každá postava plniť. Úloha sa viaže na určitú lokáciu. Pre splnenie úlohy je potrebné zabiť určité množstvo monštier daného typu (triedy). Za splnenie úlohy dostane hráč určitý počet bodov skúseností, prípadne aj nejaký predmet. Úloha taktiež môže odomknúť monštrá, ktoré doteraz neboli dostupné.
Odomknutie úlohy môže byť viazané na určitý level postavy. 

## Tabuľka Character_quests:

- quest_name  - názov úlohy
- id_character - id hráča
- finished - informácia, či hráč úlohu dokončil
- finished_at - kedy bola daná úloha splnená
- acquired_at - kedy bola daná úloha obdržaná

Tabuľka slúži na uchovávanie informácii o tom, či daná postava splnila úlohu alebo nie.

## Tabuľka Location:

-  location_name - názov lokácie
-  required_level - úroveň, ktorú musí hráč dosiahnuť na vstup  do lokácie
-  width - šírka lokácie (počet x- súradníc)
-  height - výška lokácie (počet y- súradníc)
- encounter_chance - šanca, že pri prechádzaní medzi súradnicami postava narazí na príšeru

Hra je delená na jednotlivé lokácie - dungeon-y. Na každej lokácii sa môžu objavovať monštrá určitého typu, teda monštrá, ktorých level je okolo levelu lokácie. Každá lokácia je daná množinou dvojíc x,y - teda množinou súradníc.

## Tabuľka Coordinates: 

 - id_location - odkaz na lokáciu, na ktorú sa súradnice viažu
 - pos_x - x-ová súradnica
-  pos_y  - y-ová ssúradnica

Tabuľka reprezentuje množinu dvojíc x,y, ktoré sa viažu na danú lokáciu. Na danej súradnici sa môže nachádzať postava, príšera, alebo predmet.

## Tabuľka Monster: 

-  id_coordinates - odkaz na súradnice konkrétnej príšery
-  monster_class - odkaz na typ príšery
-  attack - útočné číslo monštra
-  defense - obranné číslo monštra
-  health - život monštra, teda akú veľkosť zranenia vydrží pred tým, ako umrie
  
Monštrum predstavuje konkrétnu inštanciu nepriateľa, s ktorou môže postava zápasiť. Každé monštrum je určitého typu, a  nachádza sa na súradniciach. Má základné atribúty - útok, obranu a počet životov. Tieto atribúty však nie sú modifikovateľné inak, ako počas súboja.

## Tabuľka Monster_class:

-  class_name - názov typu monštra
 - level - úroveň typu monštra
-  required_monster - typ monštra, ktoré je potrebné zabiť pre odomknutie tohto typu monštra
-  required_quest - odkaz na úlohu, ktorú je potrebné splniť pre odomknutie tohto typu monštra
-  item_drop - odkaz na typ predmetu, ktorý môže postava získať ako odmenu za zabitie daného typu monštra 
-  drop_chance - pravdepodobnosť, že monštrum obsahuje predmet 
-  experience - počet bodov skúseností, ktoré postava získa za zabitie monštra
-  attack - útočné číslo typu monštra 
-  defense - obranné číslo typu monštra
-  health - život typu monštra 

Reprezentuje typ monštra. Každý typ monštra má základné atribúty ako útok, obranu a počet životov. Monštrum daného typu sa môže s určitou pravdepodobnosťou vytvoriť s predmetom, ktorý postava po jeho zabití môže získať. Každý typ príšery môže "dropovať" práve jeden typ predmetu, avšak predmet jedného typu môže byť "dropnutý" pri zabití viacerých druhov monštier.  
Ako už bolo spomenuté, určitý druh monštra môže byť odomknutý až po ukončení nejakej úlohy. Taktiež však môže byť príšera odomknutá až po zabití iného druhu príšery.

## Tabuľka Monster_skills:

-  skill_name - odkaz na schopnosti ktoré má daný typ monštra
-  monster_class - názov typu monštra
-  description - opis schopnosti
-  damage_modifier - veľkosť škody ktorú môže schopnosť napáchať
-  defense_modifier - schopnosť môže zvýšiť obranné číslo entity, ktorá ju použije
-  health_modifier - schopnosť môže zvýšiť život entity, ktorá ju použije

Tabuľka slúži pre párovanie monštier s ich schopnosťami. 

## Tabuľka Battle: 

-  character_id - odkaz na postavu, s ktorou sa súboj viaže
-  monster_id - odkaz na monštrum, s ktorým sa súboj viaže
-  character_starting_health - život postavy na začiatku súboja
-  monster_starting_health - život monštra na začiatku súboja
-  character_damage_done - koľko života ubrala postava monštru
-  monster_damage_done- koľko života ubralo monštrum postave
-  character_remaining_health- život postavy na konci súboja
-  monster_remaining_healt - život monštra na konci súboja
-  experience - koľko skúseností získala postava výhrou súboju
  
Tabuľka slúži na uchovávanie informácií o strete medzi jednou postavou a jedným monštrom. Uchováva ich počiatočné atribúty, a ich atribúty po konci súboja. Tabuľka taktiež odkazuje na záznamy v tabuľke Battle_skills, ktorá uchováva schopnosti, ktoré postava alebo monštrum počas súboja použila.
Medzi príšerou a postavou môže nastať niekoľko súbojov, preto je nutné jednotlivé strety odlišovať unikátnym identifikátorom. Súboj taktiež uchováva informáciu o tom, koľko skúseností ním postava získa - toto nie je nutné nakoľko je možné túto informáciu získať pomocou odkazu na zabité monštrum, avšak umožňuje to rozšírenie hry. Napríklad, je možné prideľovať viac skúseností podľa toho, koľko unikátnych schopností postava použila počas súboja.

## Tabuľka Battle_skills: 

-  character_skill - schopnosť použitá postavou
-  monster_skill - schopnosť použitá monštrom
-  damage_done - škoda napáchaná danou schopnosťou

Tabuľka uchováva informácie o tom kto, a aké schopnosti v akom poradí použil počas daného súboja.

# Use case-y


## Zaslanie pozvánky do tímu:
Pozvánka do tímu je vždy od jedného hráča pre druhého, viaže sa na jeden tím.

Hráč s id=15 posiela pozvánku hráčovi s id=1 do tímu s id=20:

Vytvorenie pozvánky:

    INSERT INTO Team_invites(id_player_to, id_player_from, id_team, created_at)
    VALUES(1, 15, 20, CURRENT_TIMESTAMP)
    
Zobrazenie pozvánok pre hráča s id=1:

    SELECT team_name 
    FROM Player
    JOIN Team_invites
    ON player_to=1
    JOIN TEAM
    ON team.id=id_team


## Zobrazenie členov tímu:
Pri hocijakej hre, kde existujú tímy, základnou požiadavkou je vedieť zobraziť členov tímu, alebo zobraziť tímy, ktorých členom je hráč

Zobrazenie členov tímu "Spolok paladinov" 

    SELECT user_name 
    FROM Team
    JOIN Player_teams ON Player_teams.id_team=Team.id
    JOIN Player ON Player.id=Player_teams.id_player
    WHERE Team.name='Spolok paladinov'


## Vstup do lokácie

Ako prvé sa preverí, či postava má dostatočný level na to, aby do lokácie vstúpila. Ak áno, je jej povolený vstup do lokácie. Následne sú jej pridelené všetky úlohy, ktoré sa s lokáciou viažu.

## Zobrazovanie príšer

Pri každom prechode medzi súradnicami je možnosť, že hráč narazí na monštrum. Databáza vyberie level aktuálnej lokácie, následne z tabuľky monster_class vyberie všetky monštrá s levelom okolo  levelu lokácie. To, či sa monštrum môže zobraziť je preverované pomocou tabuliek Character_stats - teda sa preverí, či hráč zabil monštrum predchádzajúce danému monštru v hierarchii (Monster_class môže mať atribút required_monster, ktorý uchováva id monštra, ktoré ho v hierarchii predchádza. Stačí nájsť toto id v tabuľke Character_stats), alebo pomocou tabuľky Character_quests - teda sa preverí, či hráč splnil úlohu odomykajúcu toto monštrum (Monster_class odkazuje na id úlohy, ktorá ho odomyká, stačí nájsť, či je pri tomto id v tabuľke Character_quests atribút finished=TRUE).
V lokácii existujú isté súradnice na ktorých sa monštrá nachádzajú vždy. Toto je však skôr vecou aplikačnej logiky.

## Súboj:
Súboj prebieha medzi jednou postavou a jedným monštrom v kolách - postava použije schopnosť, príšera použije schopnosť, Na začiatku si postava (povedzme, že postava má ID 8) načíta všetky svoje schopnosti - 

    SELECT skill_name, damage_modifier, defense_modifier, health_modifier
    FROM Character_skills 
    JOIN Skills 
    ON Character_skills.id_skill=Skills.id
    WHERE Character_skills.id_character=8
    
Výsledky dopytu sa zobrazia hráčovi, ktorý si môže vybrať, ktorý použije.

Výber schopnosti príšery s ID 59:

    SELECT skill_name, damage_modifier, defense_modifier, health_modifier
    FROM Monster_skills
    JOIN Monster_class 
    ON Monster_class.id=Monster_skills.monster_class

# Fyzický model bol zostrojený v

https://dbdiagram.io/

# Logický model bol zostrojený v

https://app.diagrams.net/

# Autori:

Peter Plevko
Dušan Podmanický
