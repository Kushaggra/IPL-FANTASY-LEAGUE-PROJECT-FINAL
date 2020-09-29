import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavigationBar from './layout/NavBarAnonymous';

const Register = () => {
    const history = useHistory();
    axios.defaults.withCredentials = true;
    const [Bidder, setBidder] = useState({
        userName: '',
        password: '',
        name: '',
        email: '',
        phoneNo: '',
        isEnabled: false,
    });
    const { userName, password, name, email, phoneNo, isEnabled } = Bidder;


    const [Status, setStatus] = useState('');

    const [ShowPassword, setShowPassword] = useState(true);

    const handleChange = (event) => {
        setBidder({ ...Bidder, [event.target.name]: event.target.value });
        if (event.target.name === userName || event.target.name === email) {
            setBidder({ ...Bidder, [event.target.name]: event.target.value.toLowerCase() });
        }
        console.log(Bidder);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('Sending verification email');
        axios.post('http://localhost:8100/bidder/register', Bidder)
            .then((response) => {
                history.push('/bidder/verify');
            })
            .catch((error) => {
                ((error.response.status === 409) && setStatus(() => 'Error'));
            });
        //  history.push("/verify");
    };

    const [EmailStatus, setEmailStatus] = useState('');

    const [UsernameStatus, setUsernameStatus] = useState('');

    const [Flag, setFlag] = useState(<button type="submit" className="btn btn-primary" disabled 
    style={{ fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0", 
    background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px",color: "#FFFFFF",fontSize: "14p", 
    webkitTransition: "all 0.3 ease", transition: "all 0.3 ease",cursor:"pointer" }}>Submit</button>);

    const handleMouseLeave = (event) => {
        if (event.target.name === 'userName') {
            axios.post('http://localhost:8100/bidder/check_username', { [event.target.name]: event.target.value.toLowerCase() })
                .then(() => {
                    setUsernameStatus(null);
                    setFlag(<button type="submit" className="btn btn-primary">Submit</button>);
                })
                .catch(() => {
                    setUsernameStatus('Username already exists. Please choose another one.');
                    setFlag(<button type="submit" className="btn btn-primary" disabled>Submit</button>);
                });
        } else if (event.target.name === 'email') {
            axios.post('http://localhost:8100/bidder/check_email', { [event.target.name]: event.target.value.toLowerCase() })
                .then(() => {
                    console.log('Email accepted');
                    setEmailStatus(null);
                    setFlag(<button type="submit" className="btn btn-primary" >Submit</button>);
                })
                .catch(() => {
                    setEmailStatus('Email already taken. Please choose a different one.');
                    setFlag(<button type="submit" className="btn btn-primary" disabled>Submit</button>);
                });
        }
    };

    const togglePassword = () => {
        setShowPassword(!ShowPassword);
    };

    const [PasswordStatus, setPasswordStatus] = useState('');
    const [CheckPassword, setCheckPassword] = useState('');

    let count = 0;

    const matchPassword = (event) => {
        if (event.target.name === 'password') {
            count++;
            if (count > 1 && password !== CheckPassword) {
                setPasswordStatus(<p>Passwords do not match</p>);
                setFlag(<button type="submit" className="btn btn-primary" disabled>Submit</button>);
            }
            else {
                setPasswordStatus('');
                setFlag(<button type="submit" className="btn btn-primary" >Submit</button>);
            }
        }
        else if (event.target.name === 'confirm_password') {
            setCheckPassword(event.target.value);
            if (password !== event.target.value) {
                setPasswordStatus(<p>Passwords do not match</p>);
                setFlag(<button type="submit" className="btn btn-primary" disabled>Submit</button>);
            }
            else {
                setPasswordStatus('');
                setFlag(<button type="submit" className="btn btn-primary" >Submit</button>);
            }
        }
    };

    return (
        <div>
            <NavigationBar />
            <form onSubmit={handleSubmit} style={{marginTop:"50px"}}>


                <div class="login-page " onSubmit={handleSubmit}>
                    <div class="LoginForm " style={{
                        position: "relative", background: "#FFFFFF", width:
                            "360px", margin: "0 auto 100px", padding: "45px", textAlign: "center",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
                    }}>
                        <div class="login-LoginForm">

                            <input required type="text" id="name" name="name" onChange={handleChange} placeholder="Name"
                                style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                            <input required type="text" id="userName" name="userName" onChange={handleChange} onBlur={handleMouseLeave} placeholder="User Name"
                                style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                            <small id="userName" className="form-text">{UsernameStatus}</small>

                            <input required type={ShowPassword ? "password" : "text"} id="password" name="password" onChange={handleChange} onBlur={matchPassword} placeholder="Password"
                                style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                            <input required type={ShowPassword ? "password" : "text"} id="confirm_password" name="confirm_password" onChange={handleChange} onBlur={matchPassword} placeholder="Confirm Password"
                                style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} /><br />
                            <small>{PasswordStatus}</small>

                            <input type="checkbox" id="showPassword" name="showPassword" onClick={togglePassword} />Show Password<br/>

                            <input required type="email" id="email" name="email" onChange={handleChange} onBlur={handleMouseLeave} aria-describedby="emailHelp" placeholder="Email Address"
                                style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                            <small id="userName" className="form-text">{EmailStatus}</small>
                            <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>

                            <input required type="number" id="phoneNo" name="phoneNo" onChange={handleChange} placeholder="Phone number"
                                style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                            {Flag}
                        </div>
                        <p>{Status}</p>
                    </div>
                </div>
            </form>
        </div>   
        
    );
};

export default Register;
