import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

public class Block {

    public static final double COINBASE = 6.25;

    private byte[] hash;
    private byte[] prevBlockHash;
    private Transaction coinbase;
    private ArrayList<Transaction> txs;

    /** {@code address} je adresa, na ktorú bude poslaná coinbase transakcia */
    public Block(byte[] prevHash, RSAKey address) {
        prevBlockHash = prevHash;
        coinbase = new Transaction(COINBASE, address);
        txs = new ArrayList<Transaction>();
    }

    public Transaction getCoinbase() {
        return coinbase;
    }

    public byte[] getHash() {
        return hash;
    }

    public byte[] getPrevBlockHash() {
        return prevBlockHash;
    }

    public ArrayList<Transaction> getTransactions() {
        return txs;
    }

    public Transaction getTransaction(int index) {
        return txs.get(index);
    }

    public void transactionAdd(Transaction tx) {
        txs.add(tx);
    }

    public byte[] getBlock() {
        ArrayList<Byte> rawBlock = new ArrayList<Byte>();
        if (prevBlockHash != null)
            for (int i = 0; i < prevBlockHash.length; i++)
                rawBlock.add(prevBlockHash[i]);
        for (int i = 0; i < txs.size(); i++) {
            byte[] rawTx = txs.get(i).getTx();
            for (int j = 0; j < rawTx.length; j++) {
                rawBlock.add(rawTx[j]);
            }
        }
        byte[] raw = new byte[rawBlock.size()];
        for (int i = 0; i < raw.length; i++)
            raw[i] = rawBlock.get(i);
        return raw;
    }

    public void finalize() {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(getBlock());
            hash = md.digest();
        } catch (NoSuchAlgorithmException x) {
            x.printStackTrace(System.err);
        }
    }
}
