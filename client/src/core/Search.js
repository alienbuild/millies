import React, { useState, useEffect } from 'react';
import { getCategories, list } from "./apiCore";
import Card from './Card';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error){
                console.log(data.error);
            } else{
                setData({...data, categories: data})
            }
        })
    };

    useEffect(() => {
        loadCategories();
    },[]);

    const searchData = () => {
        console.log(search, category);
        if (search){
            list({search: search || undefined, category: category})
                .then((response) => {
                    if (response.error){
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true })
                    }
                })
        }
    };

    // Search form
    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const handleChange = (name) => e => {
        setData({ ...data, [name]: e.target.value, searched: false })
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div>
                <select onChange={handleChange('category')}>
                    <option value="All">All</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <input type="search" onChange={handleChange('search')} placeholder="Search..." />
                <button>Go</button>
            </div>
        </form>
    );
    
    // Messaging
    const searchMessage = (searched, results) => {
        if (searched && results.length > 0){
            return `Found ${results.length} product(s)`;
        }
        if (searched && results.length < 1){
            return 'No products were found.';
        }
    };

    // Results
    const searchedProducts = (results = []) => {
        return(
            <div>
                <h2>{searchMessage(searched, results)}</h2>
                <div>{results.map((product, index) => (
                    <Card key={index} product={product} />
                ))}</div>
            </div>

        )
    };

    return (
        <div>
            <h4>Search bar</h4>
            {searchForm()}
            {searchedProducts(results)}
        </div>
    )
};

export default Search;