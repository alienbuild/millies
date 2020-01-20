import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
    return(
        <li className="card">
            <Link to={`/product/${product._id}`}>
                <div className="card-header">{product.name}</div>
            </Link>
            <div className="card-body">
                {/*<p>{product.description.substring(0, 100)}</p>*/}
                <p>£{product.price}</p>
                <button>Add to cart</button>
            </div>
        </li>
    )
};

export default Card;