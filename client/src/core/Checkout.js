import React, { useState, useEffect } from 'react';
import Default from '../layouts/Default';
import { getProducts, getBraintreeClientToken, processPayment, createOrder, getTotalFromAPI } from "./apiCore";
import { emptyCart } from "./cartUtils";
import Card from './Card';
import { isAuthenticated } from "../auth";
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) => {

    // Init state
    const [data, setData] = useState({
        loading: false,
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
                    clientToken: data.clientToken
                })
            }
        })
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    // Handle address
    const handleAddress = event => {
      setData({...data, address: event.target.value});
    };

    // Calculate total
    const getTotal = () => {
        // return products.reduce((currentValue, nextValue) => {
        //     return currentValue + nextValue.count * nextValue.price;
        // }, 0)
        console.log('Running get total');
        getTotalFromAPI(products)
            .then(response => {
                console.log('Andddd the total is...', response.total)
            })
    };

    // Show checkout button?
    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <button>Sign in to checkout.</button>
        )
    };

    let deliveryAddress = data.address;

    // Delivery address
    const buy = () => {
        setData({ loading: true });
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log('user id is:', userId);
                        // Create order
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };
                        createOrder(userId, token, createOrderData)
                            .then( response => {
                                // Empty cart
                                emptyCart(() => {
                                    console.log('Payment success. Cart is now empty.');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                    // TODO: Expand callback to do something? redirect?
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false })
                            });
                    })
                    .catch( err => console.log(err) )
            })
            .catch( error => {
                setData({ loading: false });
                setData({...data, error: error.message})
            })
    };

    // Display Braintree Drop in
    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <label htmlFor="delivery-address">Delivery address:</label>
                    <textarea onChange={handleAddress} value={data.address}></textarea>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: 'vault'
                        }
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

    // Success signage toggle
    const showSuccess = success => (
        <div style={{ display: success ? 'block' : 'none'}}>Thank! Your payment was successful.</div>
    );

    // Toggle loading TODO:Create loading screen
    const toggleLoading = loading => loading && <div className="loading overlay">LOADING...</div>;

    return (
        <div>
            <h4>Total: ${getTotal()}</h4>
            {toggleLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout;