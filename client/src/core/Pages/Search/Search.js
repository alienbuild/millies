import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getCategories, list } from "../../apiCore";
import ProductCard from '../../UI/ProductCard';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

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
                {searched ? <Redirect to={{
                    pathname: "/search-results",
                    state: { results }
                }} />: null}
            </div>

        )
    };

    return (
            <Row>
                <Col><Link to={"/"}><img src={"https://fakeimg.pl/200x75/333/fff/?text=Logo"} /></Link></Col>
                <Col>
                    <h4>Search</h4>
                    {searchForm()}
                    {searchedProducts(results)}
                </Col>
            </Row>
    )
};

export default Search;