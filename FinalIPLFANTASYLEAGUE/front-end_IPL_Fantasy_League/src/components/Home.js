import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from './View';
import { useCookies,withCookies } from "react-cookie"; //------------------------------------------------->IMPORTS FOR COOKIE
import NavigationBarAdmin from './layout/NavigationBarAdmin';

const Home = ()=>{
   
   const [cookies,setCookie]=useCookies('AdminJwt');  //------------------------------------------------->NAME OF COOKIE
   const [matches, setMatch] = useState([])
   
   useEffect( ()=>{
        getMatches();
    },[])


   const getMatches = async () =>{
     console.log(cookies.AdminJwt)
    const response = await axios.get('http://localhost:9000/admin/match',
    { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} }   // ------------------------------------------------------>HEADER AUTH
    ) 
      //  console.log(response.data)
       setMatch(response.data);
   }

    return(
      
        <div>
          <NavigationBarAdmin />
            <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Team One</th>
      <th scope="col">Team Two</th>
      <th scope="col">Match Date</th>
      <th scope="col" class="align-items-center">Actions</th>
    </tr>
  </thead>
  <tbody>
     {matches.map((match, index) =>(
            <tr key={match.matchId}>
            <th scope="row">{index+1}</th>
            <td>{match.teamOne}</td>
            <td>{match.teamTwo}</td>
            <td>{match.date}</td>
            <td>
                <Link class="btn btn-outline-success mr-2 btn-sm" to={"/match/"+match.matchId}><i class="fa fa-eye" title="View Details"></i></Link>
                <Link class="btn btn-outline-primary mr-2 btn-sm" to={"/matches/edit/"+match.matchId}><i class="fa fa-pencil-square-o" title="Edit Record"></i></Link>
                <Link class="btn btn-danger mr-2 btn-sm" style={{display:"none"}}><i class="fa fa-trash" title="Delete Record"></i></Link>
            </td>
          </tr>
     ))} 
    
  </tbody>
</table>
        </div>
    )
}

export default Home;