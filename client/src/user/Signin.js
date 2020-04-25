import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

// Redux imports
import { connect } from 'react-redux';
import { setAlert } from "../actions/alert";

// Layout and method imports
import Default from '../layouts/Default';
import { signin, authenticate, isAuthenticated } from "../auth";

// Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Signin = ({setAlert, alerts}) => {

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
                    setAlert(data.error, 'danger');
                    setValues({...values, loading: false})
                } else {
                    authenticate(data, () => {
                        setValues({...values, redirectToReferrer: true})
                    });
                }
            })
    };

    // Signin form markup
    const signUpForm = () => (
        <div className="container">
            {showLoading()}
            {alerts !== null && alerts.length > 0 && alerts.map((alert) => (
                <Alert key={alert.id} variant={alert.alertType}>
                    {alert.msg}
                </Alert>
            ))}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange('password')} value={password} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => clickSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </div>
    );

    // Handle success
    const showLoading = () => (
        loading && (<div className="alert alert-info">Loading...</div>)
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
        <Default title="Signin" description="Signin description">
            {signUpForm()}
            {redirectUser()}
        </Default>
    )
};

const mapStateToProps = state => ({
   alerts: state.alert
});

export default connect(mapStateToProps, { setAlert })(Signin);