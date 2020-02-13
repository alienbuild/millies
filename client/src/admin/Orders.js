import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import { listOrders } from "./apiAdmin";
import {load} from "dotenv";

const Orders = () => {
    const [orders,setOrders] = useState([]);
    const {user,token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if (data.error){
                    console.log(data.error);
                } else {
                    setOrders(data);
                }
            })
    };

    useEffect(() => {
        loadOrders();
    },[]);

    const noOrders = orders => {
        return orders.length < 1 ? <h4>No orders</h4> : null;
    };

    return(
        <Default title="Orders" description={`Hello ${user.name}, you can manage all the orders here.`}>
            <Fragment>
                {noOrders(orders)}
                {JSON.stringify(orders)}
            </Fragment>
        </Default>
    )
};

export default Orders;
