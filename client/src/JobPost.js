import React, { Component } from "react";


export default class JobPost extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p>
                <p>Posted by: {this.props.poster}</p>
            </div>
        );
    }
}
