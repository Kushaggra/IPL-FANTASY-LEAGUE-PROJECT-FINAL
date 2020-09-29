import React from 'react'
import { Link } from 'react-router-dom';
import './NavigationBarAdmin.css'
// import { useCookies,withCookies } from "react-cookie";
import axios from 'axios';

const NavigationBar = (props) => {
    // let isLoggedIn=false
    // const [cookies,setCookie]=useCookies()
    
    // const LogOutFunc=()=>{
    //     setCookie('AdminJwt',"",-1)
    // }
  

    // const checkLoginStatus = async () =>{
    //  await axios.get('http://localhost:9000/admin/verify',
    //  { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} }).then((response)=>{
    //    if(response.data==true)
    //       isLoggedIn=response.data
    //      else
    //         isLoggedIn=false 

    //      console.log("loginStatus="+isLoggedIn)   
    //  })
    //  return isLoggedIn
    // } 
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="#"><b>IPL Fantasy League</b></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link class="dropbtn1" to="/">Home <span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item">
                        <Link class="dropbtn1" to="/teamhome">Teams</Link>
                    </li>
                    <li class="color_link nav-item">
                        <Link class="dropbtn1" to="/matchhome">Matches</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="dropbtn1" to="/homeleaderboard">Leader Board</Link>
                    </li>
                    {/* <li class="nav-item">
                        <Link class="dropbtn1" to="/matchstats">MatchStats</Link>
                    </li> */}
                    <li class="nav-item active">
                <Link class="dropbtn1" to="/tournamentresult">Tournament Results</Link>
                </li>
                </ul>
                {/* <Link class="dropbtn1" to="/match" className="btn btn-outline-light" style={{display:props.disp}}> Add Match</Link> */}
                <Link class="dropbtn1" to="/afteradmin" className="btn btn-outline-light">SignIn/SignUp</Link>
        </div>
      </nav>
    )
}

export default NavigationBar;