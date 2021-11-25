var JobBoard = artifacts.require("./JobBoard.sol");

module.exports = function(deployer) {
  deployer.deploy(JobBoard);
};
