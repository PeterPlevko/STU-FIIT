// battleship-game.js
//    Defines the gameplay cycle for a game of battleship
// =============================================================================
//                    YOU DO NOT NEED TO EDIT THIS FILE
// =============================================================================
//     written by: Sean Kazuyuki Decker
// #############################################################################

// let game = null;
let players = [null, null];
let players_ready = [false, false];
let turn = -1;

// ===============================================================
//                          SETUP GAME
// ===============================================================
// initialize player1 and player2 variables and set up boards
async function setup_games(player1_address, player2_address) {
  if (player1_address == player2_address)
    $('#game-controller #message').html('Player 1 and 2 cannot have the same address');
  else if (isNaN(parseInt($("#bet").val())) || parseInt($("#bet").val()) <= 0)
    $('#game-controller #message').html('Bet must be some positive integer');
  else {
    enter_battleship_placing_ui();
    players[0] = new BattleshipPlayer('player1', player1_address, player2_address); //, $("#bet").val());
    await players[0].place_bet($("#bet").val());
    players[1] = new BattleshipPlayer('player2', player2_address, player1_address); //, $("#bet").val());
    await players[1].place_bet($("#bet").val());
  }
}

// ===============================================================
//                          PLAY GAME
// ===============================================================
// defines the inputs and outputs for an individual player's game board

// function called when a user guesses a square
async function guess_square(i, j, player, opponent, callback) {
  // build singature on the guess
  let signed_guess = await player.build_guess(i, j);
  // send guess and signature to opponent and receive response
  let [opening, nonce, proof] = await opponent.respond_to_guess(i, j, signed_guess);
  // update my-board with the outcome of the guess (the update relies on the value of response)
    $('#' + opponent.my_name + ' > .my-board #' + i + '-' + j)
      .css('background-image', 'url(' + (opening? EXPLOSION_IMG: SPLASH_IMG) + ')');
  // interpret response
  await player.receive_response_to_guess(i, j, [opening, nonce, proof]);
  // return if the guess hit a ship
  callback(opening);
}

function start_game(player_name, index) {
  leave_battleship_placing_ui(player_name, index);
  players_ready[index] = true;
  if (players_ready[index] && players_ready[(index + 1) % 2]) {
    turn = 0;
    enter_playing_game_ui('player1', 0, guess_square);
    enter_playing_game_ui('player2', 1, guess_square);
  }
}

// ===============================================================
//                          END GAME
// ===============================================================

async function accuse_timeout(player_name, index) {
  await players[index].accuse_timeout();
}

async function handle_timeout_accusation(player_name, index) {
  let result = await players[index].handle_timeout_accusation();
  if (result == true) {
    end_game_ui(player_name, index);
  }
}

async function forfeit_game(player_name, index) {
  await players[index].forfeit_game();
  end_game_ui(player_name, index);
}

async function claim_win(player_name, index) {
  let result = await players[index].claim_win();
  if (result == true) {
    end_game_ui(player_name, index);
  }
}

async function accuse_cheating(player_name, index) {
  let result = await players[index].accuse_cheating();
  if (result == true) {
    end_game_ui(player_name, index);
  }
}

async function claim_timout_winnings(player_name, index) {
  let result = await players[index].claim_timout_winnings();
  if (result == true) {
    end_game_ui(player_name, index);
  }
}


// // Used to end the game for player_name
// async function finish_game(player_name, index) {
//   end_game_ui(player_name, index);
//   let [board_proof, result] = await players[index].finish_game(player_name);
//   await players[(index + 1) % 2].verify_finish(board_proof, result);
//   [board_proof, result] = await players[(index + 1) % 2].finish_game(player_name);
//   await players[index].verify_finish(board_proof, result);
// }
//
// async function resign(player_name, index) {
//   end_game_ui(player_name, index);
//   let resignation = await players[index].resign();
//   await players[(index + 1) % 2].accept_resignation(resignation);
// }
