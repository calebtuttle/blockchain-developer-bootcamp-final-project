import React, { Component } from "react";

import "./JobPost.css";

export default class JobPost extends Component {
    state = { linkedIns: [] };

    applyToJob = async (event) => {
        event.preventDefault();
        try {
            console.log("applying to job with jobId " + this.props.jobId);
            const contract = this.props.contract;
            const accounts = this.props.accounts;
            let linkedIn = event.target.linkedIn.value;
            await contract.methods.applyToJob(parseInt(this.props.jobId), linkedIn).send({ from: accounts[0] });
        } catch (error) {
            alert("Error");
            console.error(error);
        }
    }
    
    openForm = () => {
        document.getElementById("applicationForm" + this.props.jobId).style.display = "block";
    }
    
    closeForm = () => {
        document.getElementById("applicationForm" + this.props.jobId).style.display = "none";
        document.getElementById("applicationFormLinkedIn" + this.props.jobId).value = "";
    }

    // removeJob = async (event) => {
    //     event.preventDefault();
    //     if (window.confirm("Are you sure you want to remove this job posting?"))
    //     {
    //         try {
    //             console.log("removing job with jobId " + this.props.jobId);
    //             const contract = this.props.contract;
    //             const accounts = this.props.accounts;
    //             await contract.methods.removeJob(parseInt(this.props.jobId)).send({ from: accounts[0] });
    //         } catch (error) {
    //             alert("Error");
    //             console.error(error);
    //         }
    //     }
    // }

    viewApplicantLinkedIns = async (linkedInItems) => {
        // event.preventDefault();
        try {
            console.log("Viewing applicants to job with jobId " + this.props.jobId);
            const contract = this.props.contract;
            const accounts = this.props.accounts;
            let linkedIns = await contract.methods.viewApplicantLinkedIns(parseInt(this.props.jobId)).call({ from: accounts[0] });
            
            console.log(linkedIns);
            
            this.setState({ linkedIns })
        } catch (error) {
            alert("Error");
            console.error(error);
        }
    }

    render() {

        let linkedInItems = this.state.linkedIns.map((linkedIn, index) => 
            <li key={index} className="linkedInItem">{linkedIn}</li>
        );

        return (
            <div>
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p>
                <p>Posted by: {this.props.poster}</p>

                <button onClick={this.openForm} className="open-button" >Apply</button>

                <div className="form-popup" id={"applicationForm" + this.props.jobId}>
                    <form onSubmit={this.applyToJob} className="form-container" >
                        <label>
                            LinkedIn: <input type="text" id={"applicationFormLinkedIn" + this.props.jobId} name="linkedIn" required />
                        </label>
                        <br/>
                        <input type="submit" value="Send application" />
                        <button type="button" className="btn cancel" onClick={this.closeForm}>Close</button>
                    </form>
                </div>

                {/* <button onClick={this.removeJob} className="remove-job-button" >Remove Job</button> */}
                <button onClick={() => this.viewApplicantLinkedIns(linkedInItems)} className="view-linkedins-button" >View LinkedIn URLs of Applicants</button>
                {linkedInItems}
            </div>
        );
    }
}
