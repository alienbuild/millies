import React, {Fragment, useEffect, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Menu from './Menu';
import { getCategories } from "../apiCore";
import Nav from "react-bootstrap/Nav";
import Search from "../Pages/Search/Search";

const Header = ({ title, description }) => {

    // Init state
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    // Load categories
    const init = () => {
        getCategories()
            .then(data => {
                if (data.error){
                    setError(data.error);
                } else {
                    setCategories(data);
                }
            })
            .catch((err) => console.log('Error: ', err))
    };

    useEffect(() => {
        init();
    }, []);

    return(
        <header>
            <div className="container">
                <Menu/>
                <Search />
                <Nav activeKey="/" as="nav">
                    {categories && categories.map((category, index) => (
                        <Nav.Item as="li" key={index}><Nav.Link href={`/categories/${category._id}`}>{category.name}</Nav.Link></Nav.Item>
                    ))}
                </Nav>
            </div>
            <div className="container">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </header>
    )
};

export default withRouter(Header);