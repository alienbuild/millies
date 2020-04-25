import React, { useState, useEffect } from 'react';
import Default from '../../../layouts/Default';
import ProductCard from "../../UI/ProductCard";

const SearchResults = (props) => {

    // Init state
    const [results, setResults] = useState([]);

    // Load categories
    const init = () => {
        setResults(props.location.state.results);
    };

    useEffect(() => {
        init();
    }, []);

    return(
        <Default title="Search results" description="Search results description." className="container">
            <div>{results && results.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}</div>
        </Default>
    )
};

export default SearchResults;