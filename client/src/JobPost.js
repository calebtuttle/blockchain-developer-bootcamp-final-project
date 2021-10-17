import React, { Component } from "react";

import "./JobPost.css";

export default class JobPost extends Component {

    applyToJob = async (event) => {
        // TODO: Write this

        event.preventDefault();
        const { jobPostings, accounts, contract } = this.state;
    
        let title = event.target.elements.jobTitle.value;
        let desc = event.target.elements.jobDescription.value;
        let jobId = await contract.methods.jobCount().call();
        await contract.methods.postJob(title, desc).send({ from: accounts[0] });
    
        // let response = await contract.methods.getJob(jobPostings.length).call();
        // let posting = [response['poster'], response['title'], response['description']];
        let posting = [jobId, accounts[0], title, desc];
        let postings = jobPostings;
        postings.push(posting);
    
        this.setState({ jobPostings: postings });
      }
    

    openForm = () => {
        document.getElementById("applicationForm").style.display = "block";
    }
    
    closeForm = () => {
        document.getElementById("applicationForm").style.display = "none";
    }

    render() {
        return (

            <div>
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p>
                <p>Posted by: {this.props.poster}</p>

                <button onClick={this.openForm} className="open-button" >Apply</button>

                <div className="form-popup" id="applicationForm">
                    <form onSubmit={this.applyToJob} className="form-container" >
                        <label>
                            LinkedIn: <input type="text" name="linkedIn" required />
                        </label>
                        <br/>
                        <input type="submit" value="Send application" />
                        <button type="button" className="btn cancel" onClick={this.closeForm}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
}
