import React, { useState, useEffect } from 'react';
import Default from '../layouts/Default';
import { getCategories, getFilteredProducts } from "./apiCore";
import Card from './Card';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from "./fixedPrices";

const Shop = () => {

    // Init state
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    });
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

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

    // Load filtered results
    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(offset, limit, newFilters).then( data => {
            if (data.error){
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setOffset(0);
            }
        })
    };

    // Load more
    const loadMore = () => {
        let toSkip = offset + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then( data => {
            if (data.error){
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setOffset(toSkip);
            }
        })
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore}>Load more</button>
            )
        )
    };

    useEffect(() => {
        init();
        loadFilteredResults(offset, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
      const newFilters = {...myFilters};
      newFilters.filters[filterBy] = filters;

      if (filterBy === "prices"){
        let priceValues = handlePrice(filters);
        newFilters.filters[filterBy] = priceValues;
      }

      loadFilteredResults(myFilters.filters);
      setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];
        
        for (let key in data){
         if (data[key]._id === parseInt(value)){
             array = data[key].array;
         }
        }

        return array;
    };

    return(
        <Default title="Shop page" description="Shop page description." className="container">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by category</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>
                    <hr/>
                    <h4>Filter by prices</h4>
                    <ul>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'prices')} />
                    </ul>
                </div>
                <div className="col-8">
                    Main
                    <ul>
                        {filteredResults && filteredResults.map((product, index) => (
                            <Card key={index} product={product} />
                        ))}
                    </ul>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Default>
    )
};

export default Shop;