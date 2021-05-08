package project.model.databases;

import javafx.scene.image.Image;
import project.model.CustomImage;
import project.model.books.Book;
import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BooksDatabase {
    private List<Book> books;
    private LocalDate date;

    public BooksDatabase() throws IOException, ClassNotFoundException {
//        loadDemo();
        deserialize();
    }

    public List<Book> getBooks() {
        List<Book> returnList = new ArrayList<>();
        for(Book book: books){
            returnList.add((Book) book.clone());
        }
        return returnList;
    }

    public void setBooks(List<Book> books) {
        List<Book> list = new ArrayList<>();
        for(Book book: books){
            list.add((Book) book.clone());
        }
        this.books = list;
    }

    public void addBook(Book book){
        books.add((Book) book.clone());
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getBookId(){
        return getBooks().size();
    }

    private void loadDemo(){
        this.date = LocalDate.now();
        books = new ArrayList<>();
        Book book = new Book(0, "Pekáreň", "Julie Caplinova", "Pohodlne sa usaďte na svojom obľúbenom gauči a užite si neopakovateľné chvíle pohody pri voňavej kávičke a chutnom koláčiku. Pekáreň v Brooklyne vás unesie na dobrodružný výlet do mesta, ktoré nikdy nespí. Nechajte sa strhnúť romantikou a príbehom plným voňavej kávy. Spomínate si ešte na Sophie, gastronovinárku z Kaviarne v Kodani, z ktorej sa stala Katina vynikajúca priateľka? Vo voľnom pokračovaní série Romantické úteky je to práve Sophie, ktorá sa vydáva na dobrodružnú cestu do New Yorku.", new CustomImage(new Image("project/images/books/book0.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-01-03"));
        books.add(book);

        book = new Book(1, "Kaviareň", "Julie Caplinova", "Pripravte si šálku voňavej horúcej čokolády, natiahnite si hrubé ponožky, schúľte sa do kresla a vydajte sa spolu s hlavnou hrdinkou Katie do Kodane. Čaká vás prekvapivá cesta za povestným dánskym šťastím a. .. romantickou sladkou láskou. Mladá a krásna Katie nikdy nemala ustlané na ružiach. Mama jej zomrela príliš skoro a otec nezvládol situáciu práve najlepšie. Napriek tomu si dokázala vybudovať úspešnú kariéru v jednej z najprestížnejších londýnskych PR agentúr a nájsť skvelého priateľa. K šťastiu jej chýbalo už len vytúžené povýšenie.", new CustomImage(new Image("project/images/books/book1.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-03-03"));
        books.add(book);

        book = new Book(2, "V tieni", "Dominic Dan", "Krauzova schopnosť, možno až talent, zapliesť sa do prípadov podfarbených politicko-mocenskými machináciami bola všeobecne známa, preňho charakteristická. Našťastie, nie všetky vraždy vyšetrované na oddelení vrážd boli z tohto súdka. Oveľa častejšie mali ich prípady obyčajný, normálny kriminálny podtón, a tak tomu bolo aj v tomto prípade.", new CustomImage(new Image("project/images/books/book2.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-02-21"));
        books.add(book);

        book = new Book(3, "Zaklínač: Veža Lastovičky", "Andrej Sapkowski", "Svet požiera neľútostná vojna. Za okenicami chalupy obrastenej machom však popolavovlasé dievča rozpráva svoj príbeh. Pri svetle sviečok šepká o kľukatej ceste bojovníčky, o ohrdnutej sirote a zlomenom srdci. Škaredá jazva na jej tvári nepristane k zeleným očiam dieťaťa. Cirila nedokáže zaklínačovi Geraltovi a Yennefer odpustiť, že ju nechali napospas temným silám. No ona prinúti svojich nepriateľov striasť sa strachom. O jej osude nebude rozhodovať nik iný. Andrzej Sapkowski, držiteľ ceny World Fantasy Award za celoživotný prínos, vytvoril svojimi poviedkami o tajomnom zaklínačovi celosvetový fenomén, ktorý okrem knižných pultov a herných konzol dobyl aj televízne obrazovky fanúšikov po celom svete.", new CustomImage(new Image("project/images/books/book3.jpg")));
        book.setCreatedAt(LocalDate.parse("2020-02-21"));
        books.add(book);

        book = new Book(4, "Obklopený idiotmi", "Thomas Erikson", "Nie každý, komu nerozumiete, je nevyhnutne idiot. Prelomová metóda vám pomôže konečne porozumieť svojmu šéfovi, kolegom či životnému partnerovi, ba dokonca vlastným deťom. Máte pocit, že všade stretávate samých idiotov? Vytáčajú vás ľudia a zdá sa vám, že ich reakciám a správaniu vôbec nerozumiete? Prečo je komunikácia s určitými ľuďmi bezproblémová a iní sú ako chmuľovia?", new CustomImage(new Image("project/images/books/book4.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-04-14"));
        books.add(book);

        book = new Book(5, "Môj macík", "Mária Rázusová-Martáková", "Klasické rozprávkové leporelo pre najmenšie deti s nádhernými ilustráciami a mimoriadne populárnymi básničkami. Z ruského originálu prebásnila Mária Rázusová-Martáková.", new CustomImage(new Image("project/images/books/book5.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-04-15"));
        books.add(book);

        book = new Book(6, "Sochár smrti", "Chris Carter", "Bývalého prokurátora štátu Kalifornia niekto zabije a rozštvrtí v jeho vlastnom dome. Detektíva Roberta Huntera z losangeleského oddelenia lúpeží a vrážd však oveľa väčšmi šokuje vizitka, ktorú vrah zanechal na mieste činu - bizarná krvavá socha vytvorená z častí tela obete. Hunterovi je od začiatku jasné, že vrahov výtvor má nejaký skrytý význam, ale čím intenzívnejšie sa ho snaží nájsť a pochopiť, tým viac mu uniká. Isté je len jedno - vrah prostredníctvom sochy komunikuje s políciou. Ale prečo? Vysiela ňou azda nejakú správu? Poskytuje kľúč k riešeniu? Alebo sa s nimi iba pohráva ako mačka s myšou?", new CustomImage(new Image("project/images/books/book6.jpg")));
        book.setCreatedAt(LocalDate.parse("2018-10-14"));
        books.add(book);

        book = new Book(7, "Zdravé črevo a trávenie", "Ladislav Kužela, Zuzana Čižmáriková", "Dielo renomovaného slovenského gastroenterológa doc. Ladislava Kuželu a Zuzany Čižmárikovej Zdravé črevo a trávenie – Mýty verzus fakty poukazuje na skutočnosť, že ľudia sa vo veciach svojho zdravia často riadia mýtmi a dezinformáciami, čo má neraz za následok vážne poškodenie ich zdravia. V tejto knihe však autori prezentujú informácie a fakty založené na vedeckých dôkazoch, z ktorých vychádza a ktoré aplikuje súčasná západná medicína. ", new CustomImage(new Image("project/images/books/book7.jpg")));
        book.setCreatedAt(LocalDate.parse("2007-11-11"));
        books.add(book);

        book = new Book(8, "Šváby", "Jo Nesbo", "V jednom bangkokskom nevestinci je objavený nórsky veľvyslanec v Thajsku. V chrbte má zapichnutý nôž a v aktovke pedofilné pornosnímky. V Osle na ministerstve zahraniča vypukla panika, pretože mal veľvyslanec úzke väzby na nórskeho premiéra. Je bezpodmienečne potrebné zabrániť politickému škandálu. Opitý Harry Hole so zásobou vitamínu B12 nasadá do lietadla, aby zohral rolu úžitočného idiota. Jeho úlohou je prípad vyriešiť, ale pritom sa do celej záležitosti čo nejmenej miešať. Harry so sbeou však manipulovať nenechá, a tak se hneď po prílete do Bangkoku púšťa spolu so svojou thajskou kolegyňou do vyšetrovania. Čoskoro sa ukáže, že nejde len o jednu náhodnú vraždu - za stenou sa čosi hemží a šramotí. Čosi, čo neznesie denné svetlo.", new CustomImage(new Image("project/images/books/book8.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-04-22"));
        books.add(book);

        book = new Book(9, "Vražda na Ostrove Camino", "John Grisham", "Na Ostrove Camino sa môže stať všeličo. Aj vražda uprostred hurikánu. Na prvý pohľad dokonalý zločin. Majiteľ kníhkupectva Bruce Cable sa pripravuje na návrat úspešnej spisovateľky Mercer Mannovej, keď hurikán Leo nečakane zmení smer a rúti sa rovno na ostrov. Floridský guvernér nariadi povinnú evakuáciu, väčšina obyvateľov preto zabezpečí svoje domy a ujde na pevninu, lenže Bruce sa rozhodne zostať. ", new CustomImage(new Image("project/images/books/book9.jpg")));
        book.setCreatedAt(LocalDate.parse("2020-12-12"));
        books.add(book);

        book = new Book(10, "Parížska knižnica", "Janet Skeslien Charles", "Paríž 1939. Mladá, ambiciózna Odile Souchetová získava vysnívanú prácu v Americkej knižnici a črtá sa jej nádejný vzťah so šarmantným policajtom. Do mesta zakrátko vpochodujú nacisti a hrozí, že stratí všetko, čo jej je drahé vrátane milovanej knižnice. S priateľmi knihovníkmi využijú vlastné zbrane, knihy, a postavia sa im na odpor. Po skončení vojny však miesto oslavy slobody okúsi Odile trpkosť neodpustiteľnej zrady. ", new CustomImage(new Image("project/images/books/book10.jpg")));
        book.setCreatedAt(LocalDate.parse("2016-11-11"));
        books.add(book);

        book = new Book(11, "1984", "George Orwell", "Román 1984 je jedno z najznámejších diel svetovej literatúry. Spája v sebe prvky spoločensko-politického a vedecko-fantastického románu. Je obžalobou komunistickej diktatúry, ktorá roku 1984 ovládla všetko, vrátane ľudského myslenia. Román opisuje osudy čestného, citlivého a uvažujúceho jednotlivca (Winstona Smitha), ktorý sa vzoprie systému, za čo platí krutú daň. Orwell touto knihou už roku 1948 ponúkol víziu, ktorá sa neskôr stala realitou.", new CustomImage(new Image("project/images/books/book11.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-04-18"));
        books.add(book);

        book = new Book(12, "Čierny humor v bielom plášti", "Peter Valo", "Tentoraz ponúka viac ako štyri desiatky skutočných príbehov z ambulancií a nemocníc, v ktorých opäť vystupujú skutočné osobnosti našej medicíny, od legendárneho športového lekára profesora Alexandra Binovského až po mladého banskobystrického chirurga Martina Sirotňáka. ", new CustomImage(new Image("project/images/books/book12.jpg")));
        book.setCreatedAt(LocalDate.parse("2014-11-11"));
        books.add(book);

        book = new Book(13, "En ten tulipán", "Agatha Christie", "Detektívny román En ten tulipán z roku 1955 vychádza prvý raz v slovenskom preklade, a hoci patrí k menej známym dielam Agathy Christie, milovníci tvorby legendárnej autorky si aj tentoraz prídu na svoje. Popri famóznom Herculovi Poirotovi v nej vystupuje aj detektívova výkonná, takmer dokonalá sekretárka slečna Lemonová.", new CustomImage(new Image("project/images/books/book13.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-04-16"));
        books.add(book);

        book = new Book(14, "Severská mytológia", "Neil Gaiman", "Neil Gaiman sa pri písaní už dlho inšpiruje dávnymi príbehmi a mýtmi. Pri tejto knihe však obrátil pozornosť priamo na ich zdroj a bravúrne spracoval veľké ságy ďalekého severu. Verne opisuje panteón hlavných nordických bohov: Odina, najvyššieho z najvyšších, jeho syna Thora, neuveriteľne silného, no nie najmúdrejšieho, a Lokiho, syna obra, Odinovho pokrvného brata, švindliara a neprekonateľného manipulátora. ", new CustomImage(new Image("project/images/books/book14.jpg")));
        book.setCreatedAt(LocalDate.parse("2021-04-20"));
        books.add(book);
    }

    public void serialize() throws IOException {
        File database = new File("src/project/model/databases/Books.txt");
        FileOutputStream fos = new FileOutputStream(database);
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(date);
        oos.writeObject(books);
        oos.close();
        fos.close();
    }

    public void deserialize() throws IOException, ClassNotFoundException {
        File database = new File("src/project/model/databases/Books.txt");
        FileInputStream fis = new FileInputStream(database);
        ObjectInputStream ois = new ObjectInputStream(fis);
        date = (LocalDate) ois.readObject();
        books = (List<Book>) ois.readObject();
        ois.close();
        fis.close();
    }
}
