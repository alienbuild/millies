import React, { useState, useEffect } from 'react';
import Default from '../../../layouts/Default';
import { getCategories, getFilteredProducts } from "../../apiCore";
import {Link} from "react-router-dom";

const CategorySpecific = () => {

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
        <Default title="Category specific page" description="Category specific page description." className="container">
            <div className="row">
                Products within specific category:
                <ul>
                    {categories && categories.map((category) => (
                        <li><Link to={`categories/${category._id}`}>{category.name}</Link></li>
                    ))}
                </ul>
            </div>
        </Default>
    )
};

export default CategorySpecific;