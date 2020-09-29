import React from 'react'
import { Link } from 'react-router-dom';
import AddTournament from '../AddTournament';
import './NavigationBarAdmin.css'
import { useCookies,withCookies } from "react-cookie";
import axios from 'axios';


const NavigationBarAdmin = (props) => {
    let isLoggedIn=false
    const [cookies,setCookie]=useCookies()
    
    const LogOutFunc=()=>{
        setCookie('AdminJwt',"",-1)
    }
  

    const checkLoginStatus = async () =>{
     await axios.get('http://localhost:9000/admin/verify',
     { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} }).then((response)=>{
       if(response.data==true)
          isLoggedIn=response.data
         else
            isLoggedIn=false 

         console.log("loginStatus="+isLoggedIn)   
     })
     return isLoggedIn
    } 
    return (

        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#"><b>IPL Fantasy League</b></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <Link class="dropbtn1" to="/home">Home</Link>
                </li>
                <li class="nav-item">
                <div class="dropdown">
                <button class="dropbtn1">Tournaments</button>
                <div class="dropdown-content">
                <Link class="nav-link" to="/addtournament">Add Tournament</Link>
                <Link class="nav-link" to="/updatetournament">Update Tournament</Link>
                <Link class="nav-link" to="/gettournament">Get Tournament</Link>
                
                </div>
                </div>
                </li>
                <li class="nav-item">
                <div class="dropdown">
                <button class="dropbtn1">Teams</button>
                <div class="dropdown-content">
                <Link class="nav-link" to="/addteam">Add Teams</Link>
                <Link class="nav-link" to="/getteam">View Teams</Link>
                <Link class="nav-link" to="/countteams">Count Teams</Link>
                <Link class="nav-link" to="/teams/delete">Delete Teams</Link>

                </div>
                </div>                
                </li>
                <li class="nav-item">
                <div class="dropdown">
                <button class="dropbtn1">Matches</button>
                <div class="dropdown-content">
                <Link class="nav-link" to="/match">Add Matches</Link>
                <Link class="nav-link" to="/matches">View/Update Matches</Link>
                {/* <Link class="nav-link" to="/deletematches">Delete Matches</Link> */}
                <Link class="nav-link" to="/conductmatch">Conduct Match</Link>
                </div>
                </div>                
                </li>
                <li class="nav-item">
                        <Link class="dropbtn1" to="/leaderboard">Leader Board</Link>
                </li>
                <li class="nav-item">
                        <Link class="dropbtn1" to="/declareResult">Tournament Result</Link>
                </li>
            </ul>
            {/* <Link class="nav-link" to="/" className="btn btn-outline-light" style={{display:props.disp}}>SignOut</Link> */}
            <Link class="nav-link" onClick={LogOutFunc} className="btn btn-outline-light" to="/" style={{display:checkLoginStatus()?'block':'none'}}>SignOut</Link>
    </div>
  </nav>
        
    )
}

export default NavigationBarAdmin;

