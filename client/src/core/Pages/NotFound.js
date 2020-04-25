import React, { useState, useEffect } from 'react';
import Default from '../../layouts/Default';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NotFound = () => {

    useEffect(() => {
    },[]);

    return(
        <Default title="NotFound page" description="NotFound page description">
            <div className="container">
                <section>
                    <Row>
                        <Col>
                            <p>Sorry, this page doesn't exist.</p>
                        </Col>
                    </Row>
                </section>
            </div>
        </Default>
    )
};

export default NotFound;