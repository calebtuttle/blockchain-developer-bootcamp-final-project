# ConsenSys Blockchain Developer Bootcamp Final Project

## Project Description
My final project is a simple decentralized job board. It is a single page which lists jobs, allows users to add jobs, allows users to apply to jobs, and allows users to view applicants' addresses.

The backend is one Solidity smart contract, and the frontend uses React.

## Directory Structure
- client
  - This contains the React frontend.
- contracts
  - This contains the JobBoard smart contract.
- migrations
  - This contains migration scripts.
- test
  - This contains the unit tests for the smart contract.

## Installing Dependencies
This project uses Truffle. The solc version is 0.8.0 (to be compatible with an OpenZeppelin library).

React dependencies can be installed by running `npm install` the following command in the client/ directory.

## Running Tests
Tests are run on the local truffle develop testnet at port 8545. Use truffle to run the tests. Run this seqence of commands:

    truffle develop
    test

## Accessing the Frontend
The frontend is live at: [https://trusting-noyce-341963.netlify.app/](https://trusting-noyce-341963.netlify.app/)

## My Ethereum Address (for the certificate NFT)
0xcaFe2eF59688187EE312C8aca10CEB798338f7e3