import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavigationBar = () => {
    const history = useHistory();

    return (<div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="/" style={{color:"white !important" }}>IPL Fantasy League</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link className="dropbtn1" to="/bidder/login">Login</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="dropbtn1" to="/bidder/register">Register</Link>
                    </li>

                </ul>
            </div>
        </nav>
    </div>
    );
}

export default NavigationBar;