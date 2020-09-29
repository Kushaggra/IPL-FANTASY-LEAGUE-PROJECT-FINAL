// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import { useHistory} from 'react-router-dom';
// import './cardUpdate.css'
// import './output-message.css'
// import { useCookies } from 'react-cookie';
// import NavigationBarAdmin from './layout/NavigationBarAdmin';

// const AddMatch = () => {

//     const [cookies, setCookie] = useCookies();
//     const [match, setMatch] = useState({
//         matchId:'',
//         teamOne:'',
//         teamTwo:'',
//         date:'',
//         time:'',
//         stadium:'',
//         winner:''
//     });
 
//     const [snack,setSnack]=useState();
//     let history = useHistory();
//     const {matchId,teamOne,teamTwo,date,time,stadium,winner } = match;

//     const handleChange = (event) => {
//         setMatch({...match, [event.target.name] : event.target.value});
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();
//             axios.post("http://localhost:9000/admin/addMatch",match,
//             { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} })
//             .then((response)=>{
//                 console.log(response.data)
//                 setSnack(response.data)
//                 onSubmitclicked();
//                 history.push("/matches")
//             });
//         // history.push("/matches");
        
//     }

//     const onSubmitclicked=()=>{
//         var x = document.getElementById("snackbar");
//         x.className = "show";
//         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        
//     }

//    const path = '/playerCards/icon.jpg';

//     return (
//         <>
//         <NavigationBarAdmin />
//         <form onSubmit={handleSubmit}>
//         <div class="card1 center1">
//         <div class="additional1">
//           <div class="user-card1">
//             <div class="level1 center1">
//               Match ID: {matchId}
//             </div>
//             <div class="points1 center1">
//               Winner: {winner}
//             </div>
//             <img src={window.location.origin+path} height="200" width="150" class="center"/>
//           </div>
//         </div>
//         <div class="general1 col-12">
//           <div>Correct the details that require Updation:<br/>
//             <div class="demo">
//                 <span><label>TEAM 1:</label> </span>
//                 <span><input type="text" name="teamOne"  onChange={handleChange}/><br/></span>
//             </div>   
//             <div class="demo">
//                 <span><label>TEAM 2:</label> </span>
//                 <span><input type="text" name="teamTwo" onChange={handleChange}/><br/></span>
//             </div>    
//             <div class="demo">
//                 <span><label>DATE:</label> </span>
//                 <span><input type="text" name="date" onChange={handleChange}/><br/></span>
//             </div>    
//             <div class="demo">
//                 <span><label>TIME:</label> </span>
//                 <span><input type="text" name="time"  onChange={handleChange}/><br/></span>
//             </div>   
//             <div class="demo">
//                 <span><label>STADIUM:</label> </span>
//                 <span><input type="text" name="stadium" onChange={handleChange}/><br/></span>
//             </div>    
             
//             <div class="demo">
//                 <span><label>WINNER:</label> </span>
//                 <span><input type="text" name="winner" onChange={handleChange}/><br/></span>
//             </div>    
//            <div class="demo">
//             <div><button type="submit" className="btn btn-success">Add Match Records</button></div>
//             <div id="snackbar">{snack}</div>
//            </div>
//         </div>
//         </div>
//       </div>
//       </form>
//       </>)
// }

// export default AddMatch;

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import './cardUpdate.css'
import './output-message.css'
import { useCookies } from 'react-cookie';
import NavigationBarAdmin from './layout/NavigationBarAdmin';

const AddMatch = () => {

    const [cookies, setCookie] = useCookies();
    const [match, setMatch] = useState({
        matchId:'',
        teamOne:'',
        teamTwo:'',
        date:'',
        time:'',
        stadium:'',
        winner:''
    });
 
    const [snack,setSnack]=useState();
    let history = useHistory();
    const {matchId,teamOne,teamTwo,date,time,stadium,winner } = match;

    const handleChange = (event) => {
        setMatch({...match, [event.target.name] : event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
            axios.post("http://localhost:9000/admin/addMatch",match,
            { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} })
            .then((response)=>{
                console.log(response.data)
                setSnack(response.data)
                onSubmitclicked();
                history.push("/matches")
            });
        // history.push("/matches");
        
    }

    const onSubmitclicked=()=>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        
    }

   const path = '/playerCards/icon.jpg';

    return (
        <>
        <NavigationBarAdmin />
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
                <span><input type="text" name="teamOne"  onChange={handleChange}/><br/></span>
            </div>   
            <div class="demo">
                <span><label>TEAM 2:</label> </span>
                <span><input type="text" name="teamTwo" onChange={handleChange}/><br/></span>
            </div>    
            <div class="demo">
                <span><label>DATE:</label> </span>
                <span><input type="text" name="date" onChange={handleChange}/><br/></span>
            </div>    
            <div class="demo">
                <span><label>TIME:</label> </span>
                <span><input type="text" name="time"  onChange={handleChange}/><br/></span>
            </div>   
            <div class="demo">
                <span><label>STADIUM:</label> </span>
                <span><input type="text" name="stadium" onChange={handleChange}/><br/></span>
            </div>    
             
            <div class="demo">
                <span><label>WINNER:</label> </span>
                <span><input type="text" name="winner" onChange={handleChange}/><br/></span>
            </div>    
           <div class="demo">
            <div><button type="submit" className="btn btn-success">Add Match Records</button></div>
            <div id="snackbar">{snack}</div>
           </div>
        </div>
        </div>
      </div>
      </form>
      </>)
}

export default AddMatch;