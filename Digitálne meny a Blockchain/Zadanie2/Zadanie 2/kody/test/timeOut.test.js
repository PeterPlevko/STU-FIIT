const assert = require("assert");
const Battleship = artifacts.require("Battleship");
const helperStructures = require("./helperStructures");

// two account addresses NEED TO CHANGE
GAS_PRICE = 4200000;
BID = 1 * 10 ** 18;
FAKE_COMMIT =
  "0xec90d42144520f57b09fe77d888f3ff19659cfde50c151596fdb3417819112ce";

// TEST //
contract("Battleship", (accounts) => {
  let battleshipContract;

  let first_player;
  let second_player;

  before(async () => {
    battleshipContract = await Battleship.new();
    let accounts = await web3.eth.getAccounts();
    first_player = accounts[0];
    second_player = accounts[1];
  });

  describe("test timeout functions", async () => {
    it(" player 1 accuses player 2 and he responds", async () => {
      await battleshipContract.store_bid({
        from: first_player,
        value: BID,
        gas: GAS_PRICE,
      });

      await battleshipContract.store_bid({
        from: second_player,
        value: BID,
        gas: GAS_PRICE,
      });

      await battleshipContract.store_board_commitment(FAKE_COMMIT, {
        from: first_player,
        gas: GAS_PRICE,
      });

      await battleshipContract.store_board_commitment(FAKE_COMMIT, {
        from: second_player,
        gas: GAS_PRICE,
      });

      await battleshipContract.claim_opponent_left(second_player, {
        from: first_player,
      });

      await battleshipContract.handle_timeout(first_player, {
        from: second_player,
      });
      await battleshipContract.claim_timeout_winnings(second_player, {
        from: first_player,
      });

      let is_game_over = await battleshipContract.is_game_over.call();

      assert.equal(is_game_over, false, "The game should be running.");
    });
  });
});
