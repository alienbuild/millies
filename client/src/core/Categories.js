import React, { useState, useEffect } from 'react';
import Default from '../layouts/Default';
import { getCategories, getFilteredProducts } from "./apiCore";
import {Link} from "react-router-dom";

const Categories = () => {

    // Init state
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    // Load categories
    const init = () => {
        getCategories().then(data => {
            if (data.error){
                setError(data.error);
            } else {
                setCategories(data);
            }
        })
    };

    useEffect(() => {
        init();
    }, []);

    return(
        <Default title="Categories page" description="Categories page description." className="container">
            <div className="row">
                Categories:
                <ul>
                    {categories && categories.map((category) => (
                        <li><Link to={`/categories/${category._id}`}>{category.name}</Link></li>
                    ))}
                </ul>
            </div>
        </Default>
    )
};

export default Categories;