// ui.js
//    Defines jquery function that can be used to change the ui of the
//    battleship page as we enter different stages of gameplay
// =============================================================================
//                    YOU DO NOT NEED TO EDIT THIS FILE
// =============================================================================
//     written by: Sean Kazuyuki Decker
//     edited by: Kristian Kostal
// #############################################################################

// conversion functions
const eth_conversion_rate = 2724.85;
const wei_to_eurs = wei => wei_to_eth(wei) * eth_conversion_rate;
const wei_to_eth = wei => wei / Math.pow(10, 18);

// Player addresses
let player1_address = null, player2_address = null;

// Default account is the first one
async function init_accounts() {
  let accounts = await web3.eth.getAccounts();
  player1_address = accounts[0];
  player2_address = accounts[0];
}

// Initialize the accounts for the UI
init_accounts().then(() => {
  // Then set player's account balances
  web3.eth.getBalance(player1_address).then((res) => {
      $('#player1-account-balance').html(wei_to_eth(parseFloat(res)) + ' eth');
  });
  web3.eth.getBalance(player2_address).then((res) => {
      $('#player2-account-balance').html(wei_to_eth(parseFloat(res)) + ' eth');
  });
});

// Setup game-controller area, where the game boards are set up
(function setup_page() {
  $(document).ready(() => {
    // SETUP ACCOUNT CHOOSING
    web3.eth.getAccounts().then((accounts) => {
      $('.account').html(accounts.map((a) => '<option value='+ a +'>'+ a +'</option>'));
    });
    // setup player choosing
    $('#player1-account').change(function() {
      player1_address = $(this).val();
      web3.eth.getBalance(player1_address).then((res) => {
        $('#player1-account-balance').html(wei_to_eth(parseFloat(res)) + ' eth');
      });
    });
    $('#player2-account').change(function() {
      player2_address = $(this).val();
      web3.eth.getBalance(player2_address).then((res) => {
        $('#player2-account-balance').html(wei_to_eth(parseFloat(res)) + ' eth');
      });
    });
    // start the game on click
    $('#subtitle').html('Initializing a Game');
    $('#start-stop').click(() => { setup_games(player1_address, player2_address).then((result)=>{return;}); });
  });
  // setup_games();
})();


// build and set player boards
function enter_battleship_placing_ui() {
  function build_battleship_table(user, type) {
    table = '';
    for (let i = 0; i < BOARD_LEN; i++) {
      table += '<tr>';
      for (let j = 0; j < BOARD_LEN; j++) {
        table += '<td ';
        table += 'id=' + i + '-' + j + ' ';
        table += 'class=battleship-board-square>';
        table += '</td>';
      }
      table += '</tr>';
    }
    return table;
  }
  // update
  $('#player1 .address').html(player1_address);
  $('#player2 .address').html(player2_address);
  $('#player1 > .my-board').html(build_battleship_table('player1', 'my'));
  $('#player2 > .my-board').html(build_battleship_table('player2', 'my'));
  $('#player1 > .their-board').html(build_battleship_table('player1', 'their'));
  $('#player2 > .their-board').html(build_battleship_table('player2', 'their'));

  function addShip() {
    let imageUrl = './media/boat.png'
    $(this).css('background-image', 'url(' + imageUrl + ')');
    $(this).attr('name', 'boat');
    $(this).click(removeShip);
  }
  function removeShip() {
    $(this).css('background-image', 'none');
    $(this).attr('name', '');
    $(this).click(addShip);
  }
  $('.my-board .battleship-board-square').click(addShip);
  $('.my-board .battleship-board-square').hover(
    function() { $(this).css('background-color', 'blue'); },
    function() { $(this).css('background-color', 'transparent'); }
    );
  $('#subtitle').html('Players are Placing Boats');

  // // add buttons to user controller
  // $('.controller').html(
  //   '<button id="next-step">Submit Battleships</button>\
  //    <button id="timeout">Accuse Opponent of Timeout</button>\
  //    <button id="resign">Resign</button>'
  //   );
  // add buttons to user controller
  $('.controller').html(
    '<button id="next-step">Submit Battleships</button>'
    );

  // setup board submission buttons
  $('#player1 > .controller > #next-step').click(() => { start_game('player1', 0); });
  $('#player2 > .controller > #next-step').click(() => { start_game('player2', 1); });
  // setup timeout accusation buttons
  // $('#player1 > .controller > #timeout').click(() => { accuse_timeout('player1', 0); });
  // $('#player2 > .controller > #timeout').click(() => { accuse_timeout('player2', 1); });
  // // setup timeout accusation buttons
  // $('#player1 > .controller > #resign').click(() => { resign('player1', 0); });
  // $('#player2 > .controller > #resign').click(() => { resign('player2', 1); });
}

function leave_battleship_placing_ui(player_name, index) {
  // stop hover and click on my-board
  $('#' + player_name + ' .my-board .battleship-board-square').unbind();
  $('#' + player_name + ' .my-board .battleship-board-square').off('hover');
  // // setup board submission buttons
  // $('#' + player_name + ' > .controller > #next-step').html('Finish Game');
  // $('#' + player_name + ' > .controller > #next-step').click(() => { finish_game('player1', 0); });

  // // Add claim_win and forfeit buttons to controller
  // $('.controller').html(
  //   '<button id="forfeit">Forfeit Game</button>\
  //    <button id="claim_win">Claim Win</button>'
  //   );
  //
  // // setup forfeit buttons
  // $('#' + player_name + ' > .controller > #forfeit').click(() => { forfeit_game(player_name, index); });
  // // setup claim_win buttons
  // $('#' + player_name + ' > .controller > #claim_win').click(() => { claim_win(player_name, index); });
}

// setup game ui after initial boards have been set
async function enter_playing_game_ui(player_name, index, guess_square) {
  // change subtitle
  $('#subtitle').html("Player 1's turn");
  // start hover style on their-board
  $('#' + player_name + ' .their-board .battleship-board-square').hover(
    function() { $(this).css('background-color', 'red'); },
    function() { $(this).css('background-color', 'transparent'); }
    );

  // Add claim_win and forfeit and claim_cheat buttons to controller
  $('.controller').html(
    '<button id="forfeit">Forfeit Game</button>\
     <button id="claim_win">Claim Win</button>\
     <button id="accuse_cheating">Accuse Cheating</button>\
     <button id="accuse_timeout">Accuse Timout</button>\
     <button id="handle_timeout">Respond to Accusation</button>\
     <button id="claim_timout_winnings">Claim Timout Winnings</button>'
    );

  // setup forfeit buttons
  $('#player1 > .controller > #forfeit').click(() => { forfeit_game('player1', 0); });
  $('#player2 > .controller > #forfeit').click(() => { forfeit_game('player2', 1); });
  // setup claim_win buttons
  $('#player1 > .controller > #claim_win').click(() => { claim_win('player1', 0); });
  $('#player2 > .controller > #claim_win').click(() => { claim_win('player2', 1); });
  // setup claim_cheat buttons
  $('#player1 > .controller > #accuse_cheating').click(() => { accuse_cheating('player1', 0); });
  $('#player2 > .controller > #accuse_cheating').click(() => { accuse_cheating('player2', 1); });
  // setup accuse_timeout buttons
  $('#player1 > .controller > #accuse_timeout').click(() => { accuse_timeout('player1', 0); });
  $('#player2 > .controller > #accuse_timeout').click(() => { accuse_timeout('player2', 1); });
  // setup handle_timeout buttons
  $('#player1 > .controller > #handle_timeout').click(() => { handle_timeout_accusation('player1', 0); });
  $('#player2 > .controller > #handle_timeout').click(() => { handle_timeout_accusation('player2', 1); });
  // setup claim_timout_rewards buttons
  $('#player1 > .controller > #claim_timout_winnings').click(() => { claim_timout_winnings('player1', 0); });
  $('#player2 > .controller > #claim_timout_winnings').click(() => { claim_timout_winnings('player2', 1); });

  // get this player and their opponent's objects
  let player = players[index], opponent = players[(index + 1) % 2];

  // build commitment to initial board
  let [commitment, signature] = await player.initialize_board(parse_my_board(player_name));

  // send this commitment to the opponent
  signature.then((sig) => {
    opponent.receive_initial_board_commit(commitment, sig);
  });

  // click on opponent board is understood as a guess
  $('#' + player_name + ' .their-board .battleship-board-square').click(function() {
    if (index !== turn) return; // only parse guess if it is the player's turn
    // get the i, j of the guess
    let [i, j] = $(this).attr('id').split('-');
    guess_square(parseInt(i), parseInt(j), player, opponent, (hit) => {
      // update global variables and ui
      turn = (turn + 1) % 2;
      // change subtitle
      $('#subtitle').html("Player " + (turn + 1) + "'s turn");
      // update squares with splash or explosion
      $(this).css('background-image', 'url(' + (hit? EXPLOSION_IMG: SPLASH_IMG) + ')');
      $('#' + player_name + ' .their-board .battleship-board-square');

      // remove on click function and hover for chosen square
      $(this).unbind();
      $(this).off('hover');
      $(this).css('background-color', 'transparent');
    });
  });
}

//
function end_game_ui(player_name, index) {
  // unbind click and hover on both player's boards
  $('.their-board .battleship-board-square').unbind();
  $('.their-board .battleship-board-square').off('hover');
  // make all boards transparent
  $('.battleship-board-square').css('opacity', '0.4');
  $('#subtitle').html("Player " + (index + 1) + " has ended the game");
  $('.controller').html(
    '<p>Game Over</p>'
    );
}
