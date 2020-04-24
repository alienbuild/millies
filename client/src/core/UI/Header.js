import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Menu from './Menu';
import { cartTotal } from "../cartUtils";
import { signout, isAuthenticated } from "../../auth";

const Header = ({ title, description }) => (
    <header>
        <div className="container">
            <Menu />
        </div>
        <div className="container">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </header>
);

export default withRouter(Header);