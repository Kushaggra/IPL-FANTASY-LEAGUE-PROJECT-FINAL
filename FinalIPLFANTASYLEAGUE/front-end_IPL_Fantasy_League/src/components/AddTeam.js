import React, {Component, useState} from 'react';
import axios from 'axios';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import { useParams , useHistory} from 'react-router-dom';
import { useCookies,withCookies } from "react-cookie";

// import table from 'react-bootstrap/Table';
import './AddTournament.css';
const AddTeam = () =>{
    const [cookies,setCookie]=useCookies('AdminJwt');

    const {id} = useParams();
 
    const [team, setteam] = useState({
        teamId:0,
        teamName:'',
        points:0,
        ranking:0,
        statistics:'',
        teamPlayer: '',
        status : 1
    });
 
    let history = useHistory();
    const {teamId,teamName,points,ranking,statistics, teamPlayer , status} = team;

    const handleChange = (event) => {
        setteam({...team, [event.target.name] : event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
            axios.post("http://localhost:9000/admin/teams/new", team, 
            { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} });
        history.push("/home");
    }

        return(
            <div>
                <NavigationBarAdmin />
                <form onSubmit={handleSubmit}>

                <div class="container">
                    <div class="cardtournament">
                        <img src="https://cdn.siasat.com/wp-content/uploads/2020/02/IPL-2020-1.jpg" alt="..." class="cardtournament__image" />
                            <p class="cardtournament__name">IPL Fantasy League Team</p>
                            <div class="grid-container">
                    <label class="col-10"><b>Team Id:</b></label> 
                    <input disabled type="number" name="teamId" onChange={handleChange} placeholder="Auto Generated" /><br/>
                    <label class="col-10"><b>Team Name:</b></label> 
                    <input  type="text" name="teamName" onChange={handleChange}/><br/>
                    <label class="col-10"><b>Team Points:</b></label> 
                    <input  disabled type="number" name="points" onChange={handleChange} placeholder="0"/><br/>
                    {/* <label class="col-10"><b>Team Ranking:</b></label> 
                    <input  disabled type="number" name="ranking" onChange={handleChange} placeholder="NA"/><br/>
                    <label class="col-10"><b>Statistics:</b></label> 
                    <input  disabled type="text" name="statistics" onChange={handleChange} placeholder="NA"/><br/> */}
                    <label class="col-10"><b>Team Player:</b></label> 
                    <input  type="text" name="teamPlayer" onChange={handleChange}/><br/>
                   

                    </div>
                    <button type="submit" class="btn2 draw-border">Add Team</button>
                    </div>
                    </div>
                </form>
            </div>
        )
}




export default AddTeam;