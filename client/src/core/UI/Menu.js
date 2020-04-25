import React, { Fragment } from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import { signout, isAuthenticated } from "../../auth";
import { cartTotal } from "../Misc/cartUtils";

// Bootstrap imports
import Nav from 'react-bootstrap/Nav'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Menu = ({ history }) => (
    <Row>
        <Col>
            <nav id={"n-primary"}>
                <Nav defaultActiveKey="/" as="ul" className="justify-content-end">
                    <Nav.Item as="li"><NavLink to="/shop" activeClassName="active" exact={true}>Shop</NavLink></Nav.Item>

                    {/*User is not authenticated*/}
                    {!isAuthenticated() && (
                        <>
                            <Nav.Item as="li"><NavLink to="/signin" activeClassName="active">Signin</NavLink></Nav.Item>
                            <Nav.Item as="li"><NavLink to="/signup" activeClassName="active">Signup</NavLink></Nav.Item>
                        </>
                    )}

                    {/*User is authenticated and admin*/}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <>
                            <Nav.Item as="li"><NavLink to="/admin/dashboard" activeClassName="active">Dashboard</NavLink></Nav.Item>
                            <Nav.Item as="li"><button onClick={(e) => signout(() => {
                                history.push('/');
                            })}>Log out</button></Nav.Item>
                        </>
                    )}

                    {/*User is authenticated but not admin*/}
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <>
                            <Nav.Item as="li"><NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink></Nav.Item>
                            <Nav.Item as="li"><button onClick={(e) => signout(() => {
                                history.push('/');
                            })}>Log out</button></Nav.Item>
                        </>
                    )}
                    <Nav.Item as="li"><Link to="/categories/all">Categories</Link></Nav.Item>
                    <Nav.Item as="li"><Link to="/cart">Cart <sup>{cartTotal()}</sup></Link></Nav.Item>
                </Nav>
            </nav>
        </Col>
    </Row>
);

export default withRouter(Menu);