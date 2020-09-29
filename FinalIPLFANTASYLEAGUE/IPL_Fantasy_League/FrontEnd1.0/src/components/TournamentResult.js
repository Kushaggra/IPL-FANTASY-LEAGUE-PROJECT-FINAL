import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from './View';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import winner from '../components/layout/winner3.png';
import NavigationBar from './layout/NavigationBar';
//import { useCookies,withCookies } from "react-cookie"; //------------------------------------------------->IMPORTS FOR COOKIE
 
const TournamentResult = ()=>{
   
   //const [cookies,setCookie]=useCookies('AdminJwt');  //------------------------------------------------->NAME OF COOKIE
   const [results, setResult] = useState(
       {
           firstTeam:'',
           secondTeam:'',
           thirdTeam:''
 
       }
   )
   
   useEffect( ()=>{
        getResult();
    },[])
 
   const getResult = async () =>{
     //console.log(cookies.AdminJwt)
     await axios.get('http://localhost:8000/getResult') 
         .then(response => {
            setResult(response.data);
            console.log(response);
        })       
   }
 
  
   let index =0;
    return(
        <div>
          <NavigationBar />
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
 
     {/* {results.map((result, index) =>(
            <tr key={result.id}>
            <th scope="row">{index+1}</th>
            <td>{team.teamName}</td>
            <td>{team.points}</td>
          </tr>
     ))}  */}
    
  </tbody>
</table>
        </div>
    )
}
 
export default TournamentResult;