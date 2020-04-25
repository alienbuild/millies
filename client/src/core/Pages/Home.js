import React, { useState, useEffect } from 'react';
import Default from '../../layouts/Default';
import { getProducts } from "../apiCore";
import ProductCard from '../UI/ProductCard';
import Search from './Search/Search';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
    // Init state
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    // Get most sold products
    const loadProductsBySell = () => {
        getProducts('sold')
            .then(data => {
                if (data.err){
                    setError(data.error);
                } else{
                    setProductsBySell(data);
                }
            })
            .catch(err => console.log(err))
    };

    // Get latest products
    const loadProductsByArrival = () => {
        getProducts('createdAt')
            .then(data => {
                if (data.err){
                    setError(data.error);
                } else{
                    setProductsByArrival(data);
                }
            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    },[]);

    return(
        <Default title="Home page" description="Homepage description">
            <div className="container">
                <section>
                    <Row>
                        <Col>
                            <h2>Fresh Stock</h2>
                            {productsByArrival.map((product,index) => (<ProductCard key={index} product={product} />))}
                        </Col>
                    </Row>
                </section>
                <section>
                    <Row>
                        <Col>
                            <h2>Popular Items</h2>
                            {productsBySell.map((product,index) => (<ProductCard key={index} product={product} />))}
                        </Col>
                    </Row>
                </section>
            </div>
        </Default>
    )
};

export default Home;