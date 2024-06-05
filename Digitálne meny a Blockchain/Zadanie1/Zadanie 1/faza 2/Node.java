import java.util.ArrayList;
import java.util.Set;

public interface Node {

    // POZNÁMKA: Node je rozhranie a nemá konštruktor.
    // Vaša trieda TrustedNode.java však vyžaduje 4-argumentový
    // konštruktor, ako je definované v Simulation.java
    // Tento konštruktor dáva vášmu uzlu informácie o simulácii 
    // vrátane počtu kôl, pre ktoré bude bežať.

    /**
     * {@code followees [i]} je pravda iba ak tento uzol nasleduje uzol {@code i}
     */
    void followeesSet(boolean[] followees);

    /** inicializovať navrhovaný zoznam transakcií */
    void pendingTransactionSet(Set<Transaction> pendingTransactions);

    /**
     * @return návrhy, ktoré pošlem mojim nasledovníkom. Pamätajme: Po finálovom
     *         kole sa správanie {@code followersSend} zmení a malo by vrátiť
     *         transakcie, pri ktorých bol dosiahnutý konsenzus.
     */
    Set<Transaction> followersSend();

    /** príjmy kandidátov z iných uzlov */
    void followeesReceive(ArrayList<Integer[]> candidates);
}