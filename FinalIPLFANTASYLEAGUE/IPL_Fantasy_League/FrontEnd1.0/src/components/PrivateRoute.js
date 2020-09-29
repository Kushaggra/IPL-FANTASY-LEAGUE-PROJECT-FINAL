import React, { useEffect } from 'react'
// import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'
import { useCookies,withCookies } from "react-cookie";
import axios from 'axios'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const [cookies,setCookie]=useCookies('AdminJwt');
  

let isLoggedIn=false

  const checkLoginStatus = async () =>{
   await axios.get('http://localhost:9000/admin/verify',
   { headers: {"Authorization" : `Bearer ${cookies.AdminJwt}`} }).then((response)=>{
     if(response.data==true)
        isLoggedIn=response.data
   })
      console.log(isLoggedIn)
  } 

  useEffect(()=>{
      checkLoginStatus()
  },[])

  return (
    <Route
      {...rest}
      render={props =>
        (isLoggedIn==true) ? ( <Component {...props} />) 
                   : ( <Redirect to={{ pathname: '/afteradmin', state: { from: props.location } }} />)
      }
    />
  )

}

export default PrivateRoute