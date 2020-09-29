import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavigationBar from './layout/NavBarLR';

export default function Verify() {
    axios.defaults.withCredentials = true;
    const history = useHistory();

    const [Code, setCode] = useState({
        code: 0,
    });


    const [Status, setStatus] = useState('');

    const handleChange = (event) => {
        setCode({ [event.target.name]: event.target.value });
        console.log(Code);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('Verifying code');
        console.log(Code);
        axios.post('http://localhost:8100/bidder/verify', Code)
            .then((response) => {
                history.push('/bidder');
            })
            .catch(setStatus('Please check the code and try again'));
        // history.push("/verify");
    };

    const resend = () => {
        setStatus('Sending code');
        axios.get('http://localhost:8100/bidder/resend')
            .then(() => {
                setStatus('Code sent');
            });
    };

    return (
        <div>
            <NavigationBar />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="code">OTP</label>
                    <input type="text" required className="form-control" id="code" name="code" onChange={handleChange} />
                    <small id="emailHelp" className="form-text text-muted">Please enter the code sent to your email to activate your account.</small>
                </div>
                <button type="submit" className="btn btn-primary" 
                style={{ fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0", 
                background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px",color: "#FFFFFF",fontSize: "14p", 
                webkitTransition: "all 0.3 ease", transition: "all 0.3 ease",cursor:"pointer" }}>Verify</button>
                <br />
            </form>
            <br/>
            <button type="button" id="resend" className="btn" onClick={resend}>Resend code</button>
            <p>{Status}</p>
        </div>
    );
}
