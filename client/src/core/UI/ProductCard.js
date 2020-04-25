import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { addItem, updateItem, removeItem } from "../Misc/cartUtils";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";

const ProductCard = ({ product, showAddToCart = true, cartUpdate = false, showRemoveProductButton = false }) => {

    const [count, setCount] = useState(product.count);

    // Add to cart button
    const addToCart = () => {
        addItem(product, () => {
            console.log('Added to cart.');
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

    // Show cart update options
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
        <Card>
            <Link to={`/product/${product._id}`}>
            <Card.Img variant="top" src="https://fakeimg.pl/350x200/333/fff" />
            </Link>
            <Card.Body>
                <Card.Title><Link to={`/product/${product._id}`}>{product.name}</Link></Card.Title>
                <p>£{product.price}</p>
            </Card.Body>
            <Card.Footer>
                {showAddToCartButton(showAddToCart)}
                {showCartUpdateOptions(cartUpdate)}
                {showRemoveButton(showRemoveProductButton)}
            </Card.Footer>
        </Card>
    )
};

export default ProductCard;