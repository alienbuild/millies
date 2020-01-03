import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth";

const Header = ({ history }) => (
    <header id="header-primary">
            <div className="header__grid">
                <nav className="header__nav">
                    <ul>
                        {/*(TODO: Add Authentication check to show/hide links)*/}
                        {/*User is not authenticated*/}
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="header__item"><Link to="/signin" className="header__item-link">Login</Link></li>
                            </Fragment>
                        )}
                        {/*User is authenticated*/}
                        {isAuthenticated() && (
                            <Fragment>
                                <li className="header__item"><button className="header__item-link" onClick={(e) => signout(() => {
                                    history.push('/');
                                })}>Log out</button></li>
                            </Fragment>
                        )}
                    </ul>
                </nav>
            </div>
    </header>
);

export default withRouter(Header);