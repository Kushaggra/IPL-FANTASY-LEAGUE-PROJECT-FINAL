import  axios from 'axios';
import React, { useState } from 'react'
import { useCookies,withCookies } from "react-cookie";
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import Login from '../bidder/Login';

const FirstPage = ()=>{

    const [cookies, setCookie] = useCookies(['AdminJwt']);
    const [credentials, setCredentials]=useState({
        userName:'',
        password:''
    });

   const [jwt,setJwt]=useState();

   const handleChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value});
    setCookie("AdminJwt",jwt,{path : '/'},{expires: 0});


    // newName, { path: '/' });
}
let history = useHistory();
const handleSubmit= async (event)=>{
    event.preventDefault();

   await axios.post('http://localhost:9000/admin/authenticate',credentials)
    .then((response)=>{
        setJwt(response.data);
        console.log(jwt);
        setCookie("AdminJwt", response.data.jwt, { path: "/"
          });
          history.push("/home")
            redir()
        //   console.log("cookie data="+cookies.AdminJwt)
    })

  }

  const handleSubmit2= async (event)=>{

        if(event.target.name === "login")
            history.push("/bidder/login");
        if(event.target.name === "register")
            history.push("/bidder/register");
    }

  
 
    
    const path1 ='/playerCards/Security-amico.png'
    const path2 ='/playerCards/Login-amico.png'
   
    const redir=()=>{
        console.log("Redirecting")
        return <Redirect to="/home"/>
        }
    return(
        <div class="container">
            <div class="row" >
                <div class="col-sm " style={{ padding:"20px", margin:"20px", borderRadius:"20px"}}>
                <div class="login-page " onSubmit={handleSubmit}>
                        <div class="LoginForm " style={{position: "relative", background: "#FFFFFF", width:
                         "360px", margin: "0 auto 100px", padding:"45px", textAlign: "center", 
                          boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
                        <img src={window.location.origin+path1} width="200px" class="LoginImg"/>    
                            <form class="login-LoginForm">
                            <h4>ADMIN LOGIN</h4>
                            <i class="fa fa-user" aria-hidden="true"></i>&nbsp;<input type="text" name="userName" required
                            onChange={handleChange} placeholder="username" style={{  fontFamily: "Roboto, sans-serif",outline: "0",
                             background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius:"5px", padding: "15px", boxSizing: "border-box", fontSize:"14px"}}/>
                            <i class="fa fa-key" aria-hidden="true"></i>&nbsp;<input type="password" name="password" required
                            onChange={handleChange} placeholder="password" style={{  fontFamily: "Roboto, sans-serif",
                            outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius:"5px", padding: "15px", boxSizing: "border-box", fontSize:"14px"}}/>
                            <button type="submit" style={{ fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0", 
                            background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px",color: "#FFFFFF",fontSize: "14p", 
                            webkitTransition: "all 0.3 ease", transition: "all 0.3 ease",cursor:"pointer" }}>
                                Login</button>
                            <p class="message" style={{ margin: "15px 0 0", color: "#b3b3b3", fontSize: "12px"}}>*Restricted Access for ADMIN only</p>
                        </form>
                        </div>
                    </div>
                </div>
                <div class="col-sm" style={{height:"500px",padding:"20px", margin:"20px", borderRadius:"20px"}}>
                <div class="login-page ">
                        <div class="LoginForm " style={{position: "relative", background: "#FFFFFF", width: "360px", 
                        margin: "0 auto 100px", padding:"45px", textAlign: "center",  
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
                        <img src={window.location.origin+path2} width="200px" class="LoginImg"/>    
                            <form class="login-LoginForm">
                            <h4>USER LOGIN And REGISTRATION</h4>
                            <button type="button" onClick={handleSubmit2} name="login"
                             style={{ fontFamily: "Roboto, sans-serif",marginTop:'20px', textTransform: "uppercase", outline: "0",
                              background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px",color: "#FFFFFF",fontSize: "14p", 
                              webkitTransition: "all 0.3 ease", transition: "all 0.3 ease",cursor:"pointer" }}>
                                Login</button>
                                <button type="button" onClick={handleSubmit2} name="register"
                                style={{ fontFamily: "Roboto, sans-serif", 
                                textTransform: "uppercase", outline: "0", background: "#37006a", borderRadius: "5px", width: "100%",
                                 border: "0", padding: "15px",color: "#FFFFFF",fontSize: "14p", webkitTransition: "all 0.3 ease", 
                                 transition: "all 0.3 ease",cursor:"pointer" ,marginBottom:'45px',marginTop:'20px' }}>
                                Registration</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstPage;

/*

import  axios from 'axios';
import React, { useState } from 'react'
import { useCookies,withCookies } from "react-cookie";
import { Redirect, useHistory, withRouter } from 'react-router-dom';
 
const MainLoginChoice=()=>{
 
   const [cookies, setCookie] = useCookies(['AdminJwt']);
   const [credentials, setCredentials]=useState({
        userName:'',
        password:''
    });
 
   const [jwt,setJwt]=useState();
 
    const {userName,password}= credentials;
 
    const handleChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value});
        setCookie("AdminJwt",jwt,{path : '/'},{expires: 0});
    }
 
    let history = useHistory()
    const handleSubmit= async (event)=>{
        event.preventDefault();
   
       await axios.post('http://localhost:9000/admin/authenticate',credentials)
        .then((response)=>{
            setJwt(response.data);
            console.log(jwt);
            setCookie("AdminJwt", response.data.jwt, { path: "/"});
 
            history.push("/")
            redir()
            //   console.log("cookie data="+cookies.AdminJwt)
        }).catch((error)=>{
                console.log(error)
        })
 
      }
 
     const path ='/playerCards/Login-amico.png';
 
     const redir=()=>{
    return <Redirect to="/teams"/>
    }
 
    return(
        <div class="login-page " >
        <div class="LoginForm " style={{position: "relative", background: "#FFFFFF", width: "360px", margin: "0 auto 100px", padding:"45px", textAlign: "center",  boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"}}>
         <img src={window.location.origin+path} width="200px" class="LoginImg"/>    
            <form class="login-LoginForm" onSubmit={handleSubmit}>
             <h4>ADMIN LOGIN</h4>
            <i class="fa fa-user" aria-hidden="true"></i>&nbsp;<input type="text" name="userName" onChange={handleChange} placeholder="username" style={{  fontFamily: "Roboto, sans-serif",outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius:"5px", padding: "15px", boxSizing: "border-box", fontSize:"14px"}}/>
            <i class="fa fa-key" aria-hidden="true"></i>&nbsp;<input type="password" name="password" onChange={handleChange} placeholder="password" style={{  fontFamily: "Roboto, sans-serif",outline: "0", background: "#f2f2f2", width: "90%", border: "0", margin: "0 0 15px", borderRadius:"5px", padding: "15px", boxSizing: "border-box", fontSize:"14px"}}/>
            <input type="submit" className="btn btn-outline-dark col-12" value="Login"/>
                {/* Login *///}
    //             <p class="message" style={{ margin: "15px 0 0", color: "#b3b3b3", fontSize: "12px"}}>*Restricted Access for ADMIN only</p>
    //             </form>
    //           </div>
    //       </div>
       
    //       )
    //   }
    //   export default MainLoginChoice;
      
      
       
      // style={{ fontFamily: "Roboto, sans-serif", textTransform: "uppercase", outline: "0", background: "#37006a", borderRadius: "5px", width: "100%", border: "0", padding: "15px",color: "#FFFFFF",fontSize: "14p", webkitTransition: "all 0.3 ease", transition: "all 0.3 ease",cursor:"pointer" }}



//*/