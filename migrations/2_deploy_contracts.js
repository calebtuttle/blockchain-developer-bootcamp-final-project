var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var JobBoard = artifacts.require("./JobBoard.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(JobBoard);
};
