import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from 'moment';
import {load} from "dotenv";

const Orders = () => {
    const [orders,setOrders] = useState([]);
    const [statusValues,setStatusValues] = useState([]);
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

    const loadStatusValues = () => {
        getStatusValues(user._id, token)
            .then(data => {
                if (data.error){
                    console.log(data.error);
                } else {
                    setStatusValues(data);
                }
            })
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[]);

    // Calculate number of orders
    const showOrdersLength = () => {
        if (orders.length > 0){
            return (
                <h1>Total orders: {orders.length}</h1>
            )
        } else {
            return (
                <h1>No orders.</h1>
            )
        }
    };

    // Show input
    const showInput = (key, value) => (
        <div key={key}><input type="text" value={value} readOnly /></div>
    );

    // Status change
    const handleStatusChange = (e, orderId) => {
      console.log('Update order status.');
        updateOrderStatus(user._id, token, orderId, e.target.value)
            .then(data => {
                if(data.error){
                    console.log('Status update failed');
                } else {
                    loadOrders();
                }
            })
    };

    const showStatus = (order) => {
        return(
            <div>
                Status: {order.status}
                <br/>
                <select onChange={(e) => handleStatusChange(e, order._id)}>
                    <option disabled selected>Update status</option>
                    {statusValues.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        )
    };

    return(
        <Default title="Orders" description={`Hello ${user.name}, you can manage all the orders here.`}>
            <Fragment>
                {showOrdersLength()}
                <ul>
                    {orders.map((order, index) => (
                        <>
                            <li key={index}>
                            Order ID: {order._id}
                            <br/>
                            Status: {showStatus(order)}
                            <br/>
                            Transaction id: {order.transaction_id}
                            <br/>
                            Amount: £{order.amount}
                            <br/>
                            User: {order.user.name}
                            <br/>
                            Ordered on: {moment(order.createdAt).fromNow()}
                            <br/>
                            Delivery address: {order.address}
                            <br/>
                            Total products in the order: {order.products.length}
                            {/*Show Products*/}
                            {order.products.map((product, pIndex) => (
                                <ul>
                                    <li key={pIndex}>{showInput('Product name', product.name)}</li>
                                    <li key={pIndex}>{showInput('Product price', product.price)}</li>
                                    <li key={pIndex}>{showInput('Product total', product.count)}</li>
                                    <li key={pIndex}>{showInput('Product id', product._id)}</li>
                                </ul>
                            ))}
                        </li>
                        </>
                    ))}
                </ul>
            </Fragment>
        </Default>
    )
};

export default Orders;
