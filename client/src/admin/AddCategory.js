import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {

    // Init state
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    // Handle form changes
    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        createCategory(user._id, token, {name})
            .then( data => {
                if (data.error){
                    setError(true);
                } else {
                    setError('');
                    setSuccess(true);
                }
            })
            .catch(err => console.log('Error', err))
    };

    // Form markup
    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            <input type="text" name="name" onChange={handleChange} value={name} autoFocus required />
            <button>Create Category</button>
        </form>
    );

    // Handle success
    const showSuccess = () => {
        if (success){
            return <h3>Category '{name}' added.</h3>
        }
    };

    // Handle errors
    const showError = () => {
        if (error){
            return <h3>{name} should be unique.</h3>
        }
    };

    const goBack = () => {
      return(
          <Link to="/admin/dashboard">Back to Dashboard</Link>
      )
    };

    return(
        <Default title="Add Category" description={`Hello ${user.name}. Ready to add a new category?`}>
            <Fragment>
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
            </Fragment>
        </Default>
    )
};

export default AddCategory;