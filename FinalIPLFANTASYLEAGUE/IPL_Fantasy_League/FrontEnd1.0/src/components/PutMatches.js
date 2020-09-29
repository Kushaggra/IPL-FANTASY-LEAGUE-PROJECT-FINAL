import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory, useParams} from 'react-router-dom';
import { useCookies,withCookies } from "react-cookie";
import './cardUpdate.css'
 
const EditMatch = () => {
 
    const {id} = useParams();
    const [cookies,setCookie]=useCookies('AdminJwt');
    const [match, setMatch] = useState({
        matchId:'',
        teamOne:'',
        teamTwo:'',
        date:'',
        time:'',
        stadium:'',
        winner:''
    });
 
    let history = useHistory();
    const {matchId,teamOne,teamTwo,date,time,stadium,winner } = match;
 
    const handleChange = (event) => {
        setMatch({...match, [event.target.name] : event.target.value});
    }
 
    const handleSubmit = () => {
    //    event.preventDefault();
            axios.post("http://localhost:9000/admin/scheduleMatch", match, { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} })
            .then((response)=>{
                console.log(response.data)
            })
            .catch((error)=>{
                console.log(error);
            });
        history.push("/matches");
    }


    const loadMatch = async () => {
        const result = await axios.get("http://localhost:9000/admin/match/" + id,{ headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`}} );
        setMatch(result.data);
        console.log(result.data);
    }

    useEffect(()=>{
        loadMatch()
    },[]);

   const path = '/playerCards/icon.jpg';

    return (
        <form onSubmit={handleSubmit}>
        <div class="card1 center1">
        <div class="additional1">
          <div class="user-card1">
            <div class="level1 center1">
              Match ID: {matchId}
            </div>
            <div class="points1 center1">
              Winner: {winner}
            </div>
            <img src={window.location.origin+path} height="200" width="150" class="center"/>
          </div>
        </div>
        <div class="general1 col-12">
          <div>Correct the details that require Updation:<br/>
            <div class="demo">
                <span><label>TEAM 1:</label> </span>
                <span><input type="text" name="teamOne" value={teamOne} onChange={handleChange}/><br/></span>
            </div>   
            <div class="demo">
                <span><label>TEAM 2:</label> </span>
                <span><input type="text" name="teamTwo" value={teamTwo} onChange={handleChange}/><br/></span>
            </div>    
            <div class="demo">
                <span><label>DATE:</label> </span>
                <span><input type="text" name="date" value={date} onChange={handleChange}/><br/></span>
            </div>    
            <div class="demo">
                <span><label>TIME:</label> </span>
                <span><input type="text" name="time" value={time} onChange={handleChange}/><br/></span>
            </div>   
            <div class="demo">
                <span><label>STADIUM:</label> </span>
                <span><input type="text" name="stadium" value={stadium} onChange={handleChange}/><br/></span>
            </div>    
             
            <div class="demo">
                <span><label>WINNER:</label> </span>
                <span><input type="text" name="winner" value={winner} onChange={handleChange}/><br/></span>
            </div>    
           <div class="demo">
            <div><button type="submit" className="btn btn-success">Update Match Details</button></div>
           </div>
        </div>
        </div>
      </div>
      </form>)
}

export default EditMatch;