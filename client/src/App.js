import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import JobBoardContract from "./contracts/JobBoard.json";
import getWeb3 from "./getWeb3";

import JobPost from "./JobPost"
import "./App.css";

class App extends Component {
  state = { jobPostings: [], web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    // try {
    //   // Get network provider and web3 instance.
    //   const web3 = await getWeb3();

    //   // Use web3 to get the user's accounts.
    //   const accounts = await web3.eth.getAccounts();

    //   // Get the contract instance.
    //   const networkId = await web3.eth.net.getId();
    //   const deployedNetwork = SimpleStorageContract.networks[networkId];
    //   const instance = new web3.eth.Contract(
    //     SimpleStorageContract.abi,
    //     deployedNetwork && deployedNetwork.address,
    //   );

    //   // Set web3, accounts, and contract to the state, and then proceed with an
    //   // example of interacting with the contract's methods.
    //   this.setState({ web3, accounts, contract: instance }, this.runExample);
    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert(
    //     `Failed to load web3, accounts, or contract. Check console for details.`,
    //   );
    //   console.error(error);
    // }

    
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = JobBoardContract.networks[networkId];
      const instance = new web3.eth.Contract(
        JobBoardContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
    }
  };

  runExample = async () => {
    const { jobPostings, accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    var title = "Solidity Developer";
    var desc = "Write solidity, write tests, etc....";
    await contract.methods.postJob(title, desc).send({ from: accounts[0] });
    let response = await contract.methods.getJob(1).call();
    let posting = [response['poster'], response['title'], response['description']];
    // jobPostings.push(posting);
    let postings = jobPostings;
    postings.push(posting);

    // Update state with the result.
    this.setState({ jobPostings: postings });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    let poster = "{Address of job poster goes here...}";
    let title = "{Job title goes here...}";
    let description = "{Job description goes here...}";
    if (this.state.jobPostings.length !== 0) {
        poster = this.state.jobPostings[0][0];
        title = this.state.jobPostings[0][1];
        description = this.state.jobPostings[0][2];
    }

    const jobPosts = this.state.jobPostings.map((posting) => 
        <JobPost poster={posting[0]} title={posting[1]} description={posting[2]} />
    );

    return (
      <div className="App">
        <h1>A Decentralized Job Board</h1>
        <hr/>
        <form>
            {/* TODO: Add onclick functionality to the buttons */}
            <label>
                Job title: <input type="text" name="job-title" required />
            </label>
            <br/>
            <label>
                Job description: <input type="text" name="job-description" required />
            </label>
            <br/>
            <input type="submit" value="Post job" />
        </form>
        <br/>
        {jobPosts}
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
