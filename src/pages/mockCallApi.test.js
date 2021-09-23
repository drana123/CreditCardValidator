// import callApi from './callApi'
import React from 'react'
import callApi from './callApi'
import {ApiConfiguration} from './apiConfiguration'
import { createMemoryHistory } from 'history'
import { Router } from "react-router-dom";
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
let vdom;
jest.mock('./callApi');
console.log(callApi.mock.calls.length)
afterEach(() => { localStorage.clear(); });
describe("Sample test", () => {
    afterEach(cleanup)
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
        expect(callApi.mock.calls.length).toBe(1);
        localStorage.clear();
    });

    test("Check for the PUT/POST Request", () => {
        // const mockCallApi = jest.fn();
        localStorage.setItem("Email", "ajay@hmail.com");
        localStorage.setItem("userRole", "admin");
        const history = createMemoryHistory();
        vdom = render(
            <Router history={history}>
                <ApiConfiguration />
            </Router>,
        );
        // userEvent.type(screen.getByTestId("endpointInput"),"test");
        userEvent.click(screen.getByText(/Submit/));
        // expect(callApi.mock.calls.length).toBe(2);
        // screen.debug();
        localStorage.clear();
    })
})
