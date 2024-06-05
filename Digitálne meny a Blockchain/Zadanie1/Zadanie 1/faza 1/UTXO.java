/**
 * UTXO.java
 * 
 * Táto trieda reprezentuje nevyužité transakčné výstupy (UTXO)
 */
import java.util.Arrays;

public class UTXO implements Comparable<UTXO> {

    /** Hash transakcie, z ktorej toto UTXO pochádza */
    private byte[] txHash;

    /** Index prislúchajúceho výstupu v transakcii */
    private int index;

    /**
     * Vytvorí nové UTXO zodpovedajúce výstupu s indexom <index> v transakcii,
     * ktorej hash je {@code txHash}
     */
    public UTXO(byte[] txHash, int index) {
        this.txHash = Arrays.copyOf(txHash, txHash.length);
        this.index = index;
    }

    /** @return transakčný hash tohto UTXO */
    public byte[] getTxHash() {
        return txHash;
    }

    /** @return index tohto UTXO */
    public int getIndex() {
        return index;
    }

    /**
     * Porovná toto UTXO s tým, ktoré bolo zadané v {@code other}, považuje ich za
     * rovnocenné ak majú pole {@code txHash} s rovnakým obsahom a rovnaké hodnoty
     * {@code index}
     */
    public boolean equals(Object other) {
        if (other == null) {
            return false;
        }
        if (getClass() != other.getClass()) {
            return false;
        }

        UTXO utxo = (UTXO) other;
        byte[] hash = utxo.txHash;
        int in = utxo.index;
        if (hash.length != txHash.length || index != in)
            return false;
        for (int i = 0; i < hash.length; i++) {
            if (hash[i] != txHash[i])
                return false;
        }
        return true;
    }

    /**
     * Jednoduchá implementácia UTXO hashCode, ktorá rešpektuje rovnosť UTXOs //
     * (t.j. utxo1.equals (utxo2) => utxo1.hashCode () == utxo2.hashCode ())
     */
    public int hashCode() {
        int hash = 1;
        hash = hash * 17 + index;
        hash = hash * 31 + Arrays.hashCode(txHash);
        return hash;
    }

    /** Porovná toto UTXO so špecifikovaným v {@code utxo} */
    public int compareTo(UTXO utxo) {
        byte[] hash = utxo.txHash;
        int in = utxo.index;
        if (in > index)
            return -1;
        else if (in < index)
            return 1;
        else {
            int len1 = txHash.length;
            int len2 = hash.length;
            if (len2 > len1)
                return -1;
            else if (len2 < len1)
                return 1;
            else {
                for (int i = 0; i < len1; i++) {
                    if (hash[i] > txHash[i])
                        return -1;
                    else if (hash[i] < txHash[i])
                        return 1;
                }
                return 0;
            }
        }
    }
}
