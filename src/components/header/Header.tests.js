import React from 'react';
import ReactDOM  from 'react-dom';
import  Header  from './Header';
import {render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

let vdom;

afterEach(cleanup);

describe("Heading component Tests", ()=>{
    // it("displays admin view button when user is admin", ()=>{
    //     localStorage.setItem("Email","ajaydp@gmail.com");
    //     localStorage.setItem("userRole","admin"); 
    //     vdom = render(<header></header>);
    //     expect(vdom.getByTestId("adminView").toBeVisible());
    //     // localStorage.cleanup();
    // })
});




