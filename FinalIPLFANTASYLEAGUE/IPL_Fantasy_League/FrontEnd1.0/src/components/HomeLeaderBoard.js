import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from './View';
import NavigationBar from './layout/NavigationBar';

const HomeLeaderboard = ()=>{
   
   const [leaderboards, setLeaderboards] = useState([])
   
   useEffect( ()=>{
        getLeaderboard();
    },[])


   const getLeaderboard = async () =>{
    await axios.get('http://localhost:8000/homeleaderboard')
    .then((response)=>{
            //  console.log(response.data)
       setLeaderboards(response.data);
       console.log(response.data)
    })
    .catch((error)=>{
        console.log(error)
    }) 
      
   }

    return(
        <div>
            <NavigationBar />
            <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Bidder Id</th>
      <th scope="col">Bidder Ranking</th>
      <th scope="col">Bids Participated</th>
      <th scope="col">Bids Won</th>
      <th scope="col">Bids Lost</th>
      <th scope="col">Percentile</th>
      <th scope="col">Point</th>
    </tr>
  </thead>
  <tbody>
     {leaderboards.map((lBoard, index) =>(
            <tr key={lBoard.matchId}>
            {/* <th scope="row">{index+1}</th> */}
            <th scope="row">{lBoard.bidderId}</th>
            <td>{lBoard.bidder_ranking}</td>
            <td>{lBoard.bidsParticipated}</td>
            <td>{lBoard.bidsWon}</td>
            <td>{lBoard.bidsLost}</td>
            <td>{lBoard.percentile}</td>
            <td>{lBoard.point}</td>
            
          </tr>
     ))} 
    
  </tbody>
</table>
        </div>
    )
}

export default HomeLeaderboard;