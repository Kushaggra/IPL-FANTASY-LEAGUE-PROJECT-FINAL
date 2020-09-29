import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './match_card.css'
import { useCookies, withCookies } from "react-cookie";

const EditMatch = () => {

  const { id } = useParams();
  const [cookies, setCookie] = useCookies('AdminJwt');

  const loadMatch = async () => {
    const result = await axios.get("http://localhost:9000/admin/match/" + id,
      { headers: { "Authorization": `Bearer ${cookies.AdminJwt}` } });
    setMatch(result.data);
    console.log(result.data);
  }


  const [match, setMatch] = useState({
    matchId: 0,
    teamOne: '',
    teamTwo: '',
    time: '',
    date: '',
    stadium: '',
    winner: ''
  });

  let history = useHistory();
  const { matchId, teamOne, teamTwo, time, date, stadium, winner } = match;

  // const handleChange = (event) => {
  //     setMatch({...match, [event.target.name] : event.target.value});
  // }

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //         axios.post("http://localhost:9000/admin/match", match);
  //     history.push("/matches");
  // }

  useEffect(() => {
    loadMatch();
  }, []);

  const path = '/playerCards/icon.jpg'
  console.log(window.location.origin + path)
  return (
    <div>
      <div class="card center">
        <div class="additional">
          <div class="user-card">

            <img src={window.location.origin + path} height="200" width="150" class="center1" />
            <div class="level ">
              Match ID: {matchId}
            </div>
          </div>
          <div class="more-info">
            <h1>Match Details:</h1>
            <br />
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
          <p >Get all the details about the face off between:<br /><br />
            <h3> {teamOne} <br /><div style={{ color: "black" }}>and</div>{teamTwo}</h3></p>
          <span class="more">Mouse over the card for more info</span>
        </div>
      </div>
    </div>
  )
}

export default EditMatch;


