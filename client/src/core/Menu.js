import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth";

const Menu = ({history}) => (
    <nav>
        <ul>
            <li><NavLink to="/" activeClassName="active" exact={true}>Homepage</NavLink></li>
            <li><NavLink to="/shop" activeClassName="active" exact={true}>Shop</NavLink></li>
            {/*User is not authenticated*/}
            {!isAuthenticated() && (
                <Fragment>
                    <li><NavLink to="/signin" activeClassName="active">Signin</NavLink></li>
                    <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
                </Fragment>
            )}
            {/*User is authenticated and admin*/}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li><NavLink to="/admin/dashboard" activeClassName="active">Dashboard</NavLink></li>
            )}
            {/*User is authenticated but not admin*/}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li><NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink></li>
            )}

        </ul>
    </nav>
);

export default withRouter(Menu);