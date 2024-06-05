package main

import (
	"bytes"
	"fmt"

	"github.com/adiabat/btcd/chaincfg"
)

var (
	// we're running on BC2.  Which now uses mainnet addresses.
	testnet3Parameters = &chaincfg.MainNetParams
)

// This is the main function -- c

func main() {
	fmt.Printf("BC2 utxohunt\n")

	// Task #1 make an address pair
	// Call AddressFrom PrivateKey() to make a keypair

	// s, err := AddressFromPrivateKey()
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Printf("address: %s\n", s)

	// Task #2 make a transaction
	// Call EZTxBuilder to make a transaction
	tx := OpReturnTxBuilder()
	var buf bytes.Buffer
	tx.Serialize(&buf)
	fmt.Printf("tx in hex:\n%x\n", buf.Bytes())
	//

	// task 3, call OpReturnTxBuilder() the same way EZTxBuilder() was used

	return
}
