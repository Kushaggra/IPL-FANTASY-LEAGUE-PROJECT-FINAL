import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Teams from './components/Teams'
import NavigationBar from './components/layout/NavigationBar'
import Home from './components/Home'
import PutMatches from './components/PutMatches'
import View from './components/View'
import MainLoginChoice from './components/MainLoginChoice'
import AfterAdmin from './components/AfterAdmin';
import AddTournament from './components/AddTournament';
import UpdateTournament from './components/UpdateTournament';
import GetTournament from './components/GetTournament';
import GetTeam from './components/GetTeam';
import AddTeam from './components/AddTeam';
import CountTeams from './components/CountTeams';
import Addmatch from './components/Addmatch';
import { withCookies } from 'react-cookie';
import PrivateRoute from './components/PrivateRoute'
import LeaderBoard from './components/GetLeaderBoard';
import IntroAdmin from './components/IntroAdmin';
import MatchHome from './components/MatchHome';
import TeamHome from './components/TeamHome';
import TournamentResult from './components/TournamentResult';
import HomeLeaderboard from './components/HomeLeaderBoard';
import ViewHome from './components/ViewHome';
import ConductMatch from './components/ConductMatch';
import FirstPage from './components/FirstPage';


import Register from './bidder/Register';
import Verify from './bidder/Verify';
import Login from './bidder/Login';
import Reset from './bidder/Reset';
import BidderMatches from './bidder/BidderMatches';
import Bid from './bidder/Bid';
import BidsPlaced from './bidder/Bids-Placed';
import Test from './bidder/Test';
import Logout from './bidder/Logout';
import Leaderboard from './bidder/Leaderboard';
import TeamPoints from './bidder/TeamPoints';
import ChangePassword from './bidder/ChangePassword';
import TeamDelete from './components/TeamDelete';
import NavigationBarAdmin from './components/layout/NavigationBarAdmin';
import TournamentResultAdmin from './components/TournamentResultAdmin';



function App() {
  return (

    <Router>
      <Route exact path="/" component={Intro} />
      <Route exact path="/matchhome" component={MatchHome}/>
      <Route exact path="/teamhome" component={TeamHome}/>
      <Route exact path="/homeleaderboard" component={HomeLeaderboard}/>
      <Route exact path="/matchhome/:id" component={ViewHome}/>
      <Route exact path="/tournamentresult" component={TournamentResult}/>
      <Route exact path="/afteradmin" component={AfterAdmin} />

   {/* <Route exact path="/login" component={loginChoice} /> */}

      <PrivateRoute exact path="/match/:id" component={view} />
      <PrivateRoute exact path="/teams" component={Team} />
      <PrivateRoute exact path="/matches" component={Matches} />
      <PrivateRoute exact path="/leaderboard" component={LeaderBoardView}/>
      <PrivateRoute exact path="/matches/edit/:id" component={Edit} />
      <PrivateRoute exact path="/match" component={AddMatch} />
      <PrivateRoute exact path="/addtournament" component={AddTournament} />
      <PrivateRoute exact path="/updatetournament" component={UpdateTournament} />
      <PrivateRoute exact path="/gettournament" component={GetTournament} />
      <PrivateRoute exact path="/addteam" component={AddTeam} />
      <PrivateRoute exact path="/getteam" component={GetTeam} />
      <PrivateRoute exact path="/countteams" component={CountTeams} />
      <Route exact path="/home" component={IntroAdmin} />
      <PrivateRoute exact path="/conductmatch" component={ConductMatch}/>
      <PrivateRoute exact path="/teams/delete" component={TeamDelete}/>
      <PrivateRoute exact path="/declareResult" component={TournamentResultAdmin}/>
      {/* <Route exact path="/afteradmin" component={FirstPage} /> */}
      



                    <Route exact path="/bidder" component={BidderMatches} />
                    <Route path="/bidder/register" component={Register} />
                    <Route path="/bidder/verify" component={Verify} />
                    <Route path="/bidder/login" component={Login} />
                    <Route path="/bidder/forgotpassword" component={Reset} />
                    <Route path="/bidder/match/:id" component={Bid} />
                    <Route path="/bidder/bids" component={Test} />
                    <Route path="/bidder/test" component={BidsPlaced} />
                    <Route path="/bidder/logout" component={Logout} />
                    <Route path="/bidder/leaderboard" component={Leaderboard} />
                    <Route path="/bidder/teampoints" component={TeamPoints} />
                    <Route path="/bidder/changepassword" component={ChangePassword} />


    </Router>

  );
}

function Intro() {
  const pathMI = '/playerCards/Mumbai Indians.png';
  const pathCSK = '/playerCards/Chennai Super Kings.png';
  const pathDC = '/playerCards/Delhi Capitals.png';
  const pathRCB = '/playerCards/Royal Challengers Bangalore.png';
  const pathGL = '/playerCards/Gujarat Lions.png';
  const pathKKR = '/playerCards/Kolkata Knight Ridders.png';
  const pathRR = '/playerCards/Rajasthan Royals.png';
  const pathSRH = '/playerCards/Sunrisers Hyderabad.png';
  const pathKP = '/playerCards/Kings XI Punjab.png';

  return (
    <div>
      <NavigationBar disp="none" dispLogout="none" />
      <h1 style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", fontSize:"x-large", textTransform:"uppercase", borderRadius:"5px"}}><marquee>IPL FANTASY LEAGUE</marquee></h1>
      <div id="demo" class="carousel slide" data-interval="2000" data-ride="carousel" style={{width:"100%"}} >
        <ul class="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" class="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
          <li data-target="#demo" data-slide-to="3"></li>
          <li data-target="#demo" data-slide-to="4"></li>
          <li data-target="#demo" data-slide-to="5"></li>
          <li data-target="#demo" data-slide-to="6"></li>
          <li data-target="#demo" data-slide-to="7"></li>
          <li data-target="#demo" data-slide-to="8"></li>
        </ul>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={window.location.origin+pathMI} alt="Mumbai Indians" width="100%" height="650" />
              <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                <h3>Mumbai Indians</h3>
              </div>   
              </div>
              <div class="carousel-item">
              <img src={window.location.origin+pathCSK} alt="Chennai Super Kings" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Chennai Super Kings</h3>
                </div>   
            </div>
            <div class="carousel-item">
              <img src={window.location.origin+pathDC} alt="Delhi Capitals" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Delhi Capitals</h3>
                </div>   
            </div>
            <div class="carousel-item">
              <img src={window.location.origin+pathRCB} alt="Royal Challenger Bangalore" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Royal Challengers Bangalore</h3>
                </div>   
            </div>
            <div class="carousel-item">
              <img src={window.location.origin+pathGL} alt="Gujarat Lions" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Gujarat Lions</h3>
                </div>   
            </div>
            <div class="carousel-item">
              <img src={window.location.origin+pathKKR} alt="Kolkata Knight Riders" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Kolkata Knight Riders</h3>
                </div>   
            </div>
            <div class="carousel-item">
              <img src={window.location.origin+pathRR} alt="Rajasthan Royals" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Rajasthan Royals</h3>
                </div>   
            </div>
            <div class="carousel-item">
              <img src={window.location.origin+pathKP} alt="Kings XI Punjab" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Kings XI Punjab</h3>
                </div>   
            </div>
            <div class="carousel-item">
              <img src={window.location.origin+pathSRH} alt="Sunrisers Hyderabad" width="100%" height="650" />
                <div class="carousel-caption" style={{backgroundColor:"#b3b3b3aa" , color:"black", fontWeight:"bold", textTransform:"uppercase", borderRadius:"5px"}}>
                  <h3>Sunrisers Hyderabad</h3>
                </div>   
            </div>
        </div>
              <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </a>
              <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
              </a>
              </div>

          </div>
  )
}

function Team(){
  return(
    <div>
            <NavigationBar disp="none" dispLogout="none" dispLogout="none" />
            <center><h1>TEAMS IN LEAGUE THIS YEAR</h1></center>
            <Teams />
          </div>
  )
}

function Matches(){
  return(
    <div>
            
            <Home />
          </div>
  )
}



function AddMatch(){
  return(
    <div>
            {/* <NavigationBar disp="block" dispLogout="none" dispLogout="block" /> */}
            <Addmatch />
          </div>
  )
}



function Edit(){
  return(
    <div>
            <NavigationBar disp="none" dispLogout="none" dispLogout="block" />
            <center><h1 style={{ fontFamily: 'Abel' }}>UPDATION</h1></center>
            <PutMatches />
          </div>
  )
}

function view(){
  return(
    <div>
            <NavigationBarAdmin disp="none" dispLogout="none" dispLogout="block" />
            <center><h3 style={{ fontFamily: 'Abel' }}>Following are the Match details</h3></center>
            <View />
          </div>
  )
}

function loginChoice(){
  return(
    <div>
            <NavigationBar disp="none" dispLogout="none" dispLogout="none" />

            <MainLoginChoice />
          </div>
  )
}

function LeaderBoardView(){
  return(
    <div>
      {/* <NavigationBar disp="block" dispLogout="none"/> */}
      {/* <h1>LEADERBOARD</h1> */}
      <LeaderBoard/>
    </div>
  )
}

export default withCookies(App);
