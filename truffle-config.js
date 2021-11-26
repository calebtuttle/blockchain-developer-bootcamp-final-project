const path = require("path");

// const HDWallet = require('@truffle/hdwallet-provider');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraURL = 'https://rinkeby.infura.io/v3/516556d62aab464d90a7eebe9d924aae';

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraURL),
      network_id: 4,  // Rinkeby's network id
      gas: 5500000,
    }
  },
  compilers: {
      solc: {
          version: "0.8.0"
      }
  }
};
