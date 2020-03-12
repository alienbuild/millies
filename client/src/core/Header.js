import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { cartTotal } from "./cartUtils";
import { signout, isAuthenticated } from "../auth";

const Header = ({ history }) => (
    <header>
        <nav>
            <ul>
                {/*(TODO: Add Authentication check to show/hide links)*/}
                {/*User is not authenticated*/}
                {!isAuthenticated() && (
                    <Fragment>
                        <li><Link to="/signin">Login</Link></li>
                    </Fragment>
                )}
                {/*User is authenticated*/}
                {isAuthenticated() && (
                    <Fragment>
                        <li><button onClick={(e) => signout(() => {
                            history.push('/');
                        })}>Log out</button></li>
                    </Fragment>
                )}
            </ul>
        </nav>
        <span><Link to="/cart">Cart <sup>{cartTotal()}</sup></Link></span>
    </header>
);

export default withRouter(Header);