import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  makeStyles,
  createStyles,
  IconButton,
} from "@material-ui/core";
import React from 'react';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: 120,
      float: "left",
    },
    appbar: {
      background: "#060b26",
      color: "white",
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
      fontFamily: "monospace",
      marginLeft: "-90px",
      fontSize: 35,
      
    },
  })
);

const Heading = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Publicis_logo.svg/1200px-Publicis_logo.svg.png"
            alt="logo"
            className={classes.logo}
          />

          <Typography variant="h6" className={classes.title}>
            {props.text}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Heading;
