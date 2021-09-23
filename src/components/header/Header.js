import { Fragment } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import React from "react"
import classes from './Header.module.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { connect } from 'react-redux';
import LogOutButton from '../NavBar/LogOutButton'; 
import {handleLogout} from "../NavBar/LogOutButton";
import '../NavBar/Navbar.css'
// import '.././Navbar.css';

function Header(props) {
  //const isRiskAnalyst=props.userRole ;
  var userRole = localStorage.getItem("userRole");
  if (userRole === 'admin') {
    return (
    <div>
      <header className={classes.header} data-testid="headerTest">
        <h1 data-testid="headingTest">Pricing Solution</h1>
         {/* if(props.userRole == "admin"){ */}
         {/* <Router> */}
        <Link to ='/apiconfig'>
        <button type ="button" data-testid="buttonTest" className={classes.button}>Admin View</button>
          {/* } */}
        </Link>
        {/* </Router> */}
        <LogOutButton handleLogout={handleLogout} data-testid = "logOutButton"/>
          
      </header>
      
    </div>
  );
  }
  return (
    <div>
      <header className={classes.header}>
        <h1>Pricing Solution</h1>



        <LogOutButton handleLogout={handleLogout} data-testid = "logOutButton"/>

      </header>
    </div>
  );
};
export default Header;