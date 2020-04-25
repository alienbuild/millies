import React, { useState, useEffect } from 'react';
import Default from '../../../layouts/Default';
import { getCategories, getFilteredProducts, getProductsByCat } from "../../apiCore";
import {Link} from "react-router-dom";
import ProductCard from "../../UI/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CategorySpecific = ({match}) => {

    // Init state
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    // Load categories
    const init = () => {
        getProductsByCat(match.params.categoryId).then(data => {
            if (data.error){
                setError(data.error);
            } else {
                setProducts(data);
            }
        })
    };

    useEffect(() => {
        init();
    }, []);

    return(
        <Default title="Category page" description="Category page description." className="container">
            <Row>
                <Col>
                    <ul>
                        {products && products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </ul>
                </Col>
            </Row>
        </Default>
    )
};

export default CategorySpecific;