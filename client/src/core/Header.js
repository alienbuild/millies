import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from "../auth";

const Header = ({ history }) => (
    <header id="header-primary">
            <div className="header__grid">
                <nav className="header__nav">
                    <div className="container">
                        <ul className="header__list">
                            {/*(TODO: Add Authentication check to show/hide links)*/}
                            <li className="header__item">United States</li>
                            {/*User is not authenticated*/}
                            {!isAuthenticated() && (
                                <Fragment>
                                    <li className="header__item"><Link to="/signup" className="header__item-link">Guest</Link></li>
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
                            <li className="header__item">0000 000 000</li>
                            <li className="header__item">Customer Services</li>
                        </ul>
                    </div>
                </nav>
                <div className="header__bottom-links">
                    <div className="container">
                        <Link to="/" className="header__logo"><img src="https://h-tune.co.uk/media/h-tune/logo.svg" alt="H-Tune Logo" width="135" /></Link>
                    </div>
                </div>
            </div>
    </header>
);

export default withRouter(Header);