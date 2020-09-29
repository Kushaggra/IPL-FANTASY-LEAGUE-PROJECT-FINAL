import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import NavigationBar from './layout/NavBarAnonymous';

const Login = () => {
    const history = useHistory();
    const [Status, setStatus] = useState('');

    const [Credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const { username, password } = Credentials;

    const handleChange = (event) => {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value });
        if (event.target.name === username) {
            // eslint-disable-next-line max-len
            setCredentials({ ...Credentials, [event.target.name]: event.target.value.toLowerCase() });
        }
        console.log(Credentials);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(Credentials);
        axios.defaults.withCredentials = true;
        await axios.post("http://localhost:8100/bidder/login", Credentials)
            .then((response) => {
                history.push('/bidder');
            })
            .catch(() => { setStatus(() => 'Incorrect Username or Password'); });
    };

    const [ShowPassword, setShowPassword] = useState(true);
    const togglePassword = () => {
        setShowPassword(!ShowPassword);
    };
    const path1 ='/playerCards/Security-amico.png'
    return (
        <div>
            <NavigationBar />
            <form class="login-page" onSubmit={handleSubmit} style={{marginTop:"50px"}}>
                <div class="LoginForm " style={{
                    position: "relative", background: "#FFFFFF", width:
                        "360px", margin: "0 auto 100px", padding: "45px", textAlign: "center",
                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
                }}>
                    <img src={window.location.origin + path1} width="200px" class="LoginImg" />
                    <form class="login-LoginForm">

                        <i class="fa fa-user" aria-hidden="true"></i>&nbsp;<input required type="text" name="username" id="userName"
                            onChange={handleChange} placeholder="username" style={{
                                fontFamily: "Roboto, sans-serif", outline: "0",
                                background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px"
                            }} />


                        <i class="fa fa-key" aria-hidden="true"></i>&nbsp;<input required type={ShowPassword ? "password" : "text"} id="password" name="password"
                            onChange={handleChange} placeholder="password" style={{
                                fontFamily: "Roboto, sans-serif",
                                outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px"
                            }} />

                        <input type="checkbox" id="showPassword" name="showPassword" onClick={togglePassword} />
                    Show Password


                    <button type="submit" style={{
                            fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0",
                            background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
                            webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
                        }}>
                            Login</button>

                        <br />
                        <Link to="/bidder/forgotpassword">Forgot password</Link>
                    </form>
                    <p>{Status}</p>
                    </div>
            </form> 
        </div>
    );
};

export default Login;
