import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { addItem, updateItem, removeItem } from "./cartUtils";

const Card = ({ product, showAddToCart = true, cartUpdate = false, showRemoveProductButton = false }) => {

    const [count, setCount] = useState(product.count);

    // Add to cart button
    const addToCart = () => {
        addItem(product, () => {
            console.log('Added item to cart');
        })
    };

    // Toggle add to cart button
    const showAddToCartButton = (showAddToCart) => {
        return showAddToCart && (
            <button onClick={addToCart}>Add to Cart</button>
        )
    };

    // Update product quantity
    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1){
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = (cartUpdate) => {
        return cartUpdate && <div>
            <input type="number" value={count} onChange={handleChange(product._id)} />
        </div>
    };

    // Toggle remove from cart
    const showRemoveButton = (showRemoveProductButton) => {
        return showRemoveProductButton && (
            <button onClick={() => removeItem(product._id)}>X</button>
        )
    };

    return(
        <li className="card">
            <Link to={`/product/${product._id}`}>
                <div className="card-header">{product.name}</div>
            </Link>
            <div className="card-body">
                <p>£{product.price}</p>
                {showAddToCartButton(showAddToCart)}
                {showCartUpdateOptions(cartUpdate)}
                {showRemoveButton(showRemoveProductButton)}
            </div>
        </li>
    )
};

export default Card;