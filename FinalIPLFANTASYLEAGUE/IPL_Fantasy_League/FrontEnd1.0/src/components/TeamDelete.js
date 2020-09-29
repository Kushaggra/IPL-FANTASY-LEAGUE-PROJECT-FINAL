import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import './cardUpdate.css'
import './output-message.css'
import { useCookies } from 'react-cookie';
import NavigationBarAdmin from './layout/NavigationBarAdmin';

const TeamDelete = () => {

    const [Flag, setFlag] = useState(<button type="submit" className="btn btn-primary" disabled>Submit</button>);
    const [cookies, setCookie] = useCookies();
    const [PasswordStatus, setPasswordStatus] = useState('');
    const [CheckPassword, setCheckPassword] = useState('');
    const [snack,setSnack]=useState();
    let history = useHistory();

    const [match, setMatch] = useState({
        teamName:""
    });

    const handleChange = (event) => {
     
                setMatch({[event.target.name] : event.target.value});  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
            axios.post("http://localhost:9000/admin/teams/delete",match,
            { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} })
            .then((response)=>{
                console.log(response.data)
                setSnack(response.data)
                onSubmitclicked();
                history.push("/matches")
            }).catch((error)=>{
                console.log(error)
            });
        // history.push("/matches");
        
    }

    const onSubmitclicked=()=>{
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        
    }

    
    let count = 0;


    const matchPassword = (event) => {
        if (event.target.name === 'teamName') {
            count++;
            if (count>1 && match.teamName !== CheckPassword) {
                setPasswordStatus(<p>Team Names do not match</p>);
                setFlag(<button type="submit" className="btn btn-primary" disabled>Delete team</button>);
            }
            else {
                setPasswordStatus('');
                setFlag(<button type="submit" className="btn btn-primary" >Delete team</button>);
            }
        }
        else if (event.target.name === 'confirm_teamName') {
            setCheckPassword(event.target.value);
            if (match.teamName !== event.target.value) {
                setPasswordStatus(<p>Team Names do not match</p>);
                setFlag(<button type="submit" className="btn btn-primary" disabled>Delete team</button>);
            }
            else {
                setPasswordStatus('');
                setFlag(<button type="submit" className="btn btn-primary" >Delete team</button>);
            }
        }
    };

   const path = '/playerCards/delete.png';

    return (
        <>
        <NavigationBarAdmin />
        <form onSubmit={handleSubmit}>
        <div class="card1 center1">
        <div class="additional1">
          <div class="user-card1">
            <img src={window.location.origin+path} height="200" width="150" class="center"/>
          </div>
        </div>
        <div class="general1 col-12">
          <div>Enter the name of the team that needs to be deleted<br/>
          <div className="form-group">
                    <label htmlFor="teamName">Team Name</label>
                    <input required type="text" className="form-control" id="teamName" name="teamName" onChange={handleChange} onBlur={matchPassword}  />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_teamName">Confirm Team Name</label>
                    <input required type="text" className="form-control" id="confirm_teamName" name="confirm_teamName"  onBlur={matchPassword} />
                    <small>{PasswordStatus}</small>
                </div>
           <div class="demo">
           </div>
           <div id="snackbar">{snack}</div>
        </div>
        {Flag}
        </div>
      </div>
      </form>
      </>)
}

export default TeamDelete;