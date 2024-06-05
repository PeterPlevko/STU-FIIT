/*
* Main pre zadanie 1 na predmete DMBLOCK - faza 3
*/

import java.math.BigInteger;
import java.security.*;

public class Main_faza3 {
    public static void main(String[] args) throws NoSuchProviderException, NoSuchAlgorithmException, InvalidKeyException, SignatureException {

        /**
         * Vygeneruje páry kľúčov pre Alicu, Boba a Cyrila
         */        
        byte[] key_bob = new byte[32];
        byte[] key_alice = new byte[32];
        byte[] key_cyril = new byte[32];

        for (int i = 0; i < 32; i++) {
           key_bob[i] = (byte) 1;
           key_alice [i] = (byte) 0;
           key_cyril [i] = (byte) 2; 
        }

        PRGen prGen_bob = new PRGen(key_bob);
        PRGen prGen_alice = new PRGen(key_alice);
        PRGen prGen_cyril = new PRGen(key_cyril);
      
        RSAKeyPair pk_bob = new RSAKeyPair(prGen_bob, 265);
        RSAKeyPair pk_alice = new RSAKeyPair(prGen_alice, 265);
        RSAKeyPair pk_cyril = new RSAKeyPair(prGen_cyril, 265);

        // Vytvorenie genesis blocku, bez transakcii s jednou coinbase
        Block genesisBlock = new Block(null, pk_bob.getPublicKey());
        genesisBlock.finalize();
        Blockchain blockchain = new Blockchain(genesisBlock);
        HandleBlocks handleBlocks = new HandleBlocks(blockchain);

        // Alicine vytvorenie prveho blocku1 s transakciou od jozka ferkovi
        Block block1 = new Block(genesisBlock.getHash(), pk_alice.getPublicKey());

        Tx tx1 = new Tx();

        // genesis block ma hodnotu 6.25
        tx1.addInput(genesisBlock.getCoinbase().getHash(), 0);

        tx1.addOutput(2, pk_alice.getPublicKey());
        tx1.addOutput(2, pk_alice.getPublicKey());
        tx1.addOutput(2.25, pk_alice.getPublicKey());

        tx1.signTx(pk_bob.getPrivateKey(), 0);

        block1.transactionAdd(tx1);
        block1.finalize();

        System.out.println("Block1 Valid check: " + handleBlocks.blockProcess(block1));

        // Bobove vytvorenie alternativneho blocku2 s transakciou sam sebe
        Block block2 = new Block(genesisBlock.getHash(), pk_bob.getPublicKey());

        Tx tx2 = new Tx();

        // genesis block ma hodnotu 6.25
        tx2.addInput(genesisBlock.getCoinbase().getHash(), 0);

        tx2.addOutput(2, pk_bob.getPublicKey());
        tx2.addOutput(2, pk_bob.getPublicKey());
        tx2.addOutput(2.25, pk_bob.getPublicKey());

        tx2.signTx(pk_bob.getPrivateKey(), 0);

        block2.transactionAdd(tx2);
        block2.finalize();

        System.out.println("Block2 Valid check: " + handleBlocks.blockProcess(block2));



        // Bobove vytvorenie blocku3, ktory retazi na block1 s transakciou od ferka danke
        Block block3 = new Block(block1.getHash(), pk_bob.getPublicKey());

        Tx tx3 = new Tx();

        // posielaju sa coiny v hodnote 4
        tx3.addInput(tx1.getHash(), 0);
        tx3.addInput(tx1.getHash(), 1);
        //tx3.addInput(tx1.getHash(), 2);

        tx3.addOutput(4, pk_cyril.getPublicKey());

        tx3.signTx(pk_alice.getPrivateKey(), 0);
        tx3.signTx(pk_alice.getPrivateKey(), 1);
        //tx3.signTx(pk_alice.getPrivateKey(), 2);

        block3.transactionAdd(tx3);
        block3.finalize();

        System.out.println("Block3 Valid check: " + handleBlocks.blockProcess(block3));



        // Bobove vytvorenie blocku4, ktory retazi na block3 s transakciou od Cyrila Bobovi
        Block block4 = new Block(block3.getHash(), pk_bob.getPublicKey());

        Tx tx4 = new Tx();

        tx4.addInput(tx3.getHash(), 0);

        tx4.addOutput(3, pk_bob.getPublicKey());
        tx4.addOutput(1, pk_bob.getPublicKey());

        tx4.signTx(pk_cyril.getPrivateKey(), 0);

        block4.transactionAdd(tx4);
        block4.finalize();

        System.out.println("Block4 Valid check: " + handleBlocks.blockProcess(block4));

    }

    public static class Tx extends Transaction {
        public void signTx(RSAKey sk, int input) throws SignatureException {
            byte[] sig = null;
            try {
                sig = sk.sign(this.getDataToSign(input));
            } catch (NullPointerException e) {
                throw new RuntimeException(e);
            }
            this.addSignature(sig, input);
            // Poznámka: táto funkcia je nevhodne pomenovaná a v skutočnosti
            // by nemala overridovať metódu finalize Java garbage kolektoru.
            this.finalize();
        }
    }
}
