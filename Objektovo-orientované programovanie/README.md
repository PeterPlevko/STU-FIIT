# Nazov projektu: Bezpecny informacny system 
# Meno: Peter Plevko ais id: 103097
# Opis projektu:
Moj program sluzi na komunikaciu medzi ucitelom a studentom v tomto stadiu este vsak nieje este uplne dokonceny.  

Co to robi: No moj program simuluje vymenu informacii to znamena ze ucitel a dalej jeho podclassy mozu studentovi posielat rozne udaje napriklad datum finalnej skusky, zapisat ci chodi nacvika alebo ohodnotia studenta. Student si dalej tieto informacie ktore mu boli poslane moze zobrazit a moze ucitelovi napisat spravu.
## Navod ako sa to spusta: shift+F10 a dalej mam intuitivne GUI

predpripravene ucty:

Students:

StudentDaily username: Jozef | password: 123

StudentDaily username: Martin | password: 456

StudentExtern username: Roman | password: 789

Teachers:

Trainer username: Monika | password: 123456

MainTrainer username: Rado | password: 1234567

Lecturer username: Matej | password: 12345678

MainLecturer username: Peter | password: 123456789

# polymorfizmus:  

Pouzivam ho v classe TimeTableEnvornmentTeacherController v metode sendTimetables do tejto metody mi pride premenna teacher ale ja neviem ci to bude lecturer mainlecturer apod preto vyuzivam polymorfizmus zavolam si teacher.setTimeTableGUI a podla toho aky mam instance sa tato metoda vykona ak som trainer vykona sa inac ako ked som maintrainer.

[parent](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/3f251c319417893c6fc14f238bf5d9e067907c65/Teachers/Teacher.java#L31-L33)

[child1](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/dc893e936afe9d6395cfe14780b18cf102c6a81e/Teachers/Lecturer.java#L61-L64)

[childofchild1](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/dc893e936afe9d6395cfe14780b18cf102c6a81e/Teachers/MainLecturer.java#L71-L73)

[child2](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/dc893e936afe9d6395cfe14780b18cf102c6a81e/Teachers/Trainer.java#L31-L34)

[childofchild2](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/dc893e936afe9d6395cfe14780b18cf102c6a81e/Teachers/MainTrainer.java#L31-L34)

# extends:  

Dedenie pouzivam pretoze teacher je moj zaklad lecturer vie viac a mainlecutrer este viac a kedze chcem aby kazde dieta vedelo to co rodic tak to pouzivam.

[lecturer extenduje teachera](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/b357f90408fa607cf0ec9628567120667306214a/Teachers/Lecturer.java#L10)

[mainlecturer extenduje lecturera](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/b357f90408fa607cf0ec9628567120667306214a/Teachers/MainLecturer.java#L11)

# agregacia:  

Agregacia je pouzitie triedy v triede kazdy student ma svoj vlastny rozvrh.

[agregacia](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/b357f90408fa607cf0ec9628567120667306214a/Students/Student.java#L23)

# pouzitie navrhovych vzorov:  

Dao pattern je oddelenie databazovej logiky od ostatnej logiky. Vyuzivam ho v login systeme tato trieda mi vykonava vsetky hladania a prihlasovania ostatne triedy ani nevedia ze sa da prihlasit.

[DAO](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/Login/LoginSystem.java#L12)  

Visitora pouzivam pretoze som si chcel vyskusat ako pridat funkcionalitu do programu bez toho aby som nejako velmi menil uz existujuce triedy natoto sluzi visitor prida funkcionalitu.

[visitor](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/Visitor/Visitor.java#L8)  

# ošetrenie mimoriadnych stavov prostredníctvom vlastných výnimiek:  

Tuto vynimku pouzivam v triede RegistrationSceneController v metode check password ak uzivatel zada heslo kratsie ako 5 znakov je mu tato vynimka vyhodena. 

[exception](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/GUI/RegistrationSceneController.java#L34-L59)  

# GUI: 

[GUI](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/GUI/MainGUI.java#L84-L98)  

Manualne som si vyskusal vyhodenie alert boxu

[GUI-MANUALNE](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/Data/GUIInvalidPasswordException.java#L14-L24)  

# explicitné použitie RTTI:  

RTTI pouzivam na prisposobenie grafickeho prostredia uzivatelovi, MainTrainerovi sa nacita viac moznosti respektive spristupni sa mu viac veci ktore moze vykonavat ako Trainerovi

[RTTI](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/GUI/TeacherEnvironmentController.java#L46-L50)  

# použitie vhniezdených tried a rozhraní:  

toto rozhranie sluzi na nejaku pseudokomunikaciu ucitela, respektive na vypisanie sprav

[rozhranie](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/Teachers/Interaction.java#L8-L13)  

# lambda:

Lambda vyraz pouzivam na vytiahnutie studenta s prislusnym menom a heslom z mojej databazy studentov.

# použitie lambda výrazov, referencií na metódy (method references) a/alebo implicitnej implementácie metód v rozhraniach (default method implementation):

[lambda](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/d60dddd6d965a8dde90146586375a85adbee9667/Login/LoginSystem.java#L19-L34)  

# serializacia: 

Aby si uzivatel mohol vyskusat co robi moj program aj bez toho aby sa registroval mam predpripravenych niekolko uctov.

[serializacia](https://github.com/OOP-FIIT/oop-2020-uto-16-c-kovacik-kuntox/blob/4550d1c356bb4a11b3fd734d46e7628b304c5207/GUI/MainGUI.java#L35-L76)  

# UML diagram:

![UML Diagram](https://github.com/PeterPlevko/STU-FIIT/blob/master/Objektovo-orientovan%C3%A9%20programovanie/Dokumentacia/UML%20Diagram.jpg)
