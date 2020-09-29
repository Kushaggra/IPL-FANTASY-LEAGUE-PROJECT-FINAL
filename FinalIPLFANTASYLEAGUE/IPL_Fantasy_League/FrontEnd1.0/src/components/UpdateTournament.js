import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory, useParams} from 'react-router-dom';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import { useCookies,withCookies } from "react-cookie";

const UpdateTournament = () => {

    const [cookies,setCookie]=useCookies('AdminJwt');

    const loadTournament = async () => {
        const result = await axios.get("http://localhost:9000/admin/tournament",
        { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} })
        .then( (response) => {setTournament(response.data)
        
        console.log(response.data);
    }
        );
        
        
    }

    
    const [tournament, setTournament] = useState({
            tournamentId: 0,
            numOfQualifiers: 0,
            numOfTeams: 0,
            numOfMatchesCompleted: 0,
            matchId: 0
    });
 
    let history = useHistory();
    const {tournamentId, numOfQualifiers, numOfTeams, numOfMatchesCompleted, matchId } = tournament;
 
    const handleChange = (event) => {
        setTournament({...tournament, [event.target.name] : event.target.value});
    }
 
    const handleSubmit = (event) => {
        event.preventDefault();
            axios.post("http://localhost:9000/admin/tournament", tournament,
            { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} });
            history.push("/home");
    }
 
  
 
    useEffect(() => {
        loadTournament();
    },[]);

    return (
        <div>
        <NavigationBarAdmin />
        <form onSubmit={handleSubmit}>
        <div class="container">
                    <div class="cardtournament">
                        <img src="https://cdn.siasat.com/wp-content/uploads/2020/02/IPL-2020-1.jpg" alt="..." class="cardtournament__image" />
                            <p class="cardtournament__name">IPL Fantasy League Tournament</p>
                            <div class="grid-container">
           <label class="col-10"><b>Tournament ID:</b></label> 
            <input disabled type="number" name="tournamentId" value={tournamentId} /><br/><br/>
            <label class="col-10"><b>Number of Qualifiers:</b></label> 
            <input type="number" name="numOfQualifiers" value={numOfQualifiers} onChange={handleChange}/><br/><br/>
            <label class="col-10"><b>Number of Teams:</b></label> 
            <input type="number" name="numOfTeams" value={numOfTeams} onChange={handleChange} /><br/><br/>
            <label class="col-10"><b>Number of Matches completed:</b></label> 
            <input type="number" name="numOfMatchesCompleted" value={numOfMatchesCompleted} onChange={handleChange}/><br/><br/>
            {/* <label class="col-10"><b>Match ID:</b></label> 
            <input type="number" name="matchId" value={matchId} onChange={handleChange}/><br/><br/> */}

            </div>
            <button type="submit" class="btn2 draw-border">Update Tournament</button>
            </div></div>
        </form>
    </div>
    )
}

export default UpdateTournament;