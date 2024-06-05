// BattleshipPlayer.js
//    Defines a Battleship player and the functions that the player calls to
//    interact with the solidity contract
// =============================================================================
//                                EDIT THIS FILE
// =============================================================================
//      written by: Roman Páleník
// #############################################################################

// sets up web3.js
GAS_PRICE = 4200000;
let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

// This is the ABI for your contract (get it from Truffle, from 'bin' folder, or from Remix, in the 'Compile' tab )
// ============================================================
var abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "start_of_timeout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
    ],
    name: "timeout",
    type: "event",
  },
  {
    inputs: [],
    name: "store_bid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "merkle_root",
        type: "bytes32",
      },
    ],
    name: "store_board_commitment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "opening_nonce",
        type: "bytes",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "guess_leaf_index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "check_one_ship",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim_win",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "opponent",
        type: "address",
      },
    ],
    name: "forfeit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "opening_nonce",
        type: "bytes",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "guess_leaf_index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "accuse_cheating",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "opponent",
        type: "address",
      },
    ],
    name: "claim_opponent_left",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "opponent",
        type: "address",
      },
    ],
    name: "handle_timeout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "opponent",
        type: "address",
      },
    ],
    name: "claim_timeout_winnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "is_game_over",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "a",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "b",
        type: "bytes32",
      },
    ],
    name: "merge_bytes32",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "opening_nonce",
        type: "bytes",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "guess_leaf_index",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "commit",
        type: "bytes32",
      },
    ],
    name: "verify_opening",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "array",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "isInArray",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

// TODO: replace this with your contract's ABI
// ============================================================
abiDecoder.addABI(abi);

// This is the address of the contract you want to connect to; copy this from Remix
// TODO: fill this in with your contract's address/hash
let contractAddress = "0x69Faf362F7B53C15CEdB32d1a29850d59C37b2b7";
// Reads in the ABI
var Battleship = new web3.eth.Contract(abi, contractAddress);

class BattleshipPlayer {
  /* constructor
    \brief
      constructor for both battleship players is called after the "start game" button is pressed
      both players are initialized with the following parameters
    \params:
      name          - string - either 'player1' or 'player2', for jquery only for the most part
      my_addr       - string - this player's address in hex
      opponent_addr - string - this player's opponent's address in hex for this game of battleship
      ante          - int    - amount of ether being wagered
  */
  constructor(name, my_addr, opponent_addr, ante) {
    this.my_name = name;
    this.my_addr = my_addr;
    this.opp_addr = opponent_addr;
    this.guesses = Array(BOARD_LEN).fill(Array(BOARD_LEN).fill(false));
    this.my_board = null;

    // ##############################################################################
    //    TODO initialize a battleship game on receiving solidity contract
    //		- Save anything you'd like to track locally
    //	  - Ideas: hits, opponent's last guess/response, whether timer is running, etc.
    //		- Register an event handler for any events you emit in solidity.
    //			(see the spec for an example of how to do this)
    // ##############################################################################
    // Your code here
    this.my_ships = [];
    this.my_hits = [];
    this.last_opponent_guess = 0;
    console.log("constructor");
  }

  async place_bet(ante) {
    // ##############################################################################
    //    TODO make a call to the contract to store the bid
    //	  Hint: When you send value with a contract transaction, it must be in WEI.
    //					wei = eth*10**18
    // ##############################################################################
    // Your code here

    Battleship.methods
      .store_bid()
      .send({ from: this.my_addr, value: ante * 10 ** 18, gas: 4200000 });

    console.log("place bet done");
  }

  /* initialize_board
    \brief
      sets class variable my_board and creates a commitment to the board, which is returned
      and sent to the opponent
    \params:
      initialize_board - [[bool]] - array of arrays where true represents a ship's presense
      callback - callback to call with commitment as argument
  */
  async initialize_board(initial_board) {
    this.my_board = initial_board;
    console.log("initialize board", initial_board);
    // Store the positions of your ten ships locally, so you can prove it if you win
    for (var i = 0; i < BOARD_LEN; i++) {
      for (var j = 0; j < BOARD_LEN; j++) {
        if (this.my_board[i][j]) {
          this.my_ships.push([i, j]);
        }
      }
    }

    // set nonces to build our commitment with
    this.nonces = get_nonces(); // get_nonces defined in util.js
    // build commitment to our board
    const commit = build_board_commitment(this.my_board, this.nonces); // build_board_commitment defined in util.js
    // sign this commitment
    const sig = sign_msg(commit, this.my_addr);

    // ##############################################################################
    //    TODO store the board commitment in the contract
    // ##############################################################################
    // Your code here
    console.log(commit);
    Battleship.methods
      .store_board_commitment(commit)
      .send({ from: this.my_addr });

    return [commit, sig];
  }

  /* receive_initial_board_commit
    \brief
      called with the returned commitment from initialize_board() as argument
    \params:
      commitment - a commitment to an initial board state received from opponent
      signature - opponent signature on commitment
  */
  receive_initial_board_commit(commitment, signature) {
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //    DONE this function has been completed for you.
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (!check_signature(commitment, signature, this.opp_addr)) {
      throw "received an invalid signature from opponent as initial board commit";
    }
    this.opponent_commit = commitment;
    this.opponent_commit_sig = signature;
  }

  /* build_guess
    \brief:
      build a guess to be sent to the opponent
    \params
      i - int - the row of the guessed board square
      j - int - the column of the guessed board square
    \return:
      signature - Promise - a signature on [i, j]
  */
  build_guess(i, j) {
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //    DONE this function has been completed for you.
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Sends signed guess to opponent off-chain
    return sign_msg(JSON.stringify([i, j]), this.my_addr); // sign_msg defined in util.js
  }

  /* respond_to_guess
    \brief:
      called when the opponent guesses a board square (i, j)
    \params:
      i - int - the row of the guessed board square
      j - int - the column of the guessed board square
      signature - signature that proves the opponent is guessing (i, j)
    \return:
      hit (opening)   - bool   	- did the guess hit one of your ships?
      nonce 					- bytes32 - nonce for square [i, j]
      proof 					- object 	- proof that the guess hit or missed a ship
  */
  respond_to_guess(i, j, signature) {
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //    DONE this function has been completed for you.
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Check first that the guess is signed, if not, we don't respond
    if (!check_signature(JSON.stringify([i, j]), signature, this.opp_addr)) {
      //check_signature defined in util.js
      throw "received an invalid signature from opponent as initial board commit";
    }
    // get truth value for this cell along with the associated nonce
    const opening = this.my_board[i][j],
      nonce = this.nonces[i][j];
    // write proof for this opening
    const proof = get_proof_for_board_guess(this.my_board, this.nonces, [i, j]);
    // return to opponent
    return [opening, nonce, proof];
  }

  /* receive_response_to_guess
    \brief:
      called with the response from respond_to_guess()
    \params:
      response - [hit, proof] - the object returned from respond_to_guess()
  */
  receive_response_to_guess(i, j, response) {
    // unpack response
    let [opening, nonce, proof] = response;
    // verify that opponent responded to the query
    if (!verify_opening(opening, nonce, proof, this.opponent_commit, [i, j])) {
      throw "opponent's response is not an opening of the square I asked for";
    }

    // ##############################################################################
    //    TODO store local state as needed to prove your winning moves in claim_win
    //	  Hint: What arguments do you need to pass to the contract to check a ship?
    // ##############################################################################
    // Your code here
    this.opening = opening;
    this.nonce = nonce;
    this.proof = proof;
    this.last_opponent_guess = i * BOARD_LEN + j;

    if (opening == true) {
      this.my_hits.push({
        nonce: web3.utils.asciiToHex(
          JSON.stringify(opening) + JSON.stringify(nonce)
        ),
        proof: proof,
        index: i * BOARD_LEN + j,
      });
    }
  }

  async accuse_timeout() {
    // ##############################################################################
    //    TODO implement accusing the opponent of a timeout
    //	  - Called when you press "Accuse Timeout"
    // ##############################################################################
    // Your code here
    Battleship.methods
      .claim_opponent_left(this.opp_addr)
      .send({ from: this.my_addr, gas: GAS_PRICE });
  }

  async handle_timeout_accusation() {
    // ##############################################################################
    //    TODO implement addressing of a timeout accusation by the opponent
    //		- Called when you press "Respond to Accusation"
    // 		- Returns true if the game is over
    // ##############################################################################
    // Your code here
    await Battleship.methods
      .handle_timeout(this.opp_addr)
      .send({ from: this.my_addr, gas: GAS_PRICE });

    return await Battleship.methods
      .is_game_over()
      .call({ from: this.my_addr, gas: GAS_PRICE });
  }

  /* claim_timeout
    \brief:
      called when BattleshipPlayer believes the opponent has timed-out
      BattleshipPlayer should touch the solidity contract to enforce a
      timelimit for the move
  */
  async claim_timout_winnings() {
    // ##############################################################################
    //    TODO implement claim of rewards if opponent times out
    //		- Called when you press "Claim Timeout Winnings"
    // 		- Returns true if game is over
    // ##############################################################################
    // Your code here
    await Battleship.methods
      .claim_timeout_winnings(this.opp_addr)
      .send({ from: this.my_addr, gas: GAS_PRICE });

    return await Battleship.methods
      .is_game_over()
      .call({ from: this.my_addr, gas: GAS_PRICE });
  }

  /*
	accuse_cheating
	*/
  async accuse_cheating() {
    // ##############################################################################
    //    TODO implement claim of a cheat (the opponent lied about a guess)
    //		- Called when you press "Accuse Cheating"
    //		- This function checks if the last response from the opponent was a lie
    //		- Note that this is already checked in receive_response_to_guess
    //		- This function should verify the proof using the contract instead.
    //		- For this project, the proof should always verify (the opponent will never lie).
    // ##############################################################################
    // Your code here
    let opening_nonce = web3.utils.fromAscii(
      JSON.stringify(this.opening) + JSON.stringify(this.nonce)
    );

    await Battleship.methods
      .accuse_cheating(
        opening_nonce,
        this.proof,
        this.last_opponent_guess,
        this.opp_addr
      )
      .send({ from: this.my_addr });

    console.log(
      "hra je u konca lebo si podvadzal: ",
      await Battleship.methods
        .is_game_over()
        .call({ from: this.my_addr, gas: GAS_PRICE })
    );
  }

  /*
	 	\brief:
			Claim that you won the game - submit proofs to the contract to get the reward.
	*/
  async claim_win() {
    // ##############################################################################
    //    TODO implement claim of a win
    //		- Check the placements of 10 hits you have made on the opponent's board.
    //		- Check (verify with contract) that your board has 10 ships.
    //		- Claim the win to end the game.
    //		Hint: you can convert an opening and a nonce into a bytes memory like this:
    //			web3.utils.fromAscii(JSON.stringify(opening) + JSON.stringify(nonce))
    // ##############################################################################
    // Your code here

    //Verified my ships with the contract
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        if (this.my_board[row][col] == true) {
          await Battleship.methods
            .check_one_ship(
              web3.utils.asciiToHex(
                JSON.stringify(true) + JSON.stringify(this.nonces[row][col])
              ),
              get_proof_for_board_guess(this.my_board, this.nonces, [row, col]),
              row * 6 + col,
              this.my_addr
            )
            .send({
              from: this.my_addr,
              gas: GAS_PRICE,
            });
        }
      }
    }

    //Verify opponent ship-hits with the contract
    for (let hit = 0; hit < this.my_hits.length; hit++) {
      let { nonce, proof, index } = this.my_hits[hit];
      console.log("toto idem poslat na kontract", nonce);
      await Battleship.methods
        .check_one_ship(nonce, proof, index, this.opp_addr)
        .send({
          from: this.my_addr,
          gas: GAS_PRICE,
        });
    }

    try {
      await Battleship.methods
        .claim_win()
        .send({ from: this.my_addr, gas: GAS_PRICE });
      return await Battleship.methods
        .is_game_over()
        .call({ from: this.my_addr, gas: GAS_PRICE });
    } catch (e) {
      console.log(e);
    }
  }

  /*
		\brief:
			Forfeit the game - sends the opponent the entire reward.
	*/
  async forfeit_game() {
    // ##############################################################################
    //    TODO forfeit the battleship game
    //		- Call solidity to give up your bid to the other player and end the game.
    // ##############################################################################
    // Your code here
    try {
      await Battleship.methods
        .forfeit(this.opp_addr)
        .send({ from: this.my_addr, gas: 4200000 });

      return await Battleship.methods
        .is_game_over()
        .call({ from: this.my_addr, gas: 4200000 });
    } catch (e) {
      console.log("Error: ", e);
    }
  }
}
