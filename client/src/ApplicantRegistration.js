import React, { Component } from "react";

export default class ApplicantRegistration extends Component {
    state = { web3: null, accounts: null, contract: null };

    register = async (event) => {
        try {
            const contract = this.props.contract;
            const accounts = this.props.accounts;
            let linkedIn = event.target.linkedIn.value;
            await contract.methods.registerAsSeeker(linkedIn).send({ from: accounts[0] });
        } catch (error) {
            alert(error);
            console.error(error);
        }
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
                <h3>Register as an applicant</h3>

                <div>
                    <form onSubmit={this.register} >
                        <label>
                            LinkedIn: <input type="text" name="linkedIn" required />
                        </label>
                        <br/>
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        );
    }
}
