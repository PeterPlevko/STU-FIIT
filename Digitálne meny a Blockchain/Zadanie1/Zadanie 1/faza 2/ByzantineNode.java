/**
 * Tento Byzantský uzol by sa dal považovať za vypnutý.
 * Nikdy nevysiela žiadne transakcie ani neodpovedá
 * na komunikáciu s inými uzlami.
 *
 * Toto je len jeden príklad (najjednoduchší) takéhoto
 * byzantského (škodlivého) uzla.
 */

import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;

public class ByzantineNode implements Node {

    public ByzantineNode(double p_graph, double p_byzantine, double p_txDistribution, int numRounds) {
    }

    public void followeesSet(boolean[] followees) {
        return;
    }

    public void pendingTransactionSet(Set<Transaction> pendingTransactions) {
        return;
    }

    public Set<Transaction> followersSend() {
        return new HashSet<Transaction>();
    }

    public void followeesReceive(ArrayList<Integer[]> candidates) {
        return;
    }
}
