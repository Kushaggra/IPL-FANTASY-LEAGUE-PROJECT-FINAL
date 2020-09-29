import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import NavigationBar from './layout/NavigationBar';

const MatchHome = ()=>{
   
   const [matches, setMatch] = useState([])
   useEffect( ()=>{
        getMatches();
    },[])


   const getMatches = async () =>{
    const response = await axios.get('http://localhost:8000/getMatches') 
      //  console.log(response.data)
       setMatch(response.data);
   }

    return(
      
        <div>
          <NavigationBar />
            <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Team One</th>
      <th scope="col">Team Two</th>
      <th scope="col">Match Date</th>
      <th scope="col" class="align-items-center">Action</th>
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
                <Link class="btn btn-outline-success mr-2 btn-sm" to={"/matchHome/"+match.matchId}><i class="fa fa-eye" title="View Details"></i></Link>
                <Link class="btn btn-outline-primary mr-2 btn-sm" style={{display:"none"}} to={"/matches/edit/"+match.matchId}><i class="fa fa-pencil-square-o" title="Edit Record"></i></Link>
                <Link class="btn btn-danger mr-2 btn-sm" style={{display:"none"}}><i class="fa fa-trash" title="Delete Record"></i></Link>
            </td>
          </tr>
     ))} 
    
  </tbody>
</table>
        </div>
    )
}

export default MatchHome;