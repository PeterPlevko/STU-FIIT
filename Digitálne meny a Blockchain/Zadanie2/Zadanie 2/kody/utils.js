function timeConverter(UNIX_timestamp){
  if (UNIX_timestamp === null) return "unknown";
  var a = new Date(UNIX_timestamp * 1000);
  return a.toLocaleString("en-US");
}
/* parse_my_board
  \args:
    player - string - id of player who's board needs to be parsed
  \return:
    board - [[bool]] - matrix of bools representing board state for player
*/
function parse_my_board(player) {
  let board = [], i = 0;
  $('#' + player + ' .my-board tr').each(function () {
    board.push([]);
    $('td', this).each(function () {
      board[i].push(($(this).css('background-image') === 'none')? false: true);
     });
    i++;
  });
  return board;
}

/* getRandomNonces
  returns a matrix of Uint32 which correspond to nonces
  for a board commitment
*/
function get_nonces() {
  var nonces = [];
  for (let x = 0; x < BOARD_LEN; x++) {
    // initialize an array of unsigned 32 bit integers
    let row = new Uint32Array(BOARD_LEN);
    // gets random value for each element in row
    window.crypto.getRandomValues(row);
    nonces.push(row);
  }
  return nonces;
}

/* check_correct_sizes
  helper function just to check that the passed initial_board and nonces
  have the correct shape
*/
function check_correct_sizes(initial_board, nonces) {
  if (isNaN(BOARD_LEN) || BOARD_LEN <= 0) {
    throw "BOARD_LEN is not defined or <= 0. \
    Please make sure BOARD_LEN is correctly defined in constants.js"
  }
  if (initial_board.length !== nonces.length || initial_board.length !== BOARD_LEN) {
    throw "initial_board or nonces is not of length BOARD_LEN in check_correct_sizes()"
  }
  for (let i = 0; i < BOARD_LEN; i++) {
    if (initial_board[i].length !== nonces[i].length || initial_board[i].length !== BOARD_LEN) {
      throw "initial_board[i] or nonces[i] is not of length BOARD_LEN in check_correct_sizes()"
    }
  }
}

/* build_merkle
  builds a Merkle Tree from the given initial_board and nonces

  \args:
    initial_board - [[]] - initial board setup passed as matrix
    nonces - [[Uint32]] - matrix of random values
*/
function build_merkle(initial_board, nonces) {
  check_correct_sizes(initial_board, nonces);
  let merkle = [[]];
  // add all leaf nodes
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      merkle[0].push(
        web3.utils.keccak256(
          web3.utils.fromAscii(JSON.stringify(initial_board[i][j]) + JSON.stringify(nonces[i][j]))
        )
      );
    }
  }
  // build tree from leaves
  // while, current level of merkle has length > 1, add more levels
  let curr_level = 0;
  while (merkle[curr_level].length > 1) {
    merkle.push([]);
    curr_level += 1;
    // build new layer of tree
    for (let i = 0; i + 1 < merkle[curr_level - 1].length; i += 2) {
      // have new_node represent another node in the Merkle tree
      let new_node = web3.utils.keccak256(merkle[curr_level - 1][i] + merkle[curr_level - 1][i + 1].substring(2), { encoding: 'hex' });
      // finalize finally computes the hash for every argument passed in update
      merkle[curr_level].push(new_node);
    }
    // if this most recent merkle level has an odd length, we need
    // to just hoist the last element into the next level
    if (merkle[curr_level - 1].length % 2 !== 0) {
      merkle[curr_level].push(merkle[curr_level - 1][merkle[curr_level - 1].length - 1]);
    }
  }
  return merkle;
}

/* build_board_commitment
  builds a board commitment to initial_board with given nonces.
  The commitment returned will be an output from

  \args:
    expects args to be of same shape (BOARD_LEN, BOARD_LEN)
    and if this is not the case, throws an exception
*/
function build_board_commitment(initial_board, nonces) {
  let merkle_tree = build_merkle(initial_board, nonces);
  // the root of the merkle tree will be the last level's only element
  return merkle_tree[merkle_tree.length - 1][0];
}

/* sign_msg
  signs message - msg - using account specified by my_addr
*/
function sign_msg(msg, my_addr) {
  const msg_buf = new ethereumjs.Buffer.Buffer(msg);
  return web3.eth.sign('0x' + msg_buf.toString('hex'), my_addr);
}

/* check_signature
  checks if given signature - sig - on message - msg - is signed by addr_of_signatory
  \ret:
    returns false if the msg signature doesn't correspond to addr_of_signatory
*/
function check_signature(msg, sig, addr_of_signatory) {
  // cast msg to a Buffer
  const msg_buf = new ethereumjs.Buffer.Buffer(msg);
  // get v, r, s values from signature
  const res = ethereumjs.Util.fromRpcSig(sig);
  // Geth adds prefix to the message before siginig it in web3.eth.sign
  // so we need to replicate this directly in order to confirm a signature.
  const prefix = ethereumjs.Util.toBuffer("\x19Ethereum Signed Message:\n");
  // append prefix and get sha3
  const prefixedMsg = ethereumjs.Util.sha3(
    ethereumjs.Buffer.Buffer.concat(
      [prefix,
      ethereumjs.Util.toBuffer(String(msg_buf.length)),
      ethereumjs.Util.toBuffer(msg_buf)
      ])
  );
  // find pubkey from given msg signature
  const pubKey  = ethereumjs.Util.ecrecover(prefixedMsg, res.v, res.r, res.s);
  // get address from pubkey
  const addrBuf = ethereumjs.Util.pubToAddress(pubKey);
  // get addr in hex form
  const addr = ethereumjs.Util.bufferToHex(addrBuf);
  // check if this is the passed in addr of the signatory
  return addr == addr_of_signatory.toLowerCase();
}

/* check_board_commitment
  returns true if commit corresponds to a commitment created from
  a Merkle tree built from initial_board, nonces
*/
function check_board_commitment(initial_board, nonces, commit) {
  let check_commit = build_board_commitment(initial_board, nonces);
  return check_commit === commit;
}

/* get_proof_for_board_guess
  /args:
    initial_board - matrix representing my-board state
    nonces - nonces for your board
    guess - [i, j] - guess building proof for
*/
function get_proof_for_board_guess(initial_board, nonces, guess) {
  let merkle_tree = build_merkle(initial_board, nonces);
  let index_in_merkle = guess[0] * BOARD_LEN + guess[1];
  let proof = [];
  for (let i = 0; i < merkle_tree.length - 1; i++) {
    let merkle_group = Math.floor(index_in_merkle / Math.pow(2, i)); // goodod
    let index_in_group = merkle_group % 2;
    let sibling = Math.min(merkle_group - index_in_group + (index_in_group + 1) % 2, merkle_tree[i].length - 1);
    let group_index = (index_in_merkle - (merkle_group * Math.pow(2, i + 1)));
    if (sibling == merkle_group) continue;
    proof.push(merkle_tree[i][sibling]);
  }
  return proof;
}

/*
  \args:
    opening - bool - represents response to guess
    nonce - uint32 - nonce for square that corresponds to guess
    proof - [string] - list of sha256 hashes
    commitment - string - the commitment to the Merkle tree
    guess - [int, int] - square that opening and nonce correspond to
*/
function verify_opening(opening, nonce, proof, commitment, guess) {
  let curr_commit = web3.utils.keccak256(
    web3.utils.fromAscii(JSON.stringify(opening) + JSON.stringify(nonce))
    );
  let index_of_guess_in_leaves = guess[0] * BOARD_LEN + guess[1];
  let curr_proof_index = 0;
  let height_of_merkle = Math.log(BOARD_LEN * BOARD_LEN) / Math.log(2);
  for (let i = 0; i < height_of_merkle; i++) {
    // index of which group guess is in for current this level of Merkle
    // equivalent to index of parent in next level of Merkle
    let group_in_level_of_merkle = Math.floor(index_of_guess_in_leaves / Math.pow(2, i));
    // index in Merkle group \in (0, 1)
    let index_in_group = group_in_level_of_merkle % 2;
    // max node index for curr Merkle level
    let max_node_index = Math.ceil(BOARD_LEN * BOARD_LEN / Math.pow(2, i)) - 1;
    // index of sibling of curr_commit
    let sibling = group_in_level_of_merkle - index_in_group + (index_in_group + 1) % 2;
    if (sibling > max_node_index) continue; // case where node was only hoisted
    if (index_in_group % 2 == 0) {
      curr_commit = web3.utils.keccak256(curr_commit + proof[curr_proof_index].substring(2), { encoding: 'hex' });
      curr_proof_index++;
    } else {
      curr_commit = web3.utils.keccak256(proof[curr_proof_index] + curr_commit.substring(2), { encoding: 'hex' });
      curr_proof_index++;
    }
  }
  return curr_commit === commitment;
}
