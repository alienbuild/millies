import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components/Routes
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Home from './core/Pages/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import Shop from './core/Pages/Shop';
import Categories from './core/Pages/Category/Categories';
import Category from './core/Pages/Category/Category';
import Product from './core/Pages/Product';
import Cart from './core/Pages/Cart';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import SearchResults from "./core/Pages/Search/SearchResults";
import NotFound from "./core/Pages/NotFound";

// Redux
import { Provider } from 'react-redux';
import store from './store';
import ProductUpsell from "./core/Pages/ProductUpsell";
import Forgot from "./user/Forgot";
import Reset from "./user/Reset";

const Routes = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/search-results" exact render={(props) => <SearchResults {...props}/>} />
                <Route path="/categories/all" exact component={Categories} />
                <Route path="/categories/:categoryId" exact component={Category} />
                <Route path="/login" exact component={Signin} />
                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                <Route path="/register" exact component={Signup} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path={"/cart/added-to-cart"} exact component={ProductUpsell} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/user/dashboard" component={Dashboard} exact />
                <PrivateRoute path="/profile/:userId" component={Profile} exact />
                <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
                <AdminRoute path="/admin/category/add" component={AddCategory} exact />
                <AdminRoute path="/admin/product/add" component={AddProduct} exact />
                <AdminRoute path="/admin/orders" component={Orders} exact />
                <AdminRoute path="/admin/products" component={ManageProducts} exact />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
        </Provider>
    )
};

export default Routes;