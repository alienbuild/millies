import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import Default from '../layouts/Default';
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import Search from "../core/Search";
import Card from "../core/Card";

const Profile = ({match}) => {
    // Init state
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        // TODO: Add more as necessary
        error: false,
        success: false
    });

    const {token} = isAuthenticated();

    const { name, email, password, error, success } = values;

    const init = (userId) => {
        console.log('User ID is:', userId);
        read(userId, token)
            .then(data => {
                if (data.error){
                    setValues({...values, error: true})
                } else {
                    setValues({...values, name: data.name, email: data.email})
                }
            })
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    return(
        <Default title="Profile" description="Profile description">
            <h2>Profile update.</h2>
            {JSON.stringify(values)}
        </Default>
    )

};

export default Profile;