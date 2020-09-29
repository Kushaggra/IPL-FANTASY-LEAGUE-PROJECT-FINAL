import React, { useEffect } from 'react';
import NavigationBarAdmin from './layout/NavigationBarAdmin';


const Intro1 = () => {

    const pathMI = '/playerCards/Mumbai Indians.png';
    const pathCSK = '/playerCards/Chennai Super Kings.png';
    const pathDC = '/playerCards/Delhi Capitals.png';
    const pathRCB = '/playerCards/Royal Challengers Bangalore.png';
    const pathGL = '/playerCards/Gujarat Lions.png';
    const pathKKR = '/playerCards/Kolkata Knight Ridders.png';
    const pathRR = '/playerCards/Rajasthan Royals.png';
    const pathSRH = '/playerCards/Sunrisers Hyderabad.png';
    const pathKP = '/playerCards/Kings XI Punjab.png';
  

   


    // useEffect(()=>{
    //   var refresh = $window.localStorage.getItem('refresh');
    //   console.log(refresh);
    //   if (refresh===null){
    //       window.location.reload();
    //       $window.localStorage.setItem('refresh', "1");
    //   }
    // },[])
    return (
      <div>
        <NavigationBarAdmin disp="none" dispLogout="none" />
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
export default Intro1;