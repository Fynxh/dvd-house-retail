import React, { Component } from 'react';
import { Container } from "reactstrap";

class dashboard extends Component {
    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <Container>
                    <h1 className="display-4">DVD House Retail</h1>
                    <p className="lead">DVD house retail admin application</p>

                    <hr className="my-4" />
                </Container>
            </div>
        );
    }
}

export default dashboard;