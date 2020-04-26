import React, { useState, useEffect } from 'react';
import Default from '../../layouts/Default';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ProductUpsell = (props) => {

    const { _id, name, price, category } = props.location.state.product;

    console.log('Collected: ', _id, name, price, category.name);

    useEffect(() => {
    },[]);

    return(
        <Default title={`Added to basket: ${name}`} description="ProductUpsell page description">
            <div className="container">
                <section>
                    <Row>
                        <Col>
                            Added to basket
                        </Col>
                        <Col>
                            Basket subtotal: (1 item): £12.99
                        </Col>
                        <Col>
                            <Button>Edit basket</Button>
                            <Button>Proceed to checkout</Button>
                        </Col>
                    </Row>
                </section>
            </div>
        </Default>
    )
};

export default ProductUpsell;