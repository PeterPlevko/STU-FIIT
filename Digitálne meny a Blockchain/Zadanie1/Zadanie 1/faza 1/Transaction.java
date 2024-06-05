import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Arrays;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Transaction {

    public class Input {
        /** hash transakcie, ktorej výstup sa ide použiť */
        public byte[] prevTxHash;
        /** použitý index výstupu v predchádzajúcej transakcii */
        public int outputIndex;
        /** podpis vytvorený na kontrolu platnosti */
        public byte[] signature;

        public Input(byte[] prevHash, int index) {
            if (prevHash == null)
                prevTxHash = null;
            else
                prevTxHash = Arrays.copyOf(prevHash, prevHash.length);
            outputIndex = index;
        }

        public void addSignature(byte[] sig) {
            if (sig == null)
                signature = null;
            else
                signature = Arrays.copyOf(sig, sig.length);
        }
    }

    public class Output {
        /** hodnota výstupu v bitcoinoch  */
        public double value;
        /** adresa alebo verejný kľúč prijímateľa */
        public RSAKey address;

        public Output(double v, RSAKey addr) {
            value = v;
            address = addr;
        }
    }

    /** hash transakcie, jej unikátne id */
    private byte[] hash;
    private ArrayList<Input> inputs;
    private ArrayList<Output> outputs;

    public Transaction() {
        inputs = new ArrayList<Input>();
        outputs = new ArrayList<Output>();
    }

    public Transaction(Transaction tx) {
        hash = tx.hash.clone();
        inputs = new ArrayList<Input>(tx.inputs);
        outputs = new ArrayList<Output>(tx.outputs);
    }

    public void addInput(byte[] prevTxHash, int outputIndex) {
        Input in = new Input(prevTxHash, outputIndex);
        inputs.add(in);
    }

    public void addOutput(double value, RSAKey address) {
        Output op = new Output(value, address);
        outputs.add(op);
    }

    public void removeInput(int index) {
        inputs.remove(index);
    }

    public void removeInput(UTXO ut) {
        for (int i = 0; i < inputs.size(); i++) {
            Input in = inputs.get(i);
            UTXO u = new UTXO(in.prevTxHash, in.outputIndex);
            if (u.equals(ut)) {
                inputs.remove(i);
                return;
            }
        }
    }

    public byte[] getDataToSign(int index) {
        // i-ty vstup a všetky výstupy
        ArrayList<Byte> sigData = new ArrayList<Byte>();
        if (index > inputs.size())
            return null;
        Input in = inputs.get(index);
        byte[] prevTxHash = in.prevTxHash;
        ByteBuffer b = ByteBuffer.allocate(Integer.SIZE / 8);
        b.putInt(in.outputIndex);
        byte[] outputIndex = b.array();
        if (prevTxHash != null)
            for (int i = 0; i < prevTxHash.length; i++)
                sigData.add(prevTxHash[i]);
        for (int i = 0; i < outputIndex.length; i++)
            sigData.add(outputIndex[i]);
        for (Output op : outputs) {
            ByteBuffer bo = ByteBuffer.allocate(Double.SIZE / 8);
            bo.putDouble(op.value);
            byte[] value = bo.array();
            byte[] addressExponent = op.address.getExponent().toByteArray();
            byte[] addressModulus = op.address.getModulus().toByteArray();
            for (int i = 0; i < value.length; i++)
                sigData.add(value[i]);
            for (int i = 0; i < addressExponent.length; i++)
                sigData.add(addressExponent[i]);
            for (int i = 0; i < addressModulus.length; i++)
                sigData.add(addressModulus[i]);
        }
        byte[] sigD = new byte[sigData.size()];
        int i = 0;
        for (Byte sb : sigData)
            sigD[i++] = sb;
        return sigD;
    }

    public void addSignature(byte[] signature, int index) {
        inputs.get(index).addSignature(signature);
    }

    public byte[] getTx() {
        ArrayList<Byte> Tx = new ArrayList<Byte>();
        for (Input in : inputs) {
            byte[] prevTxHash = in.prevTxHash;
            ByteBuffer b = ByteBuffer.allocate(Integer.SIZE / 8);
            b.putInt(in.outputIndex);
            byte[] outputIndex = b.array();
            byte[] signature = in.signature;
            if (prevTxHash != null)
                for (int i = 0; i < prevTxHash.length; i++)
                    Tx.add(prevTxHash[i]);
            for (int i = 0; i < outputIndex.length; i++)
                Tx.add(outputIndex[i]);
            if (signature != null)
                for (int i = 0; i < signature.length; i++)
                    Tx.add(signature[i]);
        }
        for (Output op : outputs) {
            ByteBuffer b = ByteBuffer.allocate(Double.SIZE / 8);
            b.putDouble(op.value);
            byte[] value = b.array();
            byte[] addressExponent = op.address.getExponent().toByteArray();
            byte[] addressModulus = op.address.getModulus().toByteArray();
            for (int i = 0; i < value.length; i++)
                Tx.add(value[i]);
            for (int i = 0; i < addressExponent.length; i++)
                Tx.add(addressExponent[i]);
            for (int i = 0; i < addressModulus.length; i++)
                Tx.add(addressModulus[i]);

        }
        byte[] tx = new byte[Tx.size()];
        int i = 0;
        for (Byte b : Tx)
            tx[i++] = b;
        return tx;
    }

    public void finalize() {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(getTx());
            hash = md.digest();
        } catch (NoSuchAlgorithmException x) {
            x.printStackTrace(System.err);
        }
    }

    public void setHash(byte[] h) {
        hash = h;
    }

    public byte[] getHash() {
        return hash;
    }

    public ArrayList<Input> getInputs() {
        return inputs;
    }

    public ArrayList<Output> getOutputs() {
        return outputs;
    }

    public Input getInput(int index) {
        if (index < inputs.size()) {
            return inputs.get(index);
        }
        return null;
    }

    public Output getOutput(int index) {
        if (index < outputs.size()) {
            return outputs.get(index);
        }
        return null;
    }

    public int numInputs() {
        return inputs.size();
    }

    public int numOutputs() {
        return outputs.size();
    }
}
