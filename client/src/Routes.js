import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components/Routes
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/user/dashboard" component={Dashboard} exact />
                <PrivateRoute path="/profile/:userId" component={Profile} exact />
                <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
                <AdminRoute path="/admin/category/add" component={AddCategory} exact />
                <AdminRoute path="/admin/product/add" component={AddProduct} exact />
                <AdminRoute path="/admin/orders" component={Orders} exact />
                <AdminRoute path="/admin/products" component={ManageProducts} exact />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;