import React, { Component } from 'react';
import { Link } from "react-router-dom";

class dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Link to={'/login' }>Login</Link>
            </div>
        );
    }
}

export default dashboard;