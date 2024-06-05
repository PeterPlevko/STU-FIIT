public class HandleBlocks {
    private Blockchain blockChain;

    /** Predpokladajme, že blockchain má Genesis blok */
    public HandleBlocks(Blockchain blockChain) {
        this.blockChain = blockChain;
    }

    /**
     * pridaj {@code block} do blockchainu ak je platný.
     * 
     * @return true ak je blok platný a bol pridaný, inak false
     */
    public boolean blockProcess(Block block) {
        if (block == null)
            return false;
        return blockChain.blockAdd(block);
    }

    /** vytvor nový {@code block} nad max height {@code block} */
    public Block blockCreate(RSAKey myAddress) {
        Block parent = blockChain.getBlockAtMaxHeight();
        byte[] parentHash = parent.getHash();
        Block current = new Block(parentHash, myAddress);
        UTXOPool uPool = blockChain.getUTXOPoolAtMaxHeight();
        TransactionPool txPool = blockChain.getTransactionPool();
        HandleTxs handler = new HandleTxs(uPool);
        Transaction[] txs = txPool.getTransactions().toArray(new Transaction[0]);
        Transaction[] rTxs = handler.handler(txs);
        for (int i = 0; i < rTxs.length; i++)
            current.transactionAdd(rTxs[i]);

        current.finalize();
        if (blockChain.blockAdd(current))
            return current;
        else
            return null;
    }

    /** spracuj {@code Transaction} */
    public void txProcess(Transaction tx) {
        blockChain.transactionAdd(tx);
    }
}
