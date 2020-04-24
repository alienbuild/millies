import React from 'react';
import Header from '../core/UI/Header';
import Footer from '../core/UI/Footer';


const Default = ({title = 'Title', description = 'Description', className, children}) => (
    <>
        <Header title={title} description={description} />
        <main className={className}>{children}</main>
        <Footer />
    </>
);

export default Default;