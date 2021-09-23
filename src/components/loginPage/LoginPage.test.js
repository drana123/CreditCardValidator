import React from 'react';
import ReactDOM  from 'react-dom';
import LoginPage from './LoginPage';
import {render, cleanup, screen } from '@testing-library/react';
import {headingText, buttonText} from '../../constants/loginPage';
import 'regenerator-runtime/runtime' 

let vdom;
beforeEach(()=>{
    vdom = render(<LoginPage/>);
    }
);

afterEach(cleanup);

describe("LoginPage Component Tests", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<LoginPage/>, div);

    });

    it("renders login text correctly", ()=>{
        expect(vdom.getByTestId("loginText").textContent).toBe("Login");
    });

    it("renders heading correctly", ()=>{
        expect(vdom.getByTestId("headingTest").textContent).toBe(headingText.toString());
    });

    it("renders login box correctly", ()=>{
        expect(vdom.getByTestId("loginBoxTest").textContent).toBe(buttonText.toString());
    });

});