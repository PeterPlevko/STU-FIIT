// Meno študenta: Roman Palenik AisId: 103083
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/* TrustedNode označuje uzol, ktorý dodržuje pravidlá (nie je byzantský) */
public class TrustedNode implements Node {

    double p_graph;
    double p_byzantine;
    double p_txDistribution;
    int numRounds;
    Set<Transaction> pendingTransactions;
    boolean[] followees;
    boolean[] blackListed;
    ArrayList<Integer[]> candidates;


    public TrustedNode(double p_graph, double p_byzantine, double p_txDistribution, int numRounds) {
        this.p_graph = p_graph;
        this.p_byzantine = p_byzantine;
        this.p_txDistribution = p_txDistribution;
        this.numRounds = numRounds;
    }

    public void followeesSet(boolean[] followees) {
        this.followees = followees;
        this.blackListed = new boolean[followees.length];
    }

    public void pendingTransactionSet(Set<Transaction> pendingTransactions) {
        this.pendingTransactions = pendingTransactions;
    }

    public Set<Transaction> followersSend() {
        Set<Transaction> toSend = new HashSet<>(pendingTransactions);
        pendingTransactions.clear();
        return toSend;
    }

    public void followeesReceive(ArrayList<Integer[]> candidates) {
        
        // create set of senders
        Set<Integer> senders = new HashSet<>();
        for (Integer[] candidate : candidates) {
            senders.add(candidate[1]);
        }
        //create black listed
        for (int i = 0; i < followees.length; i++) {
            if (followees[i] && !senders.contains(i))
                blackListed[i] = true;
        }
        for (Integer[] candidate : candidates) {
            if (blackListed[candidate[1]]) {
            } else {
                Transaction transaction = new Transaction(candidate[0]);
                pendingTransactions.add(transaction);
            }
        }
    }
}
