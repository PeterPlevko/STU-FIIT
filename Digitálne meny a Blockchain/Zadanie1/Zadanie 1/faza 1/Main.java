import java.util.ArrayList;

public class Main {
    public static void main(String[] args){

        // we need keys to sign inputs in transaction
        byte[] aliceInitialString = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".getBytes();
        PRGen alicePrGen = new PRGen(aliceInitialString);

        byte[] bobInitialString = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab".getBytes();
        PRGen bobPrGen = new PRGen(bobInitialString);

        RSAKeyPair aliceKeyPair = new RSAKeyPair(alicePrGen,809);
        RSAKeyPair bobKeyPair = new RSAKeyPair(bobPrGen,1511);

        //need first transaction to create first UTXO and init UTXO pool
        Transaction transaction = new Transaction();
        transaction.addInput(null,0);
        transaction.addOutput(30,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign = transaction.getDataToSign(0);
        transaction.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign),0);
        //finalize create hash of transaction and ended operation with transaction
        transaction.finalize();

        UTXO firstUtxo = new UTXO(transaction.getHash(), 0);

        //create new UTXO pool
        UTXOPool utxoPool = new UTXOPool();
        utxoPool.addUTXO(firstUtxo, transaction.getOutput(0));

        //TEST HANDLER FUNCTION
        // alice is sending bob 15 bitcoins, therefore she needs to send other 15 to herself

        HandleTxs handleTxs = new HandleTxs(utxoPool);

        Transaction transaction2 = new Transaction();
        transaction2.addInput(transaction.getHash(),0);
        transaction2.addOutput(15,bobKeyPair.getPublicKey());
        transaction2.addOutput(15,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign2 = transaction2.getDataToSign(0);
        transaction2.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign2),0);
//        transaction2.addSignature("penis".getBytes(),0);
        //finalize create hash of transaction and ended operation with transaction
        transaction2.finalize();

        Transaction transaction3 = new Transaction();
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addOutput(15,bobKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign3 = transaction3.getDataToSign(0);
        transaction3.addSignature(bobKeyPair.getPrivateKey().sign(dataToSign3),0);
//        transaction2.addSignature("penis".getBytes(),0);
        //finalize create hash of transaction and ended operation with transaction
        transaction3.finalize();

        Transaction[] transactionsToCheck2 = {transaction2, transaction3};
        handleTxs.handler(transactionsToCheck2);

    }
}
