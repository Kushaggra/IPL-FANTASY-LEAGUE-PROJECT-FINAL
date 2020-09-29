import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './team_data.css'
import { useHistory, useParams } from 'react-router-dom';
import NavigationBarAdmin from './layout/NavigationBarAdmin';
import { useCookies, withCookies } from "react-cookie";
import './CountTeams.css';
const CountTeams = () => {
    const [cookies, setCookie] = useCookies('AdminJwt');
    const [count, setCount] = useState();

    const handler = () => {
        axios.get("http://localhost:9000/admin/teams/count", { headers: { "Authorization": `Bearer ${cookies.AdminJwt}` } })
            .then((response) => {
                setCount(response.data);
                console.log(response);
            })
    }

    useEffect(() => {
        handler()
    }, []);
    return (<div>
        <NavigationBarAdmin />
        <div class="flip-card11 center" style={{fontFamily: "Abel"}}>
            <div class="flip-card11-inner">
                <div class="flip-card11-front">
                    <img src="https://www.insidesport.co/wp-content/uploads/2019/12/Banner.jpg" alt="Avatar" style={{width:"300px", height:"300px", borderRadius: "5px"}} />
    </div>
                    <div class="flip-card11-back"><br/><br/>
                        <h1>Tournament</h1><br/>
                        <p>Number of Teams Playing</p>
                        <h1>{count}</h1>
                    </div>
                </div>
            </div>
        </div>
      );
 
      }
 
export default CountTeams;