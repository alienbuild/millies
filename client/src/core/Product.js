import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from "./apiCore";
import Card from './Card';
import Search from "./Search";

const Product = (props) => {

    // Init state
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error){
                setError(data.error);
            } else {
                setProduct(data);
            }
        })
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    },[]);

    return(
        <Layout title="Home page" description="Homepage description">
            <p>Single Product</p>
            {JSON.stringify(product)}
        </Layout>
    )
};

export default Product;