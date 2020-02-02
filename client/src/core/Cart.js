import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { getCart } from "./cartUtils";
import Card from './Card';

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
                  <Card key={index} product={product} showAddToCart={false} />
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
            {items.length > 0 ? showItems(items) : noItemsMessage()}
            {/*Checkout options/shipping address/total/update/quantity*/}
        </Default>
    )
};

export default Cart;