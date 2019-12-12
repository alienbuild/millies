import React, {Fragment} from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

const Layout = ({title = 'Title', description = 'Description', className, children}) => (
    <Fragment>
        <Header />
        <Menu />
        <header>
            <h2>{title}</h2>
            <p>{description}</p>
        </header>
        <div className={className}>{children}</div>
        <Footer />
    </Fragment>
);

export default Layout;