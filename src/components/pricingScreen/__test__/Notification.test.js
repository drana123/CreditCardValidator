import React , {Component} from 'react';
import {render ,screen } from '@testing-library/react';
import * as Notification from '../Notification';
import { ToastContainer } from 'react-toastify';


describe('Testing Notification Function of Apply User Preference' , ()=>{
    it('should should display Success when invoked' , ()=> {
        render(<ToastContainer/>);
        Notification.SuccessNotification("Success")
        expect(screen.findByText("Success")).toBeInTheDocument;
        
    });
    it('should should display Error  when invoked' , ()=> {
        render(<ToastContainer/>);
        Notification.ErrorNotification("Error");
        expect(screen.findByText("Error")).toBeInTheDocument;  
    });
});