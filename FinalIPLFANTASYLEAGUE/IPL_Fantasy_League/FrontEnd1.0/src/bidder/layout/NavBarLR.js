import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavigationBar=()=>{
    const history = useHistory();
    const [Bidder, setBidder] = useState();
    const [Status, setStatus] = useState(false);

    const getBidderDetails = () => {
        Axios.get("http://localhost:8100/bidder/details")
            .then((response) => {
                setBidder(response.data);
                if(response.data.isEnabled === true){
                    setStatus(true);
                }
                
                console.log("BIDDER FOUND")
            })
            .catch((error) => {
                console.log(error.response.data)
                history.push("/bidder/login")
                setStatus(false);
            })
    }

    useEffect(() => {
        getBidderDetails();
    },[]);

    return(<div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/" style={{color:"white !important" }}>IPL Fantasy League</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link class="dropbtn1" to="/bidder/teampoints">Team Points</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="dropbtn1" to="/bidder/leaderboard">Leaderboard</Link>
                    </li>
                    <li class="nav-item">
                        {/*<span class="sr-only">(current)</span>*/}
                        <Link class="dropbtn1" to="/bidder">Matches</Link>
                    </li>
                    <li class="nav-item">
                       {(Status===true) && <Link class="dropbtn1" to="/bidder/bids">Bids Placed</Link>} 
                    </li>
                    <li class="nav-item">
                    <Link className="dropbtn1" to="/bidder/changepassword">Change Password</Link>
                    </li>
                    <li class="nav-item">
                    <Link className="dropbtn1" to="/bidder/logout">Logout</Link>
                    </li>
                    </ul>
                </div>
            </nav>
            </div>
    );
}

export default NavigationBar;