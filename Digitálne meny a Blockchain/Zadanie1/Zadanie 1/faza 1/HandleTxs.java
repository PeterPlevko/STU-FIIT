import java.util.ArrayList;
import java.util.Objects;

// Meno študenta: Roman Palenik
public class HandleTxs {

    UTXOPool copyOfUtxoPool;
    ArrayList<UTXO> allUtxoInTransactionInThisBlock;
    /**
     * Vytvorí verejný ledger, ktorého aktuálny UTXOPool (zbierka nevyčerpaných
     * transakčných výstupov) je {@code utxoPool}. Malo by to vytvoriť obchrannú kópiu
     * utxoPool pomocou konštruktora UTXOPool (UTXOPool uPool).
     */
    public HandleTxs(UTXOPool utxoPool) {
        copyOfUtxoPool = new UTXOPool(utxoPool);
    }

    /**
     * @return aktuálny UTXO pool.
     * Ak nenájde žiadny aktuálny UTXO pool, tak vráti prázdny (nie nulový) objekt {@code UTXOPool}.
     */
    public UTXOPool UTXOPoolGet() {
        return Objects.requireNonNullElse(copyOfUtxoPool, new UTXOPool());
    }

    /**
     * @return true, ak 
     * (1) sú všetky výstupy nárokované {@code tx} v aktuálnom UTXO pool, 
     * (2) podpisy na každom vstupe {@code tx} sú platné, 
     * (3) žiadne UTXO nie je nárokované viackrát, 
     * (4) všetky výstupné hodnoty {@code tx}s sú nezáporné a 
     * (5) súčet vstupných hodnôt {@code tx}s je väčší alebo rovný súčtu jej
     *     výstupných hodnôt; a false inak.
     */
    public boolean txIsValid(Transaction tx) {
        //inputs are in UTXO pool
        // every UTXO is unique
        ArrayList<UTXO> allUtxoInTransaction = new ArrayList<>();
        for( Transaction.Input controlledInput: tx.getInputs()) {
            UTXO utxoToControle = new UTXO(controlledInput.prevTxHash,controlledInput.outputIndex);
            // double spending in block outside the block
            if(allUtxoInTransactionInThisBlock != null) {
                for (UTXO oneUtxo : allUtxoInTransactionInThisBlock) {
                    if (oneUtxo.equals(utxoToControle)) {
                        return false;
                    }
                }
                allUtxoInTransactionInThisBlock.add(utxoToControle);
            }
            // double spending in one block
            for (UTXO oneUtxo : allUtxoInTransaction) {
                if (oneUtxo.equals(utxoToControle)) {
                    return false;
                }
            }
            allUtxoInTransaction.add(utxoToControle);

            //control if UTXO is in pool
            if(!UTXOPoolGet().contains(utxoToControle)){
                return false;
            };
        }
        // signature is rigth
        int i = 0;
        for( Transaction.Input controlledInput: tx.getInputs()) {
            UTXO utxoToControle = new UTXO(controlledInput.prevTxHash,controlledInput.outputIndex);
            if(!UTXOPoolGet().getTxOutput(utxoToControle).address.verifySignature(tx.getDataToSign(i),controlledInput.signature)){
                System.out.println("Zlyhalo overenie podpisu");
                return false;
            };
            i++;
        }
        // every output values are not negative
        for (Transaction.Output controlledOutput: tx.getOutputs()){
            if(controlledOutput.value < 0) return false;
        }
        // values of inputs are equal to outputs or less
        int inputValue = 0;
        for (Transaction.Input controlledInput: tx.getInputs()){
            // need to get value of input by checking, which output is that
            ArrayList<UTXO> utxoPool = UTXOPoolGet().getAllUTXO();
            UTXO utxoToControle = new UTXO(controlledInput.prevTxHash,controlledInput.outputIndex);
            inputValue+= UTXOPoolGet().getTxOutput(utxoToControle).value;
        }
        int outputValue = 0;
        for(Transaction.Output output: tx.getOutputs()){
            outputValue+= output.value;
        }
        if (inputValue < outputValue) return false;
        return true;
    }

    /**
     * Spracováva každú epochu prijímaním neusporiadaného radu navrhovaných
     * transakcií, kontroluje správnosť každej transakcie, vracia pole vzájomne 
     * platných prijatých transakcií a aktualizuje aktuálny UTXO pool podľa potreby.
     */
    public Transaction[] handler(Transaction[] possibleTxs) {
        allUtxoInTransactionInThisBlock = new ArrayList<>();
        Transaction[] arr = {};
        for(Transaction controlledTransaction: possibleTxs){
            if(txIsValid(controlledTransaction)) {

                int n = arr.length;
                Transaction[] newArr = new Transaction[n+1];
                if (arr.length == 0) {
                    newArr[0] = controlledTransaction;
                } else {
                    newArr = new Transaction[n + 1];
                    for (int i = 0; i < n; i++) {
                        newArr[i] = arr[i];
                    }
                    newArr[n] = controlledTransaction;
                }

                arr = newArr;
                //update UTXO
                //remove inputs
                for( Transaction.Input controlledInput: controlledTransaction.getInputs()) {
                    UTXOPool utxoPool = UTXOPoolGet();
                    UTXO utxoToControle = new UTXO(controlledInput.prevTxHash,controlledInput.outputIndex);
                    utxoPool.removeUTXO(utxoToControle);
                }
                //put outputs
                int i = 0;
                for( Transaction.Output controlledOutput: controlledTransaction.getOutputs()) {
                    UTXO secondUtxo = new UTXO(controlledTransaction.getHash(), i);
                    //create new UTXO pool
                    UTXOPoolGet().addUTXO(secondUtxo, controlledTransaction.getOutput(i));
                    i++;
                }
            }
        }
        return arr;
    }
}
