import React from 'react'
import { useState } from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))


export function Form(props) {
    const classes = useStyles();
    const { children, onSubmit, ...other } = props;
    return (
        <form className={classes.root}
            autoComplete="off"
            onSubmit={onSubmit}
            {...other}>
            {children}
        </form>
    )
}