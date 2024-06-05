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

  describe("store bid and forfeit game", async () => {
    it("store bid of two players", async () => {
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

      let balance = await web3.eth.getBalance(battleshipContract.address);
      assert.equal(
        balance,
        BID * 2,
        "The balance should be equal to the bid of two players."
      );
    });

    it("store comminmet of player 1", async () => {
      await battleshipContract.store_board_commitment(FAKE_COMMIT, {
        from: first_player,
        gas: GAS_PRICE,
      });
    });

    it("store comminmet of player 2", async () => {
      await battleshipContract.store_board_commitment(FAKE_COMMIT, {
        from: second_player,
        gas: GAS_PRICE,
      });
    });

    it("player 1 forfeit game", async () => {
      await battleshipContract.forfeit(second_player, { from: first_player });

      let balance = await web3.eth.getBalance(battleshipContract.address);

      assert.equal(
        balance,
        0,
        "The balance should be equal to 0, because player 1 forfeit the game."
      );
    });

    it("second time store bid of two players but player two send more than actual bid", async () => {
      await battleshipContract.store_bid({
        from: first_player,
        value: BID,
        gas: GAS_PRICE,
      });

      await battleshipContract.store_bid({
        from: second_player,
        value: BID + 1 * 10 ** 18,
        gas: GAS_PRICE,
      });

      let balanceOfContract = await web3.eth.getBalance(
        battleshipContract.address
      );
      assert.equal(
        balanceOfContract,
        BID * 2,
        "The balance should be equal to the bid of two players."
      );
    });

    it("player 2 forfeit game", async () => {
      await battleshipContract.forfeit(first_player, { from: second_player });

      let balance = await web3.eth.getBalance(battleshipContract.address);

      assert.equal(
        balance,
        0,
        "The balance should be equal to 0, because player 1 forfeit the game."
      );
    });

    it("second time store bid of two players but player two send less than actual bid", async () => {
      await battleshipContract.store_bid({
        from: first_player,
        value: BID,
        gas: GAS_PRICE,
      });

      try {
        await battleshipContract.store_bid({
          from: second_player,
          value: BID - 0.5 * 10 ** 18,
          gas: GAS_PRICE,
        });
      } catch (error) {
        // cath because i have some require in the function
        // but if require not allow function to run test will fail anyway
      }

      let balanceOfContract = await web3.eth.getBalance(
        battleshipContract.address
      );

      let is_game_over = await battleshipContract.is_game_over.call();

      assert.equal(
        balanceOfContract,
        BID,
        "The balance should be equal to the bid of one player."
      );
      assert.equal(is_game_over, true, "The game should not be running.");
    });
  });
});
