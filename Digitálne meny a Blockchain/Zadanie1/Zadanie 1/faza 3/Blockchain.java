// Meno študenta:
// Blockchain by mal na uspokojenie funkcií udržiavať iba obmedzené množstvo uzlov
// Nemali by ste mať všetky bloky pridané do blockchainu v pamäti  
// pretože by to spôsobilo pretečenie pamäte.
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

public class Blockchain {
    public static final int CUT_OFF_AGE = 12;
    TransactionPool transactionPool;
    private ArrayList<BlockNode> blockchain = new ArrayList<>();

    // všetky potrebné informácie na spracovanie bloku v reťazi blokov
    private class BlockNode {
        public Block b;
        public BlockNode parent;
        public ArrayList<BlockNode> children;
        public int height;
        // utxo pool na vytvorenie nového bloku na vrchu tohto bloku
        private UTXOPool uPool;

        public BlockNode(Block b, BlockNode parent, UTXOPool uPool) {
            this.b = b;
            this.parent = parent;
            children = new ArrayList<BlockNode>();
            this.uPool = uPool;
            if (parent != null) {
                height = parent.height + 1;
                parent.children.add(this);
            } else {
                height = 1;
            }
        }
        public UTXOPool getUTXOPoolCopy() {
            return new UTXOPool(uPool);
         }
    }
    /**
     * vytvor prázdny blockchain iba s Genesis blokom. Predpokladajme, že
     * {@code genesisBlock} je platný blok
     */
    public Blockchain(Block genesisBlock) {
        // create plain UTXO pool with empty transaction pool
        UTXOPool uPool = new UTXOPool();
        transactionPool = new TransactionPool();
        UTXO firstUTXO = new UTXO(genesisBlock.getCoinbase().getHash(),0);
        uPool.addUTXO(firstUTXO,genesisBlock.getCoinbase().getOutput(0));
        // create new blocknode
        BlockNode firstBlockNode = new BlockNode(genesisBlock,null, uPool);
        blockchain.add(firstBlockNode);
    }

    /** Získaj maximum height blok */
    public Block getBlockAtMaxHeight() {
        BlockNode highestBlockNode = blockchain.get(0);
        for(BlockNode blocknode :blockchain){
            if(blocknode.height > highestBlockNode.height){
                highestBlockNode = blocknode;
            }
        }
        return highestBlockNode.b;
    }

    /** Získaj UTXOPool na ťaženie nového bloku na vrchu max height blok */
    public UTXOPool getUTXOPoolAtMaxHeight() {
        BlockNode highestBlockNode = blockchain.get(0);
        for(BlockNode blocknode :blockchain){
            if(blocknode.height > highestBlockNode.height){
                highestBlockNode = blocknode;
            }
        }
        return highestBlockNode.uPool;

    }

    /** Získaj pool transakcií na vyťaženie nového bloku */
    public TransactionPool getTransactionPool() {
        return transactionPool;
    }

    /**
     * Pridaj {@code block} do blockchainu, ak je platný. Kvôli platnosti by mali
     * byť všetky transakcie platné a blok by mal byť na
     * {@code height > (maxHeight - CUT_OFF_AGE)}.
     *
     * Môžete napríklad vyskúšať vytvoriť nový blok nad blokom Genesis (výška bloku
     * 2), ak height blockchainu je {@code <=
     * CUT_OFF_AGE + 1}. Len čo {@code height > CUT_OFF_AGE + 1}, nemôžete vytvoriť
     * nový blok vo výške 2.
     *
     * @return true, ak je blok úspešne pridaný
     */
    public boolean blockAdd(Block block) {
        if (block.getPrevBlockHash() == null) {
            return false;
        }
        // utxo pool of parent
        BlockNode parentNode = blockchain.get(0);
        for(BlockNode checkedNode: blockchain){
            if(checkedNode.b.getHash() == block.getPrevBlockHash()){
                parentNode = checkedNode;
                break;
            }
        }
        HandleTxs handler = new HandleTxs(parentNode.getUTXOPoolCopy());
        Transaction[] transactionToAdd = handler.handler(block.getTransactions().toArray(new Transaction[0]));
        if (transactionToAdd.length != block.getTransactions().toArray(new Transaction[0]).length) {
            return false;
        }
        int proposedHeight = parentNode.height + 1;
        if (proposedHeight <= getMaxHeight() - CUT_OFF_AGE) {
            return false;
        }

        UTXOPool newUTXOPool = handler.UTXOPoolGet();
        // add coin base to UTXO pool
        UTXO firstUTXO = new UTXO(block.getCoinbase().getHash(),0);
        newUTXOPool.addUTXO(firstUTXO,block.getCoinbase().getOutput(0));

        //get transaction out of pool
        for(Transaction transaction: transactionToAdd){
            getTransactionPool().removeTransaction(transaction.getHash());
        }

        BlockNode node = new BlockNode(block, parentNode, newUTXOPool);
        blockchain.add(node);

        //for saving memory delete confirmed blocks
        blockchain.removeIf(s -> s.height < getMaxHeight() - CUT_OFF_AGE - 1);

        return true;
    }

    /** Pridaj transakciu do transakčného poolu */
    public void transactionAdd(Transaction tx) {
        transactionPool.addTransaction(tx);
    }

    public int getMaxHeight(){
        int maxHeight = 0;
        for(BlockNode node: blockchain){
            if(node.height > maxHeight){
                maxHeight = node.height;
            }
        }
        return maxHeight;
    }
}