import React , {Component} from 'react';
import {CurrencyEditorBase} from '../CurrencyEditorBase';
import { render } from '@testing-library/react';
import { makeStyles } from '@material-ui/core/styles';

describe ('Handles Currency editor Base function tests' , ()=>{
    test('should render properly' , ()=>{
        const classes = makeStyles({
            root: {
              width: '100%',
            },
            numericInput: {
                fontSize: '14px',
                textAlign: 'left',
                width: '100%',
            }
          });

        const componentUnderTest = render(<CurrencyEditorBase classes = {classes}/>);
  
    });
});

