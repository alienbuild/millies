import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from "./apiCore";
import Card from './Card';
import Search from './Search';

const Home = () => {
    // Init state
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    // Get most sold products
    const loadProductsBySell = () => {
        getProducts('sold')
            .then(data => {
                if (data.err){
                    setError(data.error);
                } else{
                    setProductsBySell(data);
                }
            })
            .catch(err => console.log(err))
    };

    // Get latest products
    const loadProductsByArrival = () => {
        getProducts('createdAt')
            .then(data => {
                if (data.err){
                    setError(data.error);
                } else{
                    setProductsByArrival(data);
                }
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    },[]);

    return(
        <Layout title="Home page" description="Homepage description">
            <Search />
            <h2>Fresh Stock</h2>
            <div className="row">
                {productsByArrival.map((product,index) => (<Card key={index} product={product} />))}
            </div>
            <hr/>
            <h2>Popular Items</h2>
            <div className="row">
                {productsBySell.map((product,index) => (<Card key={index} product={product} />))}
            </div>
        </Layout>
    )
};

export default Home;