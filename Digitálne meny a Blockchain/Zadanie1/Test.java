import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SignatureException;
import java.util.ArrayList;

public class Test {

    public static void main(String[] args) throws NoSuchProviderException, NoSuchAlgorithmException, InvalidKeyException, SignatureException {

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



        // TEST 1, SPLIT BOBOVHO COINBASE A POSLANIE VSETKYCH ALICE
        Block block1 = new Block(genesisBlock.getHash(), pk_alice.getPublicKey());

        Main_faza3.Tx tx1 = new Main_faza3.Tx();

        // genesis block ma hodnotu 6.25
        tx1.addInput(genesisBlock.getCoinbase().getHash(), 0);

        tx1.addOutput(4.25, pk_alice.getPublicKey());
        tx1.addOutput(2,pk_bob.getPublicKey());

        tx1.signTx(pk_bob.getPrivateKey(), 0);

        block1.transactionAdd(tx1);
        block1.finalize();   //transfer vsetkych majetko od boba alice

        System.out.println("Test 1, expected: true, got: " + handleBlocks.blockProcess(block1));

        // TEST 2, BLOK BEZ TRANSAKCII

        Block block2 = new Block(block1.getHash(), pk_alice.getPublicKey());
        block2.finalize();
        System.out.println("Test 2, expected: true, got: " + handleBlocks.blockProcess(block2));

        // TEST 3, CYRIL SI SKUSI POSLAT ALICIN COINBASE

        Block block3 = new Block(block1.getHash(), pk_cyril.getPublicKey());
        Main_faza3.Tx tx2 = new Main_faza3.Tx();
        tx2.addInput(block1.getCoinbase().getHash(), 0);
        tx2.addOutput(6.25, pk_cyril.getPublicKey());
        tx2.signTx(pk_cyril.getPrivateKey(), 0);

        block3.transactionAdd(tx2);

        block3.finalize();

        System.out.println("Test 3, expected: false, got: " + handleBlocks.blockProcess(block3));

        // TEST 4, DOUBLE SPENDING 1 transakcia

        Block block4 = new Block(block2.getHash(), pk_cyril.getPublicKey());
        Main_faza3.Tx tx3 = new Main_faza3.Tx();
        tx3.addInput(block1.getCoinbase().getHash(), 0);
        tx3.addInput(block1.getCoinbase().getHash(), 0);
        tx3.addOutput(6.25, pk_cyril.getPublicKey());
        tx3.signTx(pk_bob.getPrivateKey(), 0);

        block4.transactionAdd(tx3);

        block4.finalize();

        System.out.println("Test 4, expected: false, got: " + handleBlocks.blockProcess(block4));

        // TEST 5, DOUBLE SPENDING 2 transakcie

        Block block5 = new Block(block2.getHash(), pk_cyril.getPublicKey());
        Main_faza3.Tx tx5 = new Main_faza3.Tx();
        Main_faza3.Tx tx6 = new Main_faza3.Tx();
        tx5.addInput(block1.getCoinbase().getHash(), 0);
        tx6.addInput(block1.getCoinbase().getHash(), 0);
        tx5.addOutput(6.25, pk_bob.getPublicKey());
        tx6.addOutput(6.25, pk_bob.getPublicKey());
        tx5.signTx(pk_bob.getPrivateKey(), 0);
        tx6.signTx(pk_bob.getPrivateKey(), 0);

        block5.transactionAdd(tx5);
        block5.transactionAdd(tx6);

        block5.finalize();

        System.out.println("Test 6, expected: false, got: " + handleBlocks.blockProcess(block5));

        // TEST 7, NOVY GENESIS BLOCK

        Block block6 = new Block(null, pk_cyril.getPublicKey());
        Main_faza3.Tx tx7 = new Main_faza3.Tx();
        tx7.addInput(block1.getCoinbase().getHash(), 0);
        tx7.addOutput(6.25, pk_alice.getPublicKey());
        tx7.signTx(pk_alice.getPrivateKey(), 0);

        block6.transactionAdd(tx7);

        block6.finalize();

        System.out.println("Test 7, expected: false, got: " + handleBlocks.blockProcess(block6));

        // TEST 8 NEPLATNY PREV BLOCK HASH

        Block block7 = new Block(block3.getHash(), pk_cyril.getPublicKey());
        Main_faza3.Tx tx8 = new Main_faza3.Tx();
        tx8.addInput(block1.getCoinbase().getHash(), 0);
        tx8.addOutput(6.25, pk_alice.getPublicKey());
        tx8.signTx(pk_alice.getPrivateKey(), 0);

        block7.transactionAdd(tx8);

        block7.finalize();

        System.out.println("Test 8, expected: false, got: " + handleBlocks.blockProcess(block7));

        // TEST 9 NAROKOVANE VYCERPANE UTXO

        Block block8 = new Block(block1.getHash(), pk_alice.getPublicKey());

        Main_faza3.Tx tx9 = new Main_faza3.Tx();

        // genesis block ma hodnotu 6.25
        tx9.addInput(genesisBlock.getCoinbase().getHash(), 0);

        tx9.addOutput(4.25, pk_alice.getPublicKey());
        tx9.addOutput(2,pk_bob.getPublicKey());

        tx9.signTx(pk_bob.getPrivateKey(), 0);

        block8.transactionAdd(tx9);
        block8.finalize();   //transfer vsetkych majetko od boba alice

        System.out.println("Test 9, expected: false, got: " + handleBlocks.blockProcess(block8));

        // TEST 10 PRIDANIE CUTOFFAGE BLOKOV NAD GENESIS A PRIDANIE BLOKU NAD GENESIS

//        ArrayList<Block> blocks = new ArrayList<>();
//        blocks.add(new Block(genesisBlock.getHash(), pk_alice.getPublicKey()));
//
//        for(int i = 1; i < Blockchain.CUT_OFF_AGE + 1; i++) {
//            Block b = new Block(blocks.get(i-1).getHash(), pk_alice.getPublicKey());
//            b.finalize();
//            blocks.add(b);
//            handleBlocks.blockProcess(b);
//        }
//
//        Block block = new Block(genesisBlock.getHash(), pk_alice.getPublicKey());
//        block.finalize();
//        System.out.println("Test 10, expected: true, got: " + handleBlocks.blockProcess(block));

        // TEST 11 PRIDANIE CUTOFFAGE BLOKOV NAD GENESIS A PRIDANIE BLOKU NAD GENESIS

        ArrayList<Block> blocks = new ArrayList<>();
        blocks.add(new Block(genesisBlock.getHash(), pk_alice.getPublicKey()));

        for(int i = 1; i < Blockchain.CUT_OFF_AGE + 3; i++) {
            Block b = new Block(blocks.get(i-1).getHash(), pk_alice.getPublicKey());
            b.finalize();
            blocks.add(b);
            handleBlocks.blockProcess(b);
        }

        Block bad = new Block(genesisBlock.getHash(), pk_alice.getPublicKey());
        bad.finalize();
        System.out.println("Test 11, expected: false, got: " + handleBlocks.blockProcess(bad));

    }

}
