import React from 'react';
import Header from '../core/UI/Header';
import Footer from '../core/UI/Footer';
import Menu from '../core/UI/Menu';

const ProductPage = ({title = 'Title', description = 'Description', className, children}) => (
    <>
        <Header title={title} description={description}/>
        <main className={className}>{children}</main>
        <Footer />
    </>
);

export default ProductPage;