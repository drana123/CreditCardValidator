import React from "react";
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ApiConfiguration } from './apiConfiguration.js'
import { createMemoryHistory } from 'history'
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from 'axios';
import callApi from './callApi'

jest.mock('./callApi');

let vdom;
afterEach(() => { localStorage.clear(); });

describe("API Configuration tests", () => {
    afterEach(cleanup);

    const mockModelObject = {
        apiEndpointId: 'TestEndpointId',
        apiEndpointUrl: 'TestEndpointUrl',
        region: 'TestRegion',
        symbols: 'TestSymbols',
        apiHost: 'TestApiHost',
        apiKey: 'TestApiKey',
        frequency: 'TestFrequency'
      
      };
      

    test("Renders ApiConfiguration page correctly", () => {
        localStorage.setItem("Email", "ajay@hmail.com");
        localStorage.setItem("userRole", "admin");
        const mockCallApi = jest.fn();
        const history = createMemoryHistory();
        vdom = render(
            <Router history={history}>
                <ApiConfiguration/>
            </Router>,
        );
        expect(vdom.getByTestId("unique")).toBeInTheDocument();
        localStorage.clear();
    });

    test("Checks for the Api calls", () => {
        const mockCallApi = jest.fn();
        localStorage.setItem("Email", "ajay@hmail.com");
        localStorage.setItem("userRole", "admin");
        const history = createMemoryHistory();
        vdom = render(
            <Router history={history}>
                <ApiConfiguration  />
            </Router>,
        );
        // expect(mockCallApi.mock.calls.length).toBe(1);
        localStorage.clear();
    });

    // test("Check for the PUT/POST Request", () => {
    //     const mockCallApi = jest.fn();
    //     localStorage.setItem("Email", "ajay@hmail.com");
    //     localStorage.setItem("userRole", "admin");
    //     const history = createMemoryHistory();
    //     vdom = render(
    //         <Router history={history}>
    //             <ApiConfiguration />
    //         </Router>,
    //     );
    //     // userEvent.type(screen.getByTestId("endpointInput"),"test");
    //     userEvent.click(screen.getByText(/Submit/));
    //     expect(mockCallApi.mock.calls.length).toBe(2);
    //     // screen.debug();
    //     localStorage.clear();
    // })

    

    it("doesn't render apiconfig page when local storage in null", ()=>{
        
        const history = createMemoryHistory();
        history.push("/")
        vdom = render(
            <Router history={history}>
                <ApiConfiguration/>
            </Router>,
        );

        expect(vdom.queryByTestId("unique")).not.toBeInTheDocument();
    })
    
    it("doesn't render apiconfig page when user in not admin", ()=>{
        localStorage.setItem("Email", "ajay@hmail.com");
        localStorage.setItem("userRole", "dguhfj")
        const history = createMemoryHistory();
        history.push("/pricingView")
        vdom = render(
            <Router history={history}>
                <ApiConfiguration/>
            </Router>,
        );

        expect(vdom.queryByTestId("unique")).not.toBeInTheDocument();
    })
});

