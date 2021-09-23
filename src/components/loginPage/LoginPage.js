import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginBox from "../loginbox/LoginBox";
import Heading from "../heading/Heading";
import '../app/App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";


import { headingText, buttonText } from "../../constants/loginPage";

import AdminScreen from '../admin/AdminScreen'
import { loginApiEndPoint } from "../../constants/apiEndPoints";
import { useHistory } from "react-router";
import loginApiCall from "../loginbox/loginApiCall"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom : '40px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginText : {
    fontSize : '40px',
    fontWeight : 'bold',
    color : 'white'
  }
}));


 const LoginPage = () => {   
  const classes = useStyles();
  
  const history = useHistory();
  var Email = localStorage.getItem("Email");

  if (Email != null) {
    history.push("/pricingView");
    return (<>
    </>
    );
  }


  return (
      <div className="App" data-testid = "loginPage">
          
          <UnauthenticatedTemplate>
          <div>
      <div data-testid="headingTest"><Heading text={headingText} /></div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography data-testid="loginText" component="h1" variant="h5" className={classes.title}>
          Login
        </Typography>
      </div>
      <div data-testid="loginBoxTest">
        <LoginBox handleLogin={loginApiCall} text = {buttonText} endPoint = {loginApiEndPoint} />
      </div>
    </Container>
    </div>
          </UnauthenticatedTemplate>
      </div>
  );
};

export default LoginPage;