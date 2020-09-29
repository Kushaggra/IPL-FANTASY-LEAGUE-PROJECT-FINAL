import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import './GetTournament.css';
import GroupIcon from '@material-ui/icons/Group';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import { useCookies,withCookies } from "react-cookie";

const GetTournament = () => {
    const [cookies,setCookie]=useCookies('AdminJwt');

    const loadTournament = async () => {
        const result = await axios.get("http://localhost:9000/admin/tournament",
        { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} }).then((response) => {
            setTournament(response.data)

            console.log(response.data);
        }
        );

    }


    const [tournament, setTournament] = useState({
        tournamentId: 0,
        numOfQualifiers: 0,
        numOfTeams: 0,
        numOfMatchesCompleted: 0
    });

    let history = useHistory();
    const { tournamentId, numOfQualifiers, numOfTeams, numOfMatchesCompleted } = tournament;



    useEffect(() => {
        loadTournament();
    }, []);
    const path = '/playerCards/icon.jpg'
    return (
        <div>
            <NavigationBarAdmin />
            {/* <form>
                <div class="container">
                    <div class="cardtournament">
                        <img src="https://cdn.siasat.com/wp-content/uploads/2020/02/IPL-2020-1.jpg" alt="..." class="cardtournament__image" />
                        <p class="cardtournament__name">IPL Fantasy League Tournament</p>
                        <div class="grid-container">
                            <label class="col-10"><b>Tournament ID:</b></label>
                            <input disabled type="button" style={{ color: "white", backgroundColor: "purple", border: "1px solid white", borderRadius: "5px", width: "50px" }} name="tournamentId" value={tournamentId} /><br /><br />
                            <label class="col-10"><b>Number of Qualifiers:</b></label>
                            <input disabled type="button" style={{ color: "white", backgroundColor: "purple", border: "1px solid white", borderRadius: "5px", width: "50px" }} name="numOfQualifiers" value={numOfQualifiers} /><br /><br />
                            <label class="col-10"><b>Number of Teams:</b></label>
                            <input disabled type="button" style={{ color: "white", backgroundColor: "purple", border: "1px solid white", borderRadius: "5px", width: "50px" }} name="numOfTeams" value={numOfTeams} /><br /><br />
                            <label class="col-10"><b>Number of Matches completed:</b></label>
                            <input disabled type="button" style={{ color: "white", backgroundColor: "purple", border: "1px solid white", borderRadius: "5px", width: "50px" }} name="numOfMatchesCompleted" value={numOfMatchesCompleted} /><br /><br />
                            <label class="col-10"><b>Match ID:</b></label>
                            <input disabled type="button" style={{ color: "white", backgroundColor: "purple", border: "1px solid white", borderRadius: "5px", width: "50px" }} name="matchId" value={matchId} /><br /><br />

                        </div>
                    </div>

                </div>
            </form> */}
            <div class="card center">
                <div class="additional">
                    <div class="user-card">

                        <img src={window.location.origin + path} height="200" width="150" class="center1" />
                        <div class="level ">
                            Tournament ID: {tournamentId}
                        </div>
                    </div>
                    <div class="more-info"><h1>Tournament<br/> Details</h1>

                        <div class="stats">
                            <div>
                                <div class="title">Number of Qualifiers</div>
                                <CheckCircleIcon />
                                <div class="value">{numOfQualifiers}</div>
                            </div>
                            <div>
                                <div class="title">Number of <br /> Teams</div>
                                <GroupIcon />
                                <div class="value">{numOfTeams}</div>
                            </div>
                            <div>
                                <div class="title">Matches completed</div>
                                <SportsCricketIcon />
                                <div class="value">{numOfMatchesCompleted}</div>
                            </div>
                            {/* <div>
                                <div class="title">Match <br/>ID</div>
                                <FingerprintIcon />
                                <div class="value">{matchId}</div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div class="general">
                    <p >Get all the details about the tournament!!!<br /><br />
                        <h1><div style={{ color: "black" }}><b>CURRENT<br /> TOURNAMENT </b></div></h1></p>
                    <span class="more">Mouse over the card for more information...</span>
                </div>
            </div>
        </div>
    )
}

export default GetTournament;