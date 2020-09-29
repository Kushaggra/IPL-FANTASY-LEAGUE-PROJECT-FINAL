import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavigationBar from './layout/NavBarAnonymous';

const Reset = () => {
    axios.defaults.withCredentials = true;
    const [Status, setStatus] = useState('');

    const [User, setUser] = useState({
        username: '',
        email: '',
    });

    const handleChange = (event) => {
        setUser({ ...User, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus(<div>Sending password reset email</div>);
        axios.post('http://localhost:8100/bidder/reset_password', User)
            .then((response) => {
                if (response.data === 'Password has been changed') {
                    setStatus(
                        <div>
                            Password reset email has been sent. Please login using the new password at the following link
                            <Link to="/bidder/login">Login</Link>
                        </div>)}})
            .catch((error)=>{
                setStatus(<div>Username and Email did not match any records.</div>)
            })
    };

    return (
        <div>
            <NavigationBar />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input type="text" required className="form-control" id="userName" name="username" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" required className="form-control" id="email" name="email" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p>{Status}</p>
        </div>
    );
};

export default Reset;
