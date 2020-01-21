import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";

const Dashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated();
    const userLinks = () => {
        return (
            <div>
                <h3>User Links</h3>
                <ul>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/profile/update">Update Profile</Link></li>
                </ul>
            </div>
        )
    };

    const userInfo = () => {
        return(
            <Fragment>
                <h3>User information</h3>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </Fragment>
        )
    };

    const orderHistory = () => {
        return (
            <Fragment>
                <h3>Order History</h3>
                <ol>
                    <li>History</li>
                </ol>
            </Fragment>
        )
    };

    return (
        <Default title="Dashboard" description={`Welcome back ${name}`}>
            {userLinks()}
            {userInfo()}
            {orderHistory()}
        </Default>
    )
};

export default Dashboard;