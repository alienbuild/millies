import React from 'react';
import { Link } from 'react-router-dom';
import {addItem} from "./cartUtils";

const Card = ({ product }) => {
    // Add to Cart Button
    const addToCart = () => {
        addItem(product, () => {
            console.log('Added item to cart');
        })
    };

    const showAddToCartButton = () => {
        return (
            <button onClick={addToCart}>Add to Cart</button>
        )
    };
    return(
        <li className="card">
            <Link to={`/product/${product._id}`}>
                <div className="card-header">{product.name}</div>
            </Link>
            <div className="card-body">
                {/*<p>{product.description.substring(0, 100)}</p>*/}
                <p>£{product.price}</p>
                {showAddToCartButton()}
            </div>
        </li>
    )
};

export default Card;