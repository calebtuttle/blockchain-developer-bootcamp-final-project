import React, { Component } from "react";

import "./JobPost.css";

export default class JobPost extends Component {

    applyToJob = async (event) => {
        // TODO: Write this

        // event.preventDefault();
        // const { jobPostings, accounts, contract } = this.state;
    
        // await contract.methods.applyToJob(this.props.key).send({ from: accounts[0] });
        // let linkedIn = event.target.elements.linkedIn.value;
    
        // this.setState({ jobPostings: postings });
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
