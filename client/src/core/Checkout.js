import React, { useState, useEffect } from 'react';
import Default from '../layouts/Default';
import { getProducts, getBraintreeClientToken } from "./apiCore";
import Card from './Card';
import { isAuthenticated } from "../auth";
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) => {

    // Init state
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    // Get userId + token
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error){
                setData({
                    ...data,
                    error: data.error
                })
            } else {
                setData({
                    ...data,
                    clientToken: data.clientToken
                })
            }
        })
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    // Calculate total
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    };

    // Show checkout button?
    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <button>Sign in to checkout.</button>
        )
    };

    const buy = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then( data => {
                console.log('Buy method data is: ', data);
                nonce = data.nonce;
                console.log('Send nonce + total to process:', nonce, getTotal(products))
            })
            .catch( error => {
                console.log('Drop in error:', error);
                setData({
                    ...data,
                    error: error.message
                })
            })
    };

    // Display Braintree Drop in
    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy}>Pay</button>
                </div>
            ) : null}
        </div>
    );

    // Error signage toggle
    const showError = error => (
        <div style={{ display: error ? 'block' : 'none'}}>{error}</div>
    );

    return (
        <div>
            <h4>Total: ${getTotal()}</h4>
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout;