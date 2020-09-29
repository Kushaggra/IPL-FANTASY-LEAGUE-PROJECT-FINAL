import Axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';

const Logout = () => {
    const history = useHistory();

    Axios.get("http://localhost:8100/bidder/logout")
        .then((response) => {
            history.push("/bidder/login")
        })
        .catch((error) => {
            alert("You are already logged out");
            history.push("/bidder/login")
        })

    return (<div>Logout page</div>)
}

export default Logout;