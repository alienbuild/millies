import React, {Fragment, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    // Init state
    const [history, setHistory] = useState([]);
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <>
                <h3>User Links</h3>
                <ul>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to={`/profile/${_id}`}>Update Profile</Link></li>
                </ul>
            </>
        );
    };

    const userInfo = () => {
        return (
            <>
                <h3>User information</h3>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>
            </>
        );
    };

    const purchaseHistory = history => {
        return (
            <>
                <h3>Purchase history</h3>
                <ul>
                    {history.map((h, i) => {
                        return (
                            <>
                                {h.products.map((product, i) => {
                                    return (
                                        <li key={i}>
                                            Product name: {product.name}
                                            <br/>
                                            Product price: ${product.price}
                                            <br/>
                                            Purchased date:{" "}
                                            <br/>
                                            {moment(product.createdAt).fromNow()}
                                            <hr/>
                                        </li>
                                    );
                                })}
                            </>
                        );
                    })}
                </ul>
            </>
        );
    };

    return (
        <Default title="Dashboard" description={`Welcome back ${name}`} className="">
            {userLinks()}
            {userInfo()}
            {purchaseHistory(history)}
        </Default>
    );
};

export default Dashboard;