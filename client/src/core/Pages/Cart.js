import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Default from '../../layouts/Default';
import { getCart, removeItem } from "../Misc/cartUtils";
import Checkout from "./Checkout";
import ProductCard from '../UI/ProductCard';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      setItems(getCart());
  }, []);

  const showItems = (items) => {
      return (
          <div>
              <h2>Your cart has {`${items.length}`} items.</h2>
              {items.map((product, index) => (
                  <ProductCard key={index} product={product} showAddToCart={false} cartUpdate={true} showRemoveProductButton={true} />
              ))}
          </div>
      )
  };

    const noItemsMessage = () => (
        <Fragment>
            <h2>Your cart is empty.</h2>
            <Link to="/shop">Continue shopping</Link>
        </Fragment>
    );

    return(
        <Default title="Cart" description="Cart description">
            <div className="container">
                {items.length > 0 ? showItems(items) : noItemsMessage()}
                {/*Checkout options/shipping address/total/update/quantity*/}
                <Checkout products={items} />
            </div>
        </Default>
    )
};

export default Cart;