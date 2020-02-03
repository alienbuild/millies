import React, { useState, useEffect } from 'react';
import Default from '../layouts/Default';
import { getProducts } from "./apiCore";
import Card from './Card';
import { isAuthenticated } from "../auth";

const Checkout = ({products}) => {

    // Calculate total
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button>Checkout</button>
        ) : (
            <button>Checkout</button>
        )
    };

    return (
        <div>
            <h4>Total: ${getTotal()}</h4>
            {showCheckout()}
        </div>
    )
};

export default Checkout;