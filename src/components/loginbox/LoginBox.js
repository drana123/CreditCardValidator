import { Button, Grid, Paper, Typography, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useHistory } from "react-router-dom";
import { FEATURE_URL } from "../../constants/apiConfigurationConstants";
import * as React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      justifyContent: "center",
      minHeight: "200px",
      padding: "15px",
      marginTop: theme.spacing(8),
      display: "flex",
      alignItems: "center",
    },
  })
);

export const LoginBox = (props) => {
  
  const { instance } = useMsal();
  let history = useHistory();
  let auth = false;
  
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Button
        data-testid="button"
        onClick={() => props.handleLogin(props.endPoint, instance, history, localStorage)}
        variant="contained"
        color="primary"
        className="button-element"
      >
        {props.text}
      </Button>
     
    </Paper>
  );
};
export default LoginBox;
