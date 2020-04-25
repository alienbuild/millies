import React, { useState, useEffect } from 'react';
import Default from '../../../layouts/Default';
import { getCategories, getFilteredProducts, getProductsByCat } from "../../apiCore";
import {Link} from "react-router-dom";
import ProductCard from "../../UI/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";

const CategorySpecific = ({match}) => {

    // Init state
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    // Load categories
    const init = () => {
        getProductsByCat(match.params.categoryId).then(data => {
            if (data.error){
                setError(data.error);
            } else {
                setProducts(data);
                setIsLoading(false);
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
                    <CardDeck>
                        {products && products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </CardDeck>
                    {products.length == 0 && !isLoading ? 'No products found' : null}
                </Col>
            </Row>
        </Default>
    )
};

export default CategorySpecific;