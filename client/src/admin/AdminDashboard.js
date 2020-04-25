import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated();
    const adminLinks = () => {
        return (
            <div>
                <h3>Admin Links</h3>
                <ul>
                    <li><Link to="/admin/category/add">Create Category</Link></li>
                    <li><Link to="/admin/product/add">Create Product</Link></li>
                    <li><Link to="/admin/products">Manage Product</Link></li>
                    <li><Link to="/admin/orders">Orders</Link></li>
                </ul>
            </div>
        )
    };

    const adminInfo = () => {
        return(
            <Fragment>
                <h3>Admin information</h3>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </Fragment>
        )
    };

    return (
        <Default title="AdminDashboard" description={`Welcome back ${name}`}>
            {adminLinks()}
            {adminInfo()}
        </Default>
    )
};

export default AdminDashboard;