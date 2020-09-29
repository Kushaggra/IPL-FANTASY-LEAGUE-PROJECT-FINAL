// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useHistory, Redirect } from 'react-router-dom';
// // import './cardUpdate.css'
// import './output-message.css'
// import { useCookies } from 'react-cookie';
// import NavigationBarAdmin from './layout/NavigationBarAdmin';

// const ConductMatch = () => {

//     const [cookies, setCookie] = useCookies();
    
//     const [match, setMatch] = useState({
//         matchId: '',
//         date: '',
//         time: '',
//         stadium: '',
//         winner: '',
//         teamName1: '',
//         totalOvers1: 20,
//         runs1: 0,
//         wickets1: 0,
//         catches1: 0,
//         lbw1: 0,
//         teamName2: '',
//         totalOvers2: 20,
//         runs2: 0,
//         wickets2: 0,
//         catches2: 0,
//         lbw2: 0
//     });

//     const [matchElement, setMatchElement] = useState({
//         EmatchId: '',
//         EteamOne: '',
//         EteamTwo: '',
//         Edate: '',
//         Etime: '',
//         Estadium: '',
//         Ewinner: ''
//     });


//     const [matchIdw, setMatchIdw] = useState();
//     const [snack, setSnack] = useState();
//     let history = useHistory();
//     const { matchId, teamOne, teamTwo, date, time, stadium, winner, teamName1, totalOvers1, runs1, wickets1, catches1, lbw1, teamName2, totalOvers2, runs2, wickets2, catches2, lbw2 } = match;
//     const { EmatchId, EteamOne, EteamTwo, Edate, Etime, Estadium, Ewinner } = matchElement;

//     const handleChange = (event) => {
//         setMatch({ ...match, [event.target.name]: event.target.value });
//     }

//     const handleChange1 = (event) => {

//         event.preventDefault();
//         axios.get("http://localhost:9000/admin/match/" + matchIdw,
//             { headers: { "Authorization": `Bearer ${cookies.AdminJwt}` } })
//             .then((response) => {
//                 console.log(response.data)
//                 setMatchElement(response.data)
//                 // setMatch({...match,reponse})
//             });
//     }

//     const handleMatchIdw = (event) => {
//         match.matchId=event.target.value
//         setMatchIdw(event.target.value)
//     }

//     const handleSubmit = (event) => {

//         console.log(match)
//         event.preventDefault();
//         axios.put("http://localhost:9000/admin/updateMatchResult", match,
//             { headers: { "Authorization": `Bearer ${cookies.AdminJwt}` } })
//             .then((response) => {
//                 console.log(response.data)
//                 setSnack(response.data)
//                 onSubmitclicked();
//                 history.push("/matches")
//                 redir()
//             });
//         // history.push("/matches");

//     }

//     const onSubmitclicked = () => {
//         var x = document.getElementById("snackbar");
//         x.className = "show";
//         setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

//     }
//     const redir = () => {
//         return <Redirect to="/matches" />
//     }
//     const path = '/playerCards/icon.jpg';

//     return (
//         <>
//             <NavigationBarAdmin />
//             <form onSubmit={handleSubmit}>
//                 <div className="row">

//                     <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
//                         <div class="login-page ">
//                             <div class="LoginForm " style={{
//                                 position: "relative", background: "#FFFFFF", width: "360px",
//                                 margin: "0 auto 100px", padding: "45px", textAlign: "center",
//                                 boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
//                             }}>
//                                 <div>
//                                     <h4>Match Details for Reference</h4>
//                                     <div className="float-contaier" style={{ width: "100%" }}>


//                                         <div className="float-child" style={{ width: "33%", float: "left" }}>
//                                             <input name="matchId" onBlur={handleChange1} onChange={handleMatchIdw}
//                                                 type="number" placeholder="Match ID" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px", borderColor: "red", borderStyle: "solid" }} />

//                                         </div>

//                                         <div className="float-child" style={{ width: "33%", float: "left" }}>
//                                             <input type="text" name="date"
//                                                 disabled onChange={handleChange} defaultValue={matchElement.date} value={matchElement.date} placeholder="Date" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

//                                         </div>

//                                         <div className="float-child" style={{ width: "33%", float: "left" }}>

//                                             <input type="text" name="time"
//                                                 disabled onChange={handleChange} defaultValue={matchElement.time} value={matchElement.time} placeholder="Time" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

//                                         </div>
//                                     </div>

//                                     <input type="text" name="teamOne"
//                                         disabled onChange={handleChange} defaultValue={matchElement.teamOne} value={matchElement.teamOne} placeholder="Team one" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


//                                     <input type="text" name="teamTwo"
//                                         disabled onChange={handleChange} defaultValue={matchElement.teamTwo} value={matchElement.teamTwo} placeholder="Team Two" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="winner"
//                                         disabled onChange={handleChange} defaultValue={matchElement.winner} value={matchElement.winner} placeholder="Winner" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


//                                     <input type="text" name="stadium"
//                                         disabled onChange={handleChange} defaultValue={matchElement.stadium} value={matchElement.stadium} placeholder="Stadium" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


//                                     {/* -------------end of input div row */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
//                         <div class="login-page ">
//                             <div class="LoginForm " style={{
//                                 position: "relative", background: "#FFFFFF", width: "360px",
//                                 margin: "0 auto 100px", padding: "45px", textAlign: "center",
//                                 boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
//                             }}>
//                                 <div class="login-LoginForm">
//                                     <h4>Match Data Input</h4>
//                                     <div className="float-contaier" style={{ width: "100%" }}>


//                                         <div className="float-child" style={{ width: "50%", float: "left" }}>
//                                             <input type="text" name="date"
//                                              onChange={handleChange}  value={date} placeholder="Date" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

//                                         </div>

//                                         <div className="float-child" style={{ width: "50%", float: "left" }}>

//                                             <input type="text" name="time"
//                                              onChange={handleChange}  value={time} placeholder="Time" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

//                                         </div>
//                                     </div>

//                                     <input type="text" name="teamName1"
//                                         onChange={handleChange} value={teamName1}  placeholder="Team one" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


//                                     <input type="text" name="teamName2"
//                                         onChange={handleChange} value={teamName2} placeholder="Team Two" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                   
//                                     <input type="text" name="winner"
//                                         onChange={handleChange} value={winner}  placeholder="Winner" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


//                                     <input type="text" name="stadium"
//                                        onChange={handleChange} value={stadium} placeholder="Stadium" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

//                                 </div>
//                             </div>
//                         </div>
//                     </div>


//                 </div>

//                 <div class="row" >

//                     {/* -========================================================================================================================== */}


//                     {/* =-------------------------------------------------------------------------------------------------------------------------- */}
//                     <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
//                         <div class="login-page ">
//                             <div class="LoginForm " style={{
//                                 position: "relative", background: "#FFFFFF", width: "360px",
//                                 margin: "0 auto 100px", padding: "45px", textAlign: "center",
//                                 boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
//                             }}>
//                                 <div class="login-LoginForm">
//                                     <h4>Team 1 Statistics</h4>
//                                     <input type="text" name="totalOvers1"
//                                         onChange={handleChange} placeholder="Total Overs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="runs1"
//                                         onChange={handleChange} placeholder="Runs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="wickets1"
//                                         onChange={handleChange} placeholder="Wickets" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="catches1"
//                                         onChange={handleChange} placeholder="Catches" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="lbw1"
//                                         onChange={handleChange} placeholder="LBW" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input disabled type="text" name="runRate1"
//                                         onChange={handleChange} placeholder="Run Rate (Auto Calculated)" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
//                         <div class="login-page ">
//                             <div class="LoginForm " style={{
//                                 position: "relative", background: "#FFFFFF", width: "360px",
//                                 margin: "0 auto 100px", padding: "45px", textAlign: "center",
//                                 boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
//                             }}>
//                                 <div class="login-LoginForm">
//                                     <h4>Team 2 Statistics</h4>
//                                     <input type="text" name="totalOvers2"
//                                         onChange={handleChange} placeholder="Total Overs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="runs2"
//                                         onChange={handleChange} placeholder="Runs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="wickets2"
//                                         onChange={handleChange} placeholder="Wickets" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="catches2"
//                                         onChange={handleChange} placeholder="Catches" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input type="text" name="lbw2"
//                                         onChange={handleChange} placeholder="LBW" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
//                                     <input disabled type="text" name="runRate2"
//                                         onChange={handleChange} placeholder="Run Rate (Auto Calculated)" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <button type="submit" onClick={()=>{history.push('/getteam')}}
//                     style={{
//                         fontFamily: "Roboto, sans-serif", marginTop: '40px', marginLeft: '40%', textTransform: "uppercase", outline: "0",
//                         background: "#37006a", borderRadius: "5px", width: "20%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
//                         webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
//                     }}>
//                     Submit Details</button>

//                     <div id="snackbar">{snack}</div>

//             </form>

//         </>)
// }

// export default ConductMatch;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
// import './cardUpdate.css'
import './output-message.css'
import { useCookies } from 'react-cookie';
import NavigationBarAdmin from './layout/NavigationBarAdmin';

const ConductMatch = () => {

    const [cookies, setCookie] = useCookies();
    
    const [match, setMatch] = useState({
        matchId: '',
        date: '',
        time: '',
        stadium: '',
        winner: '',
        teamName1: '',
        totalOvers1: 20,
        runs1: 0,
        wickets1: 0,
        catches1: 0,
        lbw1: 0,
        teamName2: '',
        totalOvers2: 20,
        runs2: 0,
        wickets2: 0,
        catches2: 0,
        lbw2: 0
    });

    const [matchElement, setMatchElement] = useState({
        EmatchId: '',
        EteamOne: '',
        EteamTwo: '',
        Edate: '',
        Etime: '',
        Estadium: '',
        Ewinner: ''
    });


    const [matchIdw, setMatchIdw] = useState();
    const [snack, setSnack] = useState();
    let history = useHistory();
    const { matchId, teamOne, teamTwo, date, time, stadium, winner, teamName1, totalOvers1, runs1, wickets1, catches1, lbw1, teamName2, totalOvers2, runs2, wickets2, catches2, lbw2 } = match;
    const { EmatchId, EteamOne, EteamTwo, Edate, Etime, Estadium, Ewinner } = matchElement;

    const handleChange = (event) => {
        setMatch({ ...match, [event.target.name]: event.target.value });
    }

    const handleChange1 = (event) => {

        event.preventDefault();
        axios.get("http://localhost:9000/admin/match/" + matchIdw,
            { headers: { "Authorization": `Bearer ${cookies.AdminJwt}` } })
            .then((response) => {
                console.log(response.data)
                setMatchElement(response.data)
                // setMatch({...match,reponse})
            });
    }

    const handleMatchIdw = (event) => {
        match.matchId=event.target.value
        setMatchIdw(event.target.value)
    }

    const handleSubmit = (event) => {

        console.log(match)
        event.preventDefault();
        axios.put("http://localhost:9000/admin/updateMatchResult", match,
            { headers: { "Authorization": `Bearer ${cookies.AdminJwt}` } })
            .then((response) => {
                console.log(response.data)
                setSnack(response.data)
                onSubmitclicked();
                history.push("/getteam")
                
                redir()
            });
        // history.push("/matches");

    }

    const onSubmitclicked = () => {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

    }
    const redir = () => {
        return <Redirect to="/matches" />
    }
    const path = '/playerCards/icon.jpg';

    return (
        <>
            <NavigationBarAdmin />
            <form onSubmit={handleSubmit}>
                <div className="row">

                    <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
                        <div class="login-page ">
                            <div class="LoginForm " style={{
                                position: "relative", background: "#FFFFFF", width: "360px",
                                margin: "0 auto 100px", padding: "45px", textAlign: "center",
                                boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
                            }}>
                                <div>
                                    <h4>Match Details for Reference</h4>
                                    <div className="float-contaier" style={{ width: "100%" }}>


                                        <div className="float-child" style={{ width: "33%", float: "left" }}>
                                            <input name="matchId" onBlur={handleChange1} onChange={handleMatchIdw}
                                                type="number" placeholder="Match ID" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px", borderColor: "red", borderStyle: "solid" }} />

                                        </div>

                                        <div className="float-child" style={{ width: "33%", float: "left" }}>
                                            <input type="text" name="date"
                                                disabled onChange={handleChange} defaultValue={matchElement.date} value={matchElement.date} placeholder="Date" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                                        </div>

                                        <div className="float-child" style={{ width: "33%", float: "left" }}>

                                            <input type="text" name="time"
                                                disabled onChange={handleChange} defaultValue={matchElement.time} value={matchElement.time} placeholder="Time" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                                        </div>
                                    </div>

                                    <input type="text" name="teamOne"
                                        disabled onChange={handleChange} defaultValue={matchElement.teamOne} value={matchElement.teamOne} placeholder="Team one" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                                    <input type="text" name="teamTwo"
                                        disabled onChange={handleChange} defaultValue={matchElement.teamTwo} value={matchElement.teamTwo} placeholder="Team Two" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="winner"
                                        disabled onChange={handleChange} defaultValue={matchElement.winner} value={matchElement.winner} placeholder="Winner" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                                    <input type="text" name="stadium"
                                        disabled onChange={handleChange} defaultValue={matchElement.stadium} value={matchElement.stadium} placeholder="Stadium" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                                    {/* -------------end of input div row */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
                        <div class="login-page ">
                            <div class="LoginForm " style={{
                                position: "relative", background: "#FFFFFF", width: "360px",
                                margin: "0 auto 100px", padding: "45px", textAlign: "center",
                                boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
                            }}>
                                <div class="login-LoginForm">
                                    <h4>Match Data Input</h4>
                                    <div className="float-contaier" style={{ width: "100%" }}>


                                        <div className="float-child" style={{ width: "50%", float: "left" }}>
                                            <input type="text" name="date"
                                             onChange={handleChange}  value={date} placeholder="Date" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                                        </div>

                                        <div className="float-child" style={{ width: "50%", float: "left" }}>

                                            <input type="text" name="time"
                                             onChange={handleChange}  value={time} placeholder="Time" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                                        </div>
                                    </div>

                                    <input type="text" name="teamName1"
                                        onChange={handleChange} value={teamName1}  placeholder="Team one" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                                    <input type="text" name="teamName2"
                                        onChange={handleChange} value={teamName2} placeholder="Team Two" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                   
                                    <input type="text" name="winner"
                                        onChange={handleChange} value={winner}  placeholder="Winner" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />


                                    <input type="text" name="stadium"
                                       onChange={handleChange} value={stadium} placeholder="Stadium" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row" >

                    {/* -========================================================================================================================== */}


                    {/* =-------------------------------------------------------------------------------------------------------------------------- */}
                    <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
                        <div class="login-page ">
                            <div class="LoginForm " style={{
                                position: "relative", background: "#FFFFFF", width: "360px",
                                margin: "0 auto 100px", padding: "45px", textAlign: "center",
                                boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
                            }}>
                                <div class="login-LoginForm">
                                    <h4>Team 1 Statistics</h4>
                                    <input type="text" name="totalOvers1"
                                        onChange={handleChange} placeholder="Total Overs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="runs1"
                                        onChange={handleChange} placeholder="Runs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="wickets1"
                                        onChange={handleChange} placeholder="Wickets" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="catches1"
                                        onChange={handleChange} placeholder="Catches" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="lbw1"
                                        onChange={handleChange} placeholder="LBW" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input disabled type="text" name="runRate1"
                                        onChange={handleChange} placeholder="Run Rate (Auto Calculated)" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm" style={{ height: "500px", padding: "20px", margin: "20px", borderRadius: "20px" }}>
                        <div class="login-page ">
                            <div class="LoginForm " style={{
                                position: "relative", background: "#FFFFFF", width: "360px",
                                margin: "0 auto 100px", padding: "45px", textAlign: "center",
                                boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
                            }}>
                                <div class="login-LoginForm">
                                    <h4>Team 2 Statistics</h4>
                                    <input type="text" name="totalOvers2"
                                        onChange={handleChange} placeholder="Total Overs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="runs2"
                                        onChange={handleChange} placeholder="Runs" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="wickets2"
                                        onChange={handleChange} placeholder="Wickets" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="catches2"
                                        onChange={handleChange} placeholder="Catches" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input type="text" name="lbw2"
                                        onChange={handleChange} placeholder="LBW" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />
                                    <input disabled type="text" name="runRate2"
                                        onChange={handleChange} placeholder="Run Rate (Auto Calculated)" style={{ fontFamily: "Roboto, sans-serif", outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius: "5px", padding: "15px", boxSizing: "border-box", fontSize: "14px" }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" 
                    style={{
                        fontFamily: "Roboto, sans-serif", marginTop: '40px', marginLeft: '40%', textTransform: "uppercase", outline: "0",
                        background: "#37006a", borderRadius: "5px", width: "20%", border: "0", padding: "15px", color: "#FFFFFF", fontSize: "14p",
                        webkitTransition: "all 0.3 ease", transition: "all 0.3 ease", cursor: "pointer"
                    }}>
                    Submit Details</button>

                    <div id="snackbar">{snack}</div>

            </form>

        </>)
}

export default ConductMatch;