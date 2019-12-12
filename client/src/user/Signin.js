import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {

    // Init state
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    // Handle form field changes
    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    // Handle form submit
    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, () => {
                        setValues({...values, redirectToReferrer: true})
                    });
                }
            })
    };

    // Signin form markup
    const signUpForm = () => (
        <form>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange('email')} value={email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange('password')} value={password} />
            </div>
            <div>
                <button type="submit" onClick={(e) => clickSubmit(e)}>Submit</button>
            </div>
        </form>
    );

    // Handle errors
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    );

    // Handle success
    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    );

    // Handle redirect on successful login
    const redirectUser = () => {
        if(redirectToReferrer){
            if (user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            } else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()){
            return <Redirect to="/" />;
        }
    };

    return(
        <Layout title="Signin" description="Signin description">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
};

export default Signin;