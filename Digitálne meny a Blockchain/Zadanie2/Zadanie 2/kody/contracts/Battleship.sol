// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

import "./ECDSA.sol";


contract Battleship {
    using ECDSA for bytes32;
    uint32 constant BOARD_LEN = 6;

    string skusam = "povodna";


    uint256 bet;
    address[] players;
    bytes32[] initial_states; // on position 0 is fisrt player on position 
    bool is_game_running = true;


    uint[] array_to_reset;

    string winner;


    uint start_of_timeout = 0;
    address player_accused_for_timeout;
    address player_accused_for_timeout_reset;

    // you cannot hit the same place twice so we need to store the hited places indexes 
    uint[] first_player_hitted_places_indexes;
    uint[] second_player_hitted_places_indexes;

    // we cannot have the same index of our ship twice so we need to store the indexes
    uint[] first_player_own_ships_indexes;
    uint[] second_player_own_ships_indexes;


    event timeout(uint start_of_timeout, address reporter);

    function callFromOnePlayerWithOpponent(address payable opponent) internal view returns(bool){
        return (msg.sender == players[0] && opponent == players[1]) || (msg.sender == players[1] && opponent == players[0]);
    }

     function callFromOnePlayer() internal view returns(bool){
        return (msg.sender == players[0] || msg.sender == players[1]);
    }
    

    // Declare state variables here.
    // Consider keeping state for:
    // - player addresses
    // - whether the game is over
    // - board commitments
    // - whether a player has proven 10 winning moves
    // - whether a player has proven their own board had 10 ships

    // Declare events here.
    // Consider triggering an event upon accusing another player of having left.

    // Store the bids of each player
    // Start the game when both bids are received
    // The first player to call the function determines the bid amount.
    // Refund excess bids to the second player if they bid too much.
    function store_bid() public payable{

    players.push(msg.sender);
    //control bet if player one set too high
    if(players[0] == msg.sender){
        bet = msg.value;
    }
    else{
        require(msg.value >= bet, "BATTLESHIP: value sent has to be greater or equal then bid submitted by player 1");
        if(msg.value > bet){
           msg.sender.transfer(msg.value - bet);
        }
        is_game_running = true;
    }
    skusam = "uz je tam ina";
    }

    address[] players2;
    bytes32[] initial_states2;

    // Clear state - make sure to set that the game is not in session
    function clear_state() internal {
        skusam = "povodna";
        bet = 0;
        players = players2;
        initial_states = initial_states2;
        is_game_running = false;
        
        first_player_hitted_places_indexes = array_to_reset;
        second_player_hitted_places_indexes = array_to_reset;

    // we cannot have the same index of our ship twice so we need to store the indexes
        first_player_own_ships_indexes = array_to_reset;
        second_player_own_ships_indexes = array_to_reset;

    }

    // Store the initial board commitments of each player
    // Note that merkle_root is the hash of the topmost value of the merkle tree
    function store_board_commitment(bytes32 merkle_root) public {
        require(is_game_running == true, "BATTLESHIP: game is not running");
        require(callFromOnePlayer(), "BATTLESHIP: only player 1 or 2 can store board commitment");
        initial_states.push(merkle_root);
    }

    // Verify the placement of one ship on a board
    // opening_nonce - corresponds to web3.utils.fromAscii(JSON.stringify(opening) + JSON.stringify(nonce)) in JS
    // proof - a list of sha256 hashes you can get from get_proof_for_board_guess
    // guess_leaf_index - the index of the guess as a leaf in the merkle tree
    // owner - the address of the owner of the board on which this ship lives
    function check_one_ship(bytes memory opening_nonce, bytes32[] memory proof,
        uint256 guess_leaf_index, address owner) public returns (bool result) {
        //check player one

         bool is_valid = verify_opening(opening_nonce, proof, guess_leaf_index, owner == players[0] ? initial_states[0] : initial_states[1]);

        if(msg.sender == players[0]){
            //sending his own ships
            if(msg.sender == owner){
                if( !isInArray(first_player_own_ships_indexes, guess_leaf_index) && is_valid){
                   first_player_own_ships_indexes.push(guess_leaf_index);
                }
            }
            else{
                if( !isInArray(first_player_hitted_places_indexes, guess_leaf_index) && is_valid){
                   first_player_hitted_places_indexes.push(guess_leaf_index);
                }
            }
        }
        // check for player two
        else{
             //sending his own ships
            if(msg.sender == owner){
                if( !isInArray(second_player_own_ships_indexes, guess_leaf_index) && is_valid){
                   second_player_own_ships_indexes.push(guess_leaf_index);
                }
            }
            else{
                if( !isInArray(second_player_hitted_places_indexes, guess_leaf_index) && is_valid){
                   second_player_hitted_places_indexes.push(guess_leaf_index);
                }
            }
        }    
        
        return is_valid;
    }

    // Claim you won the game
    // If you have checked 10 winning moves (hits) AND you have checked
    // 10 of your own ship placements with the contract, then this function
    // should transfer winning funds to you and end the game.
    function claim_win() public {
        require(is_game_running == true, "BATTLESHIP: game is not running");
        require(callFromOnePlayer(), "BATTLESHIP: only player 1 or 2 can claim win");
        if(msg.sender == players[0]){
            //check if players 1 has 10 proven ships and 10 proven hits, then send him bet*2
            if(first_player_own_ships_indexes.length != 10 || first_player_hitted_places_indexes.length != 10) {return;}

            winner = "je to hrac 1";    
            msg.sender.transfer(address(this).balance); 
              clear_state(); 
        }
        else if(msg.sender == players[1]){
            //check if players 1 has 10 proven ships and 10 proven hits, then send him bet*2

            if(second_player_own_ships_indexes.length != 10 || second_player_hitted_places_indexes.length != 10) {return;}


            winner = "je to hrac 2";
            msg.sender.transfer(address(this).balance);
             clear_state();
        }
    }


    // Forfeit the game
    // Regardless of cheating, board state, or any other conditions, this function
    // results in all funds being sent to the opponent and the game being over.
    function forfeit(address payable opponent) public {
        require(is_game_running == true, "BATTLESHIP: game is not running");
        require(callFromOnePlayer(), "BATTLESHIP: only player 1 or 2 can forfeit");
        opponent.transfer(address(this).balance);
        clear_state();
    }

    // Claim the opponent cheated - if true, you win.
    // opening_nonce - corresponds to web3.utils.fromAscii(JSON.stringify(opening) + JSON.stringify(nonce)) in JS
    // proof - a list of sha256 hashes you can get from get_proof_for_board_guess (this is what the sender believes to be a lie)
    // guess_leaf_index - the index of the guess as a leaf in the merkle tree
    // owner - the address of the owner of the board on which this ship lives
    function accuse_cheating(bytes memory opening_nonce, bytes32[] memory proof,
        uint256 guess_leaf_index, address owner) public returns (bool result) {
        require(is_game_running == true, "BATTLESHIP: game is not running");
        require(callFromOnePlayer(), "BATTLESHIP: only player 1 or 2 can accuse cheating");
        // verify return if his move was clean, if true then he is not cheteaded that why we need to negate it
        bool cheated = !verify_opening(opening_nonce, proof, guess_leaf_index, owner == players[0] ? initial_states[0] : initial_states[1]);
        //send sender bet becasause other player cheated
        if(cheated) {
            msg.sender.transfer(address(this).balance);
            clear_state();
        }
        return cheated;
    }

    // Claim the opponent of taking too long/leaving
    // Trigger an event that both players should listen for.
    function claim_opponent_left(address opponent) public {
        require(is_game_running == true, "BATTLESHIP: game is not running");
        require(callFromOnePlayerWithOpponent(payable(opponent)), "BATTLESHIP: only player 1 or 2 can claim opponent left");
        require(msg.sender != player_accused_for_timeout, "Player must claim timeout before calling this function");
       start_of_timeout = block.timestamp;
        player_accused_for_timeout = payable(opponent);
        emit timeout(start_of_timeout, msg.sender);
    }

    // Handle a timeout accusation - msg.sender is the accused party.
    // If less than 1 minute has passed, then set state appropriately to prevent distribution of winnings.
    // Otherwise, do nothing.
    function handle_timeout(address payable opponent) public {
        // if guy who accued other is opponent then i set timeout to 0 because i am in game
        if(player_accused_for_timeout == msg.sender){
            if (start_of_timeout != 0 && now <= start_of_timeout + 60) {
                start_of_timeout = 0;
                player_accused_for_timeout = player_accused_for_timeout_reset;
            }
        }
    }

    // Claim winnings if opponent took too long/stopped responding after claim_opponent_left
    // The player MUST claim winnings. The opponent failing to handle the timeout on their end should not
    // result in the game being over. If the timer has not run out, do nothing.
    function claim_timeout_winnings(address opponent) public {
        require(is_game_running == true, "BATTLESHIP: game is not running");
        require(callFromOnePlayerWithOpponent(payable(opponent)), "BATTLESHIP: only player 1 or 2 can claim timeout winnings");
        // opponet cannot trigger winning
        if(player_accused_for_timeout == opponent){
        if (start_of_timeout != 0 && now > start_of_timeout + 60) {
            msg.sender.transfer(address(this).balance);
            clear_state();
            }
        }
    }

    // Check if game is over
    // Hint - use a state variable for this, so you can call it from JS.
    // Note - you cannot use the return values of functions that change state in JS.
    function is_game_over() public returns (bool) {
        return !is_game_running;
    }

    /**** Helper Functions below this point. Do not modify. ****/
    /***********************************************************/

    function merge_bytes32(bytes32 a, bytes32 b) pure public returns (bytes memory) {
        bytes memory result = new bytes(64);
        assembly {
            mstore(add(result, 32), a)
            mstore(add(result, 64), b)
        }
        return result;
    }

    // Verify the proof of a single spot on a single board
    // \args:
    //      opening_nonce - corresponds to web3.utils.fromAscii(JSON.stringify(opening) + JSON.stringify(nonce)));
    //      proof - list of sha256 hashes that correspond to output from get_proof_for_board_guess()
    //      guess - [i, j] - guess that opening corresponds to
    //      commit - merkle root of the board
    function verify_opening(bytes memory opening_nonce, bytes32[] memory proof, uint guess_leaf_index, bytes32 commit) public view returns (bool result) {
        bytes32 curr_commit = keccak256(opening_nonce); // see if this changes hash
        uint index_in_leaves = guess_leaf_index;

        uint curr_proof_index = 0;
        uint i = 0;

        while (curr_proof_index < proof.length) {
            // index of which group the guess is in for the current level of Merkle tree
            // (equivalent to index of parent in next level of Merkle tree)
            uint group_in_level_of_merkle = index_in_leaves / (2**i);
            // index in Merkle group in (0, 1)
            uint index_in_group = group_in_level_of_merkle % 2;
            // max node index for currrent Merkle level
            uint max_node_index = ((BOARD_LEN * BOARD_LEN + (2**i) - 1) / (2**i)) - 1;
            // index of sibling of curr_commit
            uint sibling = group_in_level_of_merkle - index_in_group + (index_in_group + 1) % 2;
            i++;
            if (sibling > max_node_index) continue;
            if (index_in_group % 2 == 0) {
                curr_commit = keccak256(merge_bytes32(curr_commit, proof[curr_proof_index]));
                curr_proof_index++;
            } else {
                curr_commit = keccak256(merge_bytes32(proof[curr_proof_index], curr_commit));
                curr_proof_index++;
            }
        }
        return (curr_commit == commit);    }

        function isInArray(uint256[] memory array, uint256 value) public view returns (bool) {
            for (uint i = 0; i < array.length; i++) {
                if (array[i] == value) {
                    return true;
                }
            }
            return false;
        }


}
