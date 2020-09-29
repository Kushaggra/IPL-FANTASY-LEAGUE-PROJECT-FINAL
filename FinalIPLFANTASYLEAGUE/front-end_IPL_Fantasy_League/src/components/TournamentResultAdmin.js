import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from './View';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import winner from '../components/layout/winner3.png';
import NavigationBar from './layout/NavigationBar';
import { useCookies,withCookies } from "react-cookie"; //------------------------------------------------->IMPORTS FOR COOKIE

const TournamentResult = () => {

const [cookies,setCookie]=useCookies('AdminJwt');  //------------------------------------------------->NAME OF COOKIE
  const [results, setResult] = useState(
    {
      firstTeam: '',
      secondTeam: '',
      thirdTeam: ''

    }
  )

  
  const getResult = async () => {
    await axios.get('http://localhost:9000/admin/declareresults',
      { headers: { "Authorization": `Bearer ${cookies.AdminJwt}` } })
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
      })
  }

let index = 0;
  return(
      <div>
        <NavigationBarAdmin/><br/>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Team Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col">{index+1}</th>
                <th scope="col">{results.firstTeam}</th>
              </tr>
              <tr>
                <th scope="col">{index+2}</th>
                <th scope="col">{results.secondTeam}</th>
              </tr>
              <tr>
                <th scope="col">{index+3}</th>
                <th scope="col">{results.thirdTeam}</th>
              </tr>
            </tbody>
            </table>
            <button onClick={getResult} style={{ fontFamily:"Roboto, sans-serif", textTransform:"uppercase", outline:"0", background:"#37006a", borderRadius:"5px", width:"30%", border:"0", padding:"15px", color:"#FFFFFF", fontSize:"14p", webkitTransition:"all 0.3 ease", transition:"all 0.3 ease", cursor:"pointer" }}>Declare Results</button>

         </div>
              )
    }

export default TournamentResult;