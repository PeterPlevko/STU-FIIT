import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.SignatureException;

public class Tests {

    static byte[] aliceInitialString = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".getBytes();
    static PRGen alicePrGen = new PRGen(aliceInitialString);

    static byte[] bobInitialString = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab".getBytes();
    static PRGen bobPrGen = new PRGen(bobInitialString);

    static byte[] wrongInitialString = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab".getBytes();
    static PRGen wrongPrGen = new PRGen(wrongInitialString);

    static RSAKeyPair aliceKeyPair = new RSAKeyPair(alicePrGen,809);
    static RSAKeyPair bobKeyPair = new RSAKeyPair(bobPrGen,1511);
    static RSAKeyPair wrongKeyPair = new RSAKeyPair(bobPrGen,1611);

    //Test 1: test txIsValid() s platnými transakciami
    public static boolean unit_test_1() throws SignatureException {

        Main_faza1.Tx tx = new Main_faza1.Tx();
        tx.addOutput(10,  bobKeyPair.getPublicKey());

        // Táto hodnota nemá žiadny význam, ale tx.getDataToSign(0) k nej pristúpi v
        // prevTxHash;
        byte[] initialHash = BigInteger.valueOf(0).toByteArray();
        tx.addInput(initialHash, 0);

        tx.signTx(bobKeyPair.getPrivateKey(), 0);

        /*
         * Nastav UTXOPool
         */
        // Výstup root transakcie je inicializačný neminutý (unspent) výstup.
        UTXOPool utxoPool = new UTXOPool();
        UTXO utxo = new UTXO(tx.getHash(), 0);
        utxoPool.addUTXO(utxo, tx.getOutput(0));

        /**
         *
         * Vytvor test transakciu
         */
        Main_faza1.Tx tx2 = new Main_faza1.Tx();

        // Transaction.Output z tx na pozícii 0 má hodnotu 10
        tx2.addInput(tx.getHash(), 0);

        // Rozdelíme coin hodnoty 10 na 3 coiny a všetky pošleme pre jednoduchosť
        // na rovnakú adresu
        // (Alice)
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(3, aliceKeyPair.getPublicKey());
        tx2.addOutput(2, aliceKeyPair.getPublicKey());
        // Všimnite si, že v reálnom svete by sa pre hodnoty používali typy s fixed-point,
        // nie double. Doubles predstavujú floating-point, a teda majú aj chyby
        // zaokrúhľovania. Tento typ by mal byť napríklad BigInteger a pracovať
        // s najmenšími zlomkami mincí (satoshi v Bitcoine).

        // Existuje iba jeden (na pozícii 0) Transaction.Input v tx2
        // a obsahuje mincu od Boba, preto musím túto tx podpísať s
        // privátnym kľúčom Boba
        tx2.signTx(bobKeyPair.getPrivateKey(), 0);

        /**
         * Spusti test
         */
        // Pamätajte, že utxoPool obsahuje jeden neminutý Transaction.Output,
        // ktorým je minca od Boba.
        HandleTxs handleTxs = new HandleTxs(utxoPool);
        return handleTxs.txIsValid(tx2);

    }

    //Test 2: test txIsValid() s transakciami obsahujúcimi podpisy nekorektných dát
    public static boolean unit_test_2() throws SignatureException {

        Main_faza1.Tx tx = new Main_faza1.Tx();
        tx.addOutput(10,  bobKeyPair.getPublicKey());

        // Táto hodnota nemá žiadny význam, ale tx.getDataToSign(0) k nej pristúpi v
        // prevTxHash;
        byte[] initialHash = BigInteger.valueOf(0).toByteArray();
        tx.addInput(initialHash, 0);

        tx.signTx(bobKeyPair.getPrivateKey(), 0);

        /*
         * Nastav UTXOPool
         */
        // Výstup root transakcie je inicializačný neminutý (unspent) výstup.
        UTXOPool utxoPool = new UTXOPool();
        UTXO utxo = new UTXO(tx.getHash(), 0);
        utxoPool.addUTXO(utxo, tx.getOutput(0));

        /**
         *
         * Vytvor test transakciu
         */
        Main_faza1.Tx tx2 = new Main_faza1.Tx();

        // Transaction.Output z tx na pozícii 0 má hodnotu 10
        tx2.addInput(tx.getHash(), 0);

        // Rozdelíme coin hodnoty 10 na 3 coiny a všetky pošleme pre jednoduchosť
        // na rovnakú adresu
        // (Alice)
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(3, aliceKeyPair.getPublicKey());
        tx2.addOutput(2, aliceKeyPair.getPublicKey());
        // Všimnite si, že v reálnom svete by sa pre hodnoty používali typy s fixed-point,
        // nie double. Doubles predstavujú floating-point, a teda majú aj chyby
        // zaokrúhľovania. Tento typ by mal byť napríklad BigInteger a pracovať
        // s najmenšími zlomkami mincí (satoshi v Bitcoine).

        // Existuje iba jeden (na pozícii 0) Transaction.Input v tx2
        // a obsahuje mincu od Boba, preto musím túto tx podpísať s
        // privátnym kľúčom Boba
        tx2.signTx(bobKeyPair.getPrivateKey(), 5);

        /**
         * Spusti test
         */
        // Pamätajte, že utxoPool obsahuje jeden neminutý Transaction.Output,
        // ktorým je minca od Boba.
        HandleTxs handleTxs = new HandleTxs(utxoPool);
        return handleTxs.txIsValid(tx2);
    }

    //Test 3: test txIsValid() s transakciami obsahujúcimi podpisy použitím neplatných privátnych kľúčov
    public static boolean unit_test_3() throws SignatureException {
        Main_faza1.Tx tx = new Main_faza1.Tx();
        tx.addOutput(10,  bobKeyPair.getPublicKey());

        // Táto hodnota nemá žiadny význam, ale tx.getDataToSign(0) k nej pristúpi v
        // prevTxHash;
        byte[] initialHash = BigInteger.valueOf(0).toByteArray();
        tx.addInput(initialHash, 0);

        tx.signTx(bobKeyPair.getPrivateKey(), 0);

        /*
         * Nastav UTXOPool
         */
        // Výstup root transakcie je inicializačný neminutý (unspent) výstup.
        UTXOPool utxoPool = new UTXOPool();
        UTXO utxo = new UTXO(tx.getHash(), 0);
        utxoPool.addUTXO(utxo, tx.getOutput(0));

        /**
         *
         * Vytvor test transakciu
         */
        Main_faza1.Tx tx2 = new Main_faza1.Tx();

        // Transaction.Output z tx na pozícii 0 má hodnotu 10
        tx2.addInput(tx.getHash(), 0);

        // Rozdelíme coin hodnoty 10 na 3 coiny a všetky pošleme pre jednoduchosť
        // na rovnakú adresu
        // (Alice)
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(3, aliceKeyPair.getPublicKey());
        tx2.addOutput(2, aliceKeyPair.getPublicKey());
        // Všimnite si, že v reálnom svete by sa pre hodnoty používali typy s fixed-point,
        // nie double. Doubles predstavujú floating-point, a teda majú aj chyby
        // zaokrúhľovania. Tento typ by mal byť napríklad BigInteger a pracovať
        // s najmenšími zlomkami mincí (satoshi v Bitcoine).

        // Existuje iba jeden (na pozícii 0) Transaction.Input v tx2
        // a obsahuje mincu od Boba, preto musím túto tx podpísať s
        // privátnym kľúčom Boba
        tx2.signTx(wrongKeyPair.getPrivateKey(), 0);

        /**
         * Spusti test
         */
        // Pamätajte, že utxoPool obsahuje jeden neminutý Transaction.Output,
        // ktorým je minca od Boba.
        HandleTxs handleTxs = new HandleTxs(utxoPool);
        return handleTxs.txIsValid(tx2);
    }

    //Test 4: test txIsValid() s transakciami, ktorých celkový output prekračuje celkový input
    public static boolean unit_test_4() throws SignatureException {
        Main_faza1.Tx tx = new Main_faza1.Tx();
        tx.addOutput(10,  bobKeyPair.getPublicKey());

        // Táto hodnota nemá žiadny význam, ale tx.getDataToSign(0) k nej pristúpi v
        // prevTxHash;
        byte[] initialHash = BigInteger.valueOf(0).toByteArray();
        tx.addInput(initialHash, 0);

        tx.signTx(bobKeyPair.getPrivateKey(), 0);

        /*
         * Nastav UTXOPool
         */
        // Výstup root transakcie je inicializačný neminutý (unspent) výstup.
        UTXOPool utxoPool = new UTXOPool();
        UTXO utxo = new UTXO(tx.getHash(), 0);
        utxoPool.addUTXO(utxo, tx.getOutput(0));

        /**
         *
         * Vytvor test transakciu
         */
        Main_faza1.Tx tx2 = new Main_faza1.Tx();

        // Transaction.Output z tx na pozícii 0 má hodnotu 10
        tx2.addInput(tx.getHash(), 0);

        // Rozdelíme coin hodnoty 10 na 3 coiny a všetky pošleme pre jednoduchosť
        // na rovnakú adresu
        // (Alice)
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(2, aliceKeyPair.getPublicKey());
        // Všimnite si, že v reálnom svete by sa pre hodnoty používali typy s fixed-point,
        // nie double. Doubles predstavujú floating-point, a teda majú aj chyby
        // zaokrúhľovania. Tento typ by mal byť napríklad BigInteger a pracovať
        // s najmenšími zlomkami mincí (satoshi v Bitcoine).

        // Existuje iba jeden (na pozícii 0) Transaction.Input v tx2
        // a obsahuje mincu od Boba, preto musím túto tx podpísať s
        // privátnym kľúčom Boba
        tx2.signTx(bobKeyPair.getPrivateKey(), 0);

        /**
         * Spusti test
         */
        // Pamätajte, že utxoPool obsahuje jeden neminutý Transaction.Output,
        // ktorým je minca od Boba.
        HandleTxs handleTxs = new HandleTxs(utxoPool);
        return handleTxs.txIsValid(tx2);
    }

    //Test 5: test txIsValid() s transakciami, ktoré deklarujú outputy mimo aktuálneho utxoPool
    public static boolean unit_test_5() throws SignatureException {
        Main_faza1.Tx tx = new Main_faza1.Tx();
        tx.addOutput(10,  bobKeyPair.getPublicKey());

        // Táto hodnota nemá žiadny význam, ale tx.getDataToSign(0) k nej pristúpi v
        // prevTxHash;
        byte[] initialHash = BigInteger.valueOf(0).toByteArray();
        tx.addInput(initialHash, 0);

        tx.signTx(bobKeyPair.getPrivateKey(), 0);

        /*
         * Nastav UTXOPool
         */
        // Výstup root transakcie je inicializačný neminutý (unspent) výstup.
        UTXOPool utxoPool = new UTXOPool();
        UTXO utxo = new UTXO(tx.getHash(), 0);

//        utxoPool.addUTXO(utxo, tx.getOutput(0));

        /**
         *
         * Vytvor test transakciu
         */
        Main_faza1.Tx tx2 = new Main_faza1.Tx();

        // Transaction.Output z tx na pozícii 0 má hodnotu 10
        tx2.addInput(tx.getHash(), 0);

        // Rozdelíme coin hodnoty 10 na 3 coiny a všetky pošleme pre jednoduchosť
        // na rovnakú adresu
        // (Alice)
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(3, aliceKeyPair.getPublicKey());
        tx2.addOutput(2, aliceKeyPair.getPublicKey());
        // Všimnite si, že v reálnom svete by sa pre hodnoty používali typy s fixed-point,
        // nie double. Doubles predstavujú floating-point, a teda majú aj chyby
        // zaokrúhľovania. Tento typ by mal byť napríklad BigInteger a pracovať
        // s najmenšími zlomkami mincí (satoshi v Bitcoine).

        // Existuje iba jeden (na pozícii 0) Transaction.Input v tx2
        // a obsahuje mincu od Boba, preto musím túto tx podpísať s
        // privátnym kľúčom Boba
        tx2.signTx(bobKeyPair.getPrivateKey(), 0);

        /**
         * Spusti test
         */
        // Pamätajte, že utxoPool obsahuje jeden neminutý Transaction.Output,
        // ktorým je minca od Boba.
        HandleTxs handleTxs = new HandleTxs(utxoPool);
        return handleTxs.txIsValid(tx2);
    }

    //Test 6: test txIsValid() s transakciami, ktoré deklarujú rovnaký UTXO viackrát
    public static boolean unit_test_6() throws SignatureException {
        Main_faza1.Tx tx = new Main_faza1.Tx();
        tx.addOutput(10,  bobKeyPair.getPublicKey());

        // Táto hodnota nemá žiadny význam, ale tx.getDataToSign(0) k nej pristúpi v
        // prevTxHash;
        byte[] initialHash = BigInteger.valueOf(0).toByteArray();
        tx.addInput(initialHash, 0);

        tx.signTx(bobKeyPair.getPrivateKey(), 0);

        /*
         * Nastav UTXOPool
         */
        // Výstup root transakcie je inicializačný neminutý (unspent) výstup.
        UTXOPool utxoPool = new UTXOPool();
        UTXO utxo = new UTXO(tx.getHash(), 0);
        utxoPool.addUTXO(utxo, tx.getOutput(0));

        /**
         *
         * Vytvor test transakciu
         */
        Main_faza1.Tx tx2 = new Main_faza1.Tx();

        // Transaction.Output z tx na pozícii 0 má hodnotu 10
        tx2.addInput(tx.getHash(), 0);
        tx2.addInput(tx.getHash(), 0);

        // Rozdelíme coin hodnoty 10 na 3 coiny a všetky pošleme pre jednoduchosť
        // na rovnakú adresu
        // (Alice)
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(3, aliceKeyPair.getPublicKey());
        tx2.addOutput(2, aliceKeyPair.getPublicKey());
        // Všimnite si, že v reálnom svete by sa pre hodnoty používali typy s fixed-point,
        // nie double. Doubles predstavujú floating-point, a teda majú aj chyby
        // zaokrúhľovania. Tento typ by mal byť napríklad BigInteger a pracovať
        // s najmenšími zlomkami mincí (satoshi v Bitcoine).

        // Existuje iba jeden (na pozícii 0) Transaction.Input v tx2
        // a obsahuje mincu od Boba, preto musím túto tx podpísať s
        // privátnym kľúčom Boba
        tx2.signTx(bobKeyPair.getPrivateKey(), 0);
        tx2.signTx(bobKeyPair.getPrivateKey(), 1);

        /**
         * Spusti test
         */
        // Pamätajte, že utxoPool obsahuje jeden neminutý Transaction.Output,
        // ktorým je minca od Boba.
        HandleTxs handleTxs = new HandleTxs(utxoPool);
        return handleTxs.txIsValid(tx2);
    }

    //Test 7: test txIsValid() s transakciami, ktoré obsahujú zápornú output hodnotu
    public static boolean unit_test_7() throws SignatureException {
        Main_faza1.Tx tx = new Main_faza1.Tx();
        tx.addOutput(10,  bobKeyPair.getPublicKey());

        // Táto hodnota nemá žiadny význam, ale tx.getDataToSign(0) k nej pristúpi v
        // prevTxHash;
        byte[] initialHash = BigInteger.valueOf(0).toByteArray();
        tx.addInput(initialHash, 0);

        tx.signTx(bobKeyPair.getPrivateKey(), 0);

        /*
         * Nastav UTXOPool
         */
        // Výstup root transakcie je inicializačný neminutý (unspent) výstup.
        UTXOPool utxoPool = new UTXOPool();
        UTXO utxo = new UTXO(tx.getHash(), 0);
        utxoPool.addUTXO(utxo, tx.getOutput(0));

        /**
         *
         * Vytvor test transakciu
         */
        Main_faza1.Tx tx2 = new Main_faza1.Tx();

        // Transaction.Output z tx na pozícii 0 má hodnotu 10
        tx2.addInput(tx.getHash(), 0);

        // Rozdelíme coin hodnoty 10 na 3 coiny a všetky pošleme pre jednoduchosť
        // na rovnakú adresu
        // (Alice)
        tx2.addOutput(5, aliceKeyPair.getPublicKey());
        tx2.addOutput(-3, aliceKeyPair.getPublicKey());
        tx2.addOutput(2, aliceKeyPair.getPublicKey());
        // Všimnite si, že v reálnom svete by sa pre hodnoty používali typy s fixed-point,
        // nie double. Doubles predstavujú floating-point, a teda majú aj chyby
        // zaokrúhľovania. Tento typ by mal byť napríklad BigInteger a pracovať
        // s najmenšími zlomkami mincí (satoshi v Bitcoine).

        // Existuje iba jeden (na pozícii 0) Transaction.Input v tx2
        // a obsahuje mincu od Boba, preto musím túto tx podpísať s
        // privátnym kľúčom Boba
        tx2.signTx(bobKeyPair.getPrivateKey(), 0);

        /**
         * Spusti test
         */
        // Pamätajte, že utxoPool obsahuje jeden neminutý Transaction.Output,
        // ktorým je minca od Boba.
        HandleTxs handleTxs = new HandleTxs(utxoPool);
        return handleTxs.txIsValid(tx2);
    }

    //Test 8: test handleTxs() s jednoduchými a platnými transakciami
    public static boolean unit_test_8(Transaction transaction,UTXOPool utxoPool){
        HandleTxs handleTxs = new HandleTxs(utxoPool);

        Transaction transaction2 = new Transaction();
        transaction2.addInput(transaction.getHash(),0);
        transaction2.addOutput(15,bobKeyPair.getPublicKey());
        transaction2.addOutput(15,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign2 = transaction2.getDataToSign(0);
        transaction2.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign2),0);
        transaction2.finalize();

        Transaction[] transactionsToCheck = {transaction2};
        handleTxs.handler(transactionsToCheck);


        Transaction transaction3 = new Transaction();
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addOutput(15,bobKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign3 = transaction3.getDataToSign(0);
        transaction3.addSignature(bobKeyPair.getPrivateKey().sign(dataToSign3),0);
        transaction3.finalize();

        Transaction[] transactionsToCheck2 = {transaction3};
        return handleTxs.handler(transactionsToCheck2).length == transactionsToCheck2.length;
    }

    //Test 9: test handleTxs() s jednoduchými, ale niektorými neplatnými transakciami kvôli neplatným podpisom
    public static boolean unit_test_9(Transaction transaction,UTXOPool utxoPool){

        HandleTxs handleTxs = new HandleTxs(utxoPool);

        Transaction transaction2 = new Transaction();
        transaction2.addInput(transaction.getHash(),0);
        transaction2.addOutput(15,bobKeyPair.getPublicKey());
        transaction2.addOutput(15,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign2 = transaction2.getDataToSign(0);
        transaction2.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign2),0);
        transaction2.finalize();

        Transaction[] transactionsToCheck = {transaction2};
        handleTxs.handler(transactionsToCheck);


        Transaction transaction3 = new Transaction();
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addOutput(15,bobKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign3 = transaction3.getDataToSign(0);
        transaction3.addSignature(wrongKeyPair.getPrivateKey().sign(dataToSign3),0);
        transaction3.finalize();

        Transaction[] transactionsToCheck2 = {transaction3};
        return handleTxs.handler(transactionsToCheck2).length == transactionsToCheck2.length;

    }
//
//    //Test 10: test handleTxs() s jednoduchými, ale niektorými neplatnými transakciami kvôli input < output
    public static boolean unit_test_10(Transaction transaction,UTXOPool utxoPool){
        HandleTxs handleTxs = new HandleTxs(utxoPool);

        Transaction transaction2 = new Transaction();
        transaction2.addInput(transaction.getHash(),0);
        transaction2.addOutput(15,bobKeyPair.getPublicKey());
        transaction2.addOutput(15,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign2 = transaction2.getDataToSign(0);
        transaction2.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign2),0);
        transaction2.finalize();

        Transaction[] transactionsToCheck = {transaction2};
        handleTxs.handler(transactionsToCheck);


        Transaction transaction3 = new Transaction();
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addOutput(90,bobKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign3 = transaction3.getDataToSign(0);
        transaction3.addSignature(bobKeyPair.getPrivateKey().sign(dataToSign3),0);
        transaction3.finalize();

        Transaction[] transactionsToCheck2 = {transaction3};
        return handleTxs.handler(transactionsToCheck2).length == transactionsToCheck2.length;
    }

//    //Test 11: test handleTxs() s jednoduchými a platnými transakciami s nejakými double spendmi
    public static boolean unit_test_11(Transaction transaction, UTXOPool utxoPool){
        HandleTxs handleTxs = new HandleTxs(utxoPool);

        Transaction transaction2 = new Transaction();
        transaction2.addInput(transaction.getHash(),0);
        transaction2.addOutput(15,bobKeyPair.getPublicKey());
        transaction2.addOutput(15,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign2 = transaction2.getDataToSign(0);
        transaction2.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign2),0);
        transaction2.finalize();

        Transaction[] transactionsToCheck = {transaction2};
        handleTxs.handler(transactionsToCheck);


        Transaction transaction3 = new Transaction();
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addOutput(15,bobKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign3 = transaction3.getDataToSign(0);
        transaction3.addSignature(bobKeyPair.getPrivateKey().sign(dataToSign3),0);
        transaction3.finalize();

        Transaction[] transactionsToCheck2 = {transaction3};
        return handleTxs.handler(transactionsToCheck2).length == transactionsToCheck2.length;
    }

    //Test 12: test handleTxs() s platnými tx, niektoré sú jednoduché a niektoré závisia od iných tx
    public static boolean unit_test_12(Transaction transaction, UTXOPool utxoPool){
        HandleTxs handleTxs = new HandleTxs(utxoPool);

        Transaction transaction2 = new Transaction();
        transaction2.addInput(transaction.getHash(),0);
        transaction2.addOutput(15,bobKeyPair.getPublicKey());
        transaction2.addOutput(15,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign2 = transaction2.getDataToSign(0);
        transaction2.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign2),0);
        transaction2.finalize();


        Transaction transaction3 = new Transaction();
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addOutput(15,bobKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign3 = transaction3.getDataToSign(0);
        transaction3.addSignature(bobKeyPair.getPrivateKey().sign(dataToSign3),0);
        transaction3.finalize();

        Transaction[] transactionsToCheck2 = {transaction2,transaction3};
        return handleTxs.handler(transactionsToCheck2).length == transactionsToCheck2.length;
    }

    //Test 13: test handleTxs() s platnými a jednoduchými tx, ale niektoré berú input z neexistujúcich utxo
    public static boolean unit_test_13(Transaction transaction, UTXOPool utxoPool){
        HandleTxs handleTxs = new HandleTxs(utxoPool);

        Transaction transaction2 = new Transaction();
        transaction2.addInput(transaction.getHash(),0);
        transaction2.addOutput(15,bobKeyPair.getPublicKey());
        transaction2.addOutput(15,aliceKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign2 = transaction2.getDataToSign(0);
        transaction2.addSignature(aliceKeyPair.getPrivateKey().sign(dataToSign2),0);
        transaction2.finalize();

        Transaction[] transactionsToCheck = {transaction2};
        handleTxs.handler(transactionsToCheck);


        Transaction transaction3 = new Transaction();
        transaction3.addInput(transaction2.getHash(),5);
        transaction3.addInput(transaction2.getHash(),0);
        transaction3.addOutput(15,bobKeyPair.getPublicKey());

        //transaction must be signed to be valid, we will sign it with private key
        byte[] dataToSign3 = transaction3.getDataToSign(0);
        transaction3.addSignature(bobKeyPair.getPrivateKey().sign(dataToSign3),0);
        transaction3.finalize();

        Transaction[] transactionsToCheck2 = {transaction3};
        return handleTxs.handler(transactionsToCheck2).length == transactionsToCheck2.length;
    }


    public static void main(String[] args) throws SignatureException {

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

//
        System.out.println("Test 1 by mal byt true: " + unit_test_1());
//        System.out.println("Test 2 by mal byt false: " + unit_test_2());
        System.out.println("Test 3 by mal byt false: " + unit_test_3());
        System.out.println("Test 4 by mal byt false: " + unit_test_4());
        System.out.println("Test 5 by mal byt false: " + unit_test_5());
        System.out.println("Test 6 by mal byt false: " + unit_test_6());
        System.out.println("Test 7 by mal byt false: " + unit_test_7());
        System.out.println("Test 8 by mal byt true: " + unit_test_8(transaction, utxoPool));
        System.out.println("Test 9 by mal byt false: " + unit_test_9(transaction, utxoPool));
        System.out.println("Test 10 by mal byt false: " + unit_test_10(transaction, utxoPool));
        System.out.println("Test 11 by mal byt false: " + unit_test_11(transaction, utxoPool));
        System.out.println("Test 12 by mal byt true: " + unit_test_12(transaction, utxoPool));
        System.out.println("Test 13 by mal byt false: " + unit_test_13(transaction, utxoPool));




    }
}
