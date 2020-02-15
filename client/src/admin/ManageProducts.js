import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import Search from "../core/Search";
import Card from "../core/Card";

const ManageProducts = () => {
    return(
        <Default title="Manage products" description="Manage products CRUD">
            <h2>Manage products</h2>
            ...
        </Default>
    )
};

export default ManageProducts;