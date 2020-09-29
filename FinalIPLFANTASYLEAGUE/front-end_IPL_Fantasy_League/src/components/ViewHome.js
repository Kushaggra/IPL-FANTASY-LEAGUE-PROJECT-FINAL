import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory, useParams} from 'react-router-dom';
import './match_card.css'
import NavigationBar from './layout/NavigationBar';
 
const ViewHome = () => {
 
    const {id} = useParams();

    const loadMatch = async () => {
        const result = await axios.get("http://localhost:8000/match/"+id);
        setMatch(result.data);
        console.log(result.data);
    }

    
    const [match, setMatch] = useState({
      matchId:0,
      teamOne:'',
      teamTwo:'',
      time:'',
      date:'',
      stadium:'',
      winner:''
    });
 
    const {  matchId,teamOne,teamTwo,time,date,stadium,winner } = match;
 
 
    useEffect(() => {
        loadMatch();
    },[]);

    const path ='/playerCards/icon.jpg'
    console.log(window.location.origin + path)
    return (
        <div>
            <NavigationBar />
           <div class="card center">
      <div class="additional">
        <div class="user-card">
          
          <img src={window.location.origin + path} height="200" width="150" class="center1"/>
          <div class="level ">
            Match ID: {matchId}
          </div>
        </div>
        <div class="more-info">
          <h1>Match Details:</h1>
          <br/>
          <div class="statsTop">
              
              <div class="coords">
                  <span>Stadium</span>
                  <span>{stadium}</span>
              </div>
          </div>
         

          <div class="stats">
            <div>
              <div class="title">Date</div>
              <i class="fa fa-calendar"></i>
              <div class="value">{date}</div>
            </div>
            <div>
                <div class="title">Time</div>
                <i class="fa fa-clock-o"></i>
                <div class="value">{time}</div>
              </div>
            <div>
              <div class="title">Winner</div>
              <i class="fa fa-trophy"></i>
              <div class="value">{winner}</div>
             </div>
          </div>
        </div>
      </div>
      <div class="general">
        <p >Get all the details about the face off between:<br/><br/>
            <h3> {teamOne} <br/><div style={{color:"black"}}>and</div>{teamTwo}</h3></p>
        <span class="more">Mouse over the card for more info</span>
      </div>
    </div>
        </div>
    )
}

export default ViewHome;


