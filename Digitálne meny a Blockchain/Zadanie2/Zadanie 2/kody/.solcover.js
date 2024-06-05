module.exports = {
  skipFiles: ["ECDSA.sol"],
  providerOptions: {
    total_accounts: 5,
    default_balance_ether: 100000,
  },
  client: require("ganache-cli"),
  mocha: {
    enableTimeouts: false,
  },
};
