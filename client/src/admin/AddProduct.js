import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Layout from '../core/Layout';
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {

    // Init state
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {user, token} = isAuthenticated();

    const {
        name,
        description,
        price,
        categories,
        cateogry,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // Get categories
    const init = () => {
        getCategories()
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, categories: data, formData: new FormData()})
                }
            });
    };

    useEffect(() => {
        init();
    }, []);

    // Handle form changes
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: '', loading: true});
        console.log('Form data is', formData);

        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        loading: false,
                        createdProduct: data.name
                    })
                }
            })
            .catch()
    };

    // Form markup
    const newProductForm = () => (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={handleChange('name')} value={name} />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="textarea" name="description" onChange={handleChange('description')} value={description} />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" name="price" onChange={handleChange('price')} value={price} />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={handleChange('category')}>
                    <option disabled selected>Please select</option>
                    {categories && categories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="shipping">Shipping</label>
                <select name="shipping" id="shipping" onChange={handleChange('shipping')}>
                    <option disabled selected>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" name="quantity" onChange={handleChange('quantity')} value={quantity} />
            </div>

            <button type="submit">Create Product</button>
        </form>
    );

    // Handle error
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    // Handle success
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    // Handle loading
    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const goBack = () => {
        return(
            <Link to="/admin/dashboard">Back to Dashboard</Link>
        )
    };

    return(
        <Layout title="Add Product" description={`Hello ${user.name}. Ready to add a new product?`}>
            <Fragment>
                {showSuccess()}
                {showError()}
                {newProductForm()}
                {goBack()}
            </Fragment>
        </Layout>
    )
};

export default AddProduct;