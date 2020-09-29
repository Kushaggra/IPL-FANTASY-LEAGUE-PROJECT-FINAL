import React, { Component, useState } from 'react';
import axios from 'axios';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import { useParams, useHistory } from 'react-router-dom';
import { useCookies,withCookies } from "react-cookie";

// import table from 'react-bootstrap/Table';
import './AddTournament.css';
const AddTournament = () => {
    const [cookies,setCookie]=useCookies('AdminJwt');

    const { id } = useParams();

    const [tournament, setTournament] = useState({
        tournamentId: 0,
        numOfQualifiers: 0,
        numOfTeams: 0,
        numOfMatchesCompleted: 0,
        status: 1
    });

    let history = useHistory();
    const { tournamentId, numOfQualifiers, numOfTeams, numOfMatchesCompleted, status } = tournament;

    const handleChange = (event) => {
        setTournament({ ...tournament, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:9000/admin/tournament", tournament,
        { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} });
        history.push("/home");
        // (function (){
        //     document.write("Tournament added successfully");
        // }) ();
    }

    return (
        <>
            <NavigationBarAdmin />
            <form onSubmit={handleSubmit}>

                {/* <label class="col-2 offset-3">Number of Qualifiers:</label> 
                    <input class="col-4" type="number" name="numOfQualifiers" onChange={handleChange}/><br/>
                    <label class="col-2 offset-3">Number of Teams:</label> 
                    <input class="col-4" type="number" name="numOfTeams" onChange={handleChange} /><br/>
                    <label class="col-2 offset-3">Number of Matches completed:</label> 
                    <input class="col-4 " type="number" name="numOfMatchesCompleted" onChange={handleChange}/><br/>
                    <label class="col-2 offset-3">Match ID:</label> 
                    <input class="col-4 " type="number" name="matchId" onChange={handleChange}/><br/>
                    <button type="submit" className="col-6 offset-3 btn btn-success">Add Tournament</button> */}


                {/* <div class="main">
                    <p class="head">IPL Fantasy League, 2020 <span class="right day">Today</span></p><br />
                        <table class="table">
                            <tr>
                                <td>
                                    <img class="flag" src="C:\Users\d960790\telstra-react\ipl\src\components\layout\tournament.png" alt="" /><br /><br />
                                        <label class="col-2 offset-3">Number of Qualifiers:</label>
                                        <input class="col-4" type="number" name="numOfQualifiers" onChange={handleChange} /><br />
                                        <label class="col-2 offset-3">Number of Teams:</label>
                                        <input class="col-4" type="number" name="numOfTeams" onChange={handleChange} /><br />
                                        <label class="col-2 offset-3">Number of Matches completed:</label>
                                        <input class="col-4 " type="number" name="numOfMatchesCompleted" onChange={handleChange} /><br />
                                        <label class="col-2 offset-3">Match ID:</label>
                                        <input class="col-4 " type="number" name="matchId" onChange={handleChange} /><br />
                                </td>
                            </tr>
                        </table>
                                <center>
                                    <p class="res"><button type="submit" className="col-6 offset-3 btn btn-success">Add Tournament</button></p>
                                </center>
                </div> */}


                <div class="container">
                    <div class="cardtournament">
                        <img src="https://cdn.siasat.com/wp-content/uploads/2020/02/IPL-2020-1.jpg" alt="..." class="cardtournament__image" />
                            <p class="cardtournament__name">IPL Fantasy League Tournament</p>
                            <div class="grid-container">

                                        <label class="col-10"><b>Number of Qualifiers:</b></label>
                                        <input type="number" name="numOfQualifiers" onChange={handleChange} /><br /><br />
                                        <label class="col-10"><b>Number of Teams:</b></label>
                                        <input type="number" name="numOfTeams" onChange={handleChange} /><br /><br />
                                        <label class="col-10"><b>Number of Matches completed:</b></label>
                                        <input type="number" name="numOfMatchesCompleted" onChange={handleChange} /><br /><br />
                                        {/* <label class="col-10"><b>Match ID:</b></label>
                                        <input type="number" name="matchId" onChange={handleChange} /><br /><br /> */}

                            </div>
                            <button type="submit" class="btn2 draw-border">Add Tournament</button>

                    </div>
                </div>
            </form>
        </>
        )
}


export default AddTournament;
