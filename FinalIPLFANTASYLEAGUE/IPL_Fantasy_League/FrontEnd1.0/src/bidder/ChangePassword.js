import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavigationBar from './layout/NavBarLR';

const ChangePassword = () => {
    const history = useHistory();
    axios.defaults.withCredentials = true;

    const [Status, setStatus] = useState('');

    const [ShowPassword, setShowPassword] = useState(true);

    const [Passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });

    const handleChange = (event) => {
        setPasswords({ ...Passwords, [event.target.name]: event.target.value });
        console.log(Passwords);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('Checking old password');
        axios.post('http://localhost:8100/bidder/change_password', Passwords)
            .then((response) => {
                alert('Password successfully changed');
                history.push('/bidder');
            })
            .catch((error) => {
                ((error.response.status === 409) && setStatus(() => 'Wrong password'));
            });
        //  history.push("/verify");
    };

    const [Flag, setFlag] = useState(<button type="submit" className="btn btn-primary" disabled
        style={{
            fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0",
            background: "#37006a", borderRadius: "5px", width: "50%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
            webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
        }}>Submit</button>);

    const togglePassword = () => {
        setShowPassword(!ShowPassword);
    };

    const [PasswordStatus, setPasswordStatus] = useState('');
    const [CheckPassword, setCheckPassword] = useState('');

    let count = 0;

    const matchPassword = (event) => {
        if (event.target.name === 'newPassword') {
            count += 1;
            console.log(count);
            if (count >= 1 && Passwords.newPassword !== CheckPassword) {
                setPasswordStatus(<p>Passwords do not match</p>);
                setFlag(<button type="submit" className="btn btn-primary" disabled
                    style={{
                        fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0",
                        background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
                        webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
                    }}>Submit</button>);
            } else {
                setPasswordStatus('');
                setFlag(<button type="submit" className="btn btn-primary"
                    style={{
                        fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0",
                        background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
                        webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
                    }}>Submit</button>);
            }
        } else if (event.target.name === 'confirm_password') {
            setCheckPassword(event.target.value);
            if (Passwords.newPassword !== event.target.value) {
                setPasswordStatus(<p>Passwords do not match</p>);
                setFlag(<button type="submit" className="btn btn-primary" disabled style={{
                    fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0",
                    background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
                    webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
                }}>Submit</button>);
            } else {
                setPasswordStatus('');
                setFlag(<button type="submit" className="btn btn-primary" style={{
                    fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0",
                    background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
                    webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
                }}>Submit</button>);
            }
        }
    };

    return (
        <div>
            <NavigationBar />
            <form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>

                <input required type={ShowPassword ? "password" : "text"} id="name" name="oldPassword" onChange={handleChange} onBlur={matchPassword} placeholder="Old Password"
                    style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                <input required type={ShowPassword ? "password" : "text"} id="password" name="newPassword" onChange={handleChange} onBlur={matchPassword} placeholder="New Password"
                    style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                <input required type={ShowPassword ? "password" : "text"} id="confirm_password" name="confirm_password" onChange={handleChange} onBlur={matchPassword} placeholder="Confirm Password"
                    style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} /><br />
                <small>{PasswordStatus}</small>

                <input type="checkbox" id="showPassword" name="showPassword" onClick={togglePassword} />Show Password<br />
                {Flag}
            </form>
            <p>{Status}</p>
        </div>
    );
};

export default ChangePassword;
