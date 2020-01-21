import React, {Fragment} from 'react';
import Header from '../core/Header';
import Footer from '../core/Footer';
import Menu from '../core/Menu';

const Default = ({title = 'Title', description = 'Description', className, children}) => (
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

export default Default;