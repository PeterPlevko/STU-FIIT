# utxohunt

### FORKED FROM MIT course [6.892](https://github.com/mit-dci/utxohunt)

### Due Date

The OP_RETURNs are due by Wed 23 Feb 23:59 (CET) or block #2163440.  Given the normal block arrival time, that should be at some point around the midnight.  (If blocks come out super quickly, we'll extend the block deadline as this class is still based on unix time rather than block height.)

## Lab 1

For the first assignment, we're going to make some transactions on the Bitcoin test network.  We're using btcd as our libraries, which is bitcoin written in golang.  The goal is to understand how transactions are constructed and signed, and to become familiar with the utxo model bitcoin uses.

**Testnet3** is a network for testing out bitcoin.  It works almost exactly like the regular bitcoin network (except for small changes to addresses and the difficulty of proof of work) but everyone agrees that testnet coins are not worth anything.  This isn't enforced by anything on the network, it's just something people decide.  The fact that it's testnet3 indicates that this rule failed for the original testnet and testnet2, when people started trading the testnet coins for mainnet coins.

As we went over in lecture and exercise, the bitcoin ledger is built out of transactions.  Transactions are grouped into blocks, and blocks are linked together in a chain, giving a universally agreed upon sequence of transactions.  Transactions have two components: inputs and outputs.  The coins exist as unspent transaction outputs, or UTXOs.  When outputs are spent (as inputs) they are completely consumed.

In this lab you'll be performing many of the functions of wallet software, by identifying outputs to spend, creating transactions, signing them, and broadcasting them to the network.  Most wallet software does this all automatically, but this assignment is more manual so you can see how it works.


## Setup

[Install go](https://golang.org/), either on Windows or your unix machine.  GCP and EWS will most likely work as well, but are not officially supported (Don't ask us how to get things working on gcp/ews)

Once go is running and you have a $GOPATH set, get the class repo:

```$ go get -v github.com/fiitchain/dmblock```

In this exercise you will use files from folder cvicenie-02 and there are 4 files:
```
main.go
addrfrompriv.go  
eztxbuilder.go
opreturn.go
```

Here's what they do:

#### main.go
This is the main function which is called when you run `./utxohunt`

Edit this file to call functions from other files when you run the program.  Much of this is done for you in the commented code.

#### addrfrompriv.go
Creates a public key and bitcoin address from a private key, which is based on a string.  Addresses are copy & pastable encodings of public key hashes.

#### eztxbuilder.go
Puts a transaction together, signs it, and prints the tx hex to the screen.  This can then be copy & pasted to a block explorer like [https://live.blockcypher.com/btc-testnet/pushtx/](https://live.blockcypher.com/btc-testnet/pushtx/), or to your own bitcoin node with `./bitcoin-cli pushrawtransaction (tx hex)`

#### opreturn.go
Similar to eztxbuilder.go, but creates a transaction with 1 input, and 2 outputs.  1 of the outputs is an "OP_RETURN" output which can contain arbitrary data.  Use this to submit your results to the blockchain.

## Task 1: Create a Bitcoin Address

First, look in utxohunt/addrfrompriv.go, and make a keypair.  The AddressFromPrivateKey() function will help you.  Put your own random string in to generate a private key.  If you call the AddressFromPrivateKey() function, it will return that address as a string, as well as give you the compressed public key and pay to witness pubkey hash script.

Save this address (it starts with an "m" or "n").  You'll need this to send the testnet3 coins to yourself.

## Task 2: Find the first treasure hunt transaction

A _block explorer_ is a website which watches the blockchain and parses out information about blocks, addresses, and transactions.  You can use this block explorer to see what's happening on the Bitcoin testnet: [https://blockchain.com/](https://blockchain.com/).

We created a transaction with seventy outputs.
`80a1fb7f855ac5a20a787c984ecb78f61d60645c86d8c2feaf454c54665a1a6e` is the _txid_ or unique identifier of the transaction.  (The txid is the hash of the serialized transaction)

This transaction has many outputs.  The outputs are on the right side, and the inputs (witness_v0_keyhash) are on the left side.

Outpoints are defined by a txid and the output number.  On the block explorer page, the output on the top right is output 0, then 1, 2, etc.

The outputs are all sent to the same address.  The private key which led to this script is the
double-sha256 of "BTC secret key FIIT".

You're going to find and claim an unspent output in this transaction.  Please be nice and leave the rest of them for your other classmates!

## Task 3: Make a transaction

Using EZTxBuilder(), make a transaction sending from the up-for-grabs transaction to your own address.

You will need to modify 

	hashStr

	outPoint (output index number)

	sendToAddressString

	prevAddressString (the address of the "BTC secret key" pubkey)

	wire.NewTxOut (change the amount to less than the input amount.  A few thousand less is enough of a fee)


When you modify the code, you also need to re-compile it.  Run "go build" in that directory to compile.

When you run the code, you'll get a long hex string which you can test by pasting the transaction into the web interface [https://live.blockcypher.com/btc-testnet/pushtx/](https://live.blockcypher.com/btc-testnet/pushtx/).

If you get an error, it might be for one of the following reasons:

1.  Someone has already claimed the output you are trying to get.  Go back and look at the transaction's page and see if the output is still available.  It will say "inputs spent" or the equivalent.	

2.  64: non-mandatory-script-verify-flag (Signature must be zero for
failed CHECK(MULTI)SIG operation).  This means your signature was
invalid.  Often this is because the hash being signed was invalid.
This could be because the previous output you signed and the one you
indicted don't match, the wrong amount is being sent to the
WitnessScript function, or some other invalid data is in the
transaction prior to signing.  An invalid signature can also be caused
by using the wrong key.  In that case, you will usually get this
error:

3.  16: mandatory-script-verify-flag (Script failed an OP_EQUALVERIFY operation).  This means you're probably using the wrong key to sign with, as the public key used and public key hash in the previous output script don't match.

4.  TX decode failed.  That means you're missing some characters, or the transaction is otherwise unintelligable to the bitcoin-cli parser.

If everything worked, you'll see a txid returned (64 hex characters; 32 bytes).  That means you got money.  You can use the same EZTxBuilder() to send that money somewhere else.

## Submitting work

Submit your homework... ON THE BLOCKCHAIN!
Use OP_RETURN!

The opreturn.go file will walk you through how to make an OP_RETURN transaction.

These transactions are on the public blockchain, and we'll find them there.  No need for e-mail or file attachments!

OP_RETURN outputs start with a single opcode (OP_RETURN) which terminates script execution.  So the output can never be spent, and thus is not added to the utxo database on a bitcoin node.  You can put whatever data you want after the OP_RETURN, though it's limited to 40 bytes in length.

For this assignment, sending your coins to an OP_RETURN output with your AIS ID number and name is cryptographic proof that you sent the coins (or someone else did, impersonating you!)

Use opreturn.go to create transactions FROM the transaction you sent to yourself using EZTxBuilder().  The created transaction will send from and to the same address, adding an OP_RETURN output.  Broadcast this to the network, hope it gets into a block, and you're done! 

To parse other OP_RETURNs, or the one you made yourself, try using python.

Here's an example transaction:
`ad9f1eddf568da1a53ebc242aa0c14b9392ad91013eb6a809bd535c420f0430a`
the OP_RETURN is 36383932203936393830447573616e4d

Run the python interpreter. From there:
``` >>> "36383932203936393830447573616e4d".decode("hex")
'6892 96980DusanM' ```

Prefix all your OP_RETURNs with 6892 so it's easy to search for them.

If you only grab a little bit of money and send an OP_RETURN, that's fine.  If you manage to get some of the bonus utxos in the network and send OP_RETURNs, even better!  If you want to get really fancy, try aggregating all your outputs into a single, higher value tx output. (Code left as excercise to the reader)

You will get 3 points if you achieve to do everything as in this tutorial.
You will get 1,5 points if you succeed to get an unspent UTXO, but do not succeed in sending OP_RETURN.
