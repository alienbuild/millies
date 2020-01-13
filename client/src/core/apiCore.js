import {API} from '../config';

// Get products
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('Error', err))
};

// Get categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log('Error', err))
};

// Get filtered products
export const getFilteredProducts = (offset, limit, filters = {}) => {
    const data = {
        limit, offset, filters
    };
    return fetch(`${API}/products/search/`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log('Error', err);
        })
};