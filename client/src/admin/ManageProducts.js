import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    // Init state
    const [products, setProducts] = useState([]);

    const {user,token} = isAuthenticated();

    const loadProducts = () => {
        getProducts()
            .then(data => {
                if (data.error){
                    console.log('Error loading all products', data.error);
                } else {
                    setProducts(data);
                }
            })
    };

    const destroyProduct = productId => {
      deleteProduct(productId, user._id, token)
          .then(data => {
              if (data.error){
                  console.log('Error deleting product', data.error);
              } else {
                  loadProducts();
              }
          })
    };

    useEffect(() => {
        loadProducts();
    },[]);

    return(
        <Default title="Manage products" description="Manage products CRUD">
            <h2>Manage products</h2>
            <ul>
                {products.map((product,index) => (
                    <li key={index}>
                        {product.name}
                        <br/>
                        <Link to={`/admin/product/update/${product._id}`}>Update</Link>
                        <button onClick={(e) => destroyProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </Default>
    )
};

export default ManageProducts;