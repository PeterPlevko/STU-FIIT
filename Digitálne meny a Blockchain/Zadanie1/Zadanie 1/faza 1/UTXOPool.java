
/**
 * UTXOPool.java
 * 
 * Táto trieda reprezentuje UTXO pool, ktorý mapuje jednotlivé UTXO na ich
 * korešpondujúce transakčné výstupy 
*/ 

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

public class UTXOPool {

    /**
     * Aktuálna zbierka UTXO, pričom každé z nich je mapované na zodpovedajúci
     * výstup transakcie
     */
    private HashMap<UTXO, Transaction.Output> H;

    /** Vytvorí nový prázdny UTXOPool */
    public UTXOPool() {
        H = new HashMap<UTXO, Transaction.Output>();
    }

    /** Vytvorí nový UTXOPool, ktorý je kópiou {@code uPool} */
    public UTXOPool(UTXOPool uPool) {
        H = new HashMap<UTXO, Transaction.Output>(uPool.H);
    }

    /**
     * Pridá namapovanie z UTXO {@code utxo} do transackčného výstupu {@code txOut}
     * v poole
     */
    public void addUTXO(UTXO utxo, Transaction.Output txOut) {
        H.put(utxo, txOut);
    }

    /** Odstráni UTXO {@code utxo} z poolu */
    public void removeUTXO(UTXO utxo) {
        H.remove(utxo);
    }

    /**
     * @return výstup transakcie zodpovedajúci UTXO {@code utxo} alebo null, ak
     *         {@code utxo} nie je v poole.
     */
    public Transaction.Output getTxOutput(UTXO ut) {
        return H.get(ut);
    }

    /** @return true ak UTXO {@code utxo} je v poole a inak false */
    public boolean contains(UTXO utxo) {
        return H.containsKey(utxo);
    }

    /** Vráti {@code ArrayList} všetkých UTXOs v poole */
    public ArrayList<UTXO> getAllUTXO() {
        Set<UTXO> setUTXO = H.keySet();
        ArrayList<UTXO> allUTXO = new ArrayList<UTXO>();
        for (UTXO ut : setUTXO) {
            allUTXO.add(ut);
        }
        return allUTXO;
    }
}
