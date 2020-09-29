import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Modal from './View';
import './team_data.css'
import { useCookies,withCookies } from "react-cookie";

const Teams=()=>{
   const [cookies,setCookie]=useCookies('AdminJwt');
   const [Teams, setTeam] = useState([]);
   
   useEffect( ()=>{
        getTeams();
    },[])


   const getTeams = async () =>{
     console.log(cookies.AdminJwt)
    const response = await axios.get('http://localhost:9000/admin/teams/all',
    { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} })
       console.log(response.data)
       setTeam(response.data);
   }

   const path = '/playerCards/icon.jpg';

   return ( <div className="main" style={{backgroundImage: "url(" + window.location.origin+path  }}>
         
   {Teams.map((Team) =><div className="column" key={Team.teamId}>
 
                   <div className="flip-box">
                          <div className="flip-box-inner">
                          <div className="flip-box-front">
                           {/* <div className=" col-12 text-center team-name"><b>{Team.teamName}</b></div> */}
                           {/* <img src={window.location.origin + Team.image} alt={window.location.origin + Team.image} className="img1"/> */}
                            <h1 className="center">{Team.teamName}</h1>
                             </div>
                           <div className="flip-box-back">
                               <h6 style={{fontSize:"large", fontWeight:"bold"}}>
                                   <table align="center" className="table">
                                     <tbody>
                                       <tr>
                                           <td>Team ID</td>
                                           <td>{Team.teamId}</td>
                                       </tr>
                                       <tr>
                                           <td>Team Players</td>
                                           <td colSpan="2">{Team.teamPlayer}</td>
                                       </tr>
                                       <tr>
                                           <td>Points </td>
                                           <td>{Team.points}</td>
                                       </tr>
                                       <tr>
                                           <td>Ranking </td>
                                           <td>{Team.ranking}</td>
                                       </tr>
                                       <tr>
                                           <td>Statistics </td>
                                           <td>{Team.statistics}</td>
                                       </tr>
                                       </tbody>
                                   </table>
                              </h6>   
                            </div>
                          </div>
                     </div>
                     <br/>    </div> 
        )}
 </div>
);
}
export default withCookies(Teams);