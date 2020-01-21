import React, { useState, useEffect } from 'react';
import Default from '../layouts/Default';
import ProductPage from '../layouts/ProductPage';
import { read, listRelated } from "./apiCore";
import Card from './Card';
import Search from "./Search";

const Product = (props) => {

    // Init state
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error){
                setError(data.error);
            } else {
                setProduct(data);
                // Fetch related products
                listRelated(data._id)
                    .then(data => {
                        if (data.error){
                            setError(data.error);
                        } else {
                            setRelatedProduct(data);
                        }
                    })
            }
        })
    };

    // Show Quantity/Stock
    const showQuantity = (quantity) => {
        return quantity > 0 ? <span>In Stock</span> : <span>Out of stock</span>
    };

    // Add to Cart Button
    const showAddToCartButton = () => {
        return (
            <button>Add to Cart</button>
        )
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    },[]);

    return(
        <ProductPage title={product && product.name} description={product && product.description && product.description.substring(0,100)}>
            <ul>
                <li>Name: {product.name}</li>
                <li>Price: {product.price}</li>
                <li>Quantity: {showQuantity(product.quantity)}</li>
                <li>Category: {product.category && product.category.name}</li>
            </ul>
            {showAddToCartButton()}
            <h3>Related products</h3>
            {relatedProduct && relatedProduct.map((product) => (<Card product={product} />))}
        </ProductPage>
    )
};

export default Product;