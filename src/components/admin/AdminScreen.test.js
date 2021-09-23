import React from 'react';
import ReactDOM  from 'react-dom';
import AdminScreen from './AdminScreen';
import {render, cleanup } from '@testing-library/react';
import { withMsal } from '@azure/msal-react';

let vdom;
beforeEach(()=>{
    vdom = render(<AdminScreen/>);
    }
);
afterEach(cleanup);

describe('Nightly Batch Process Component', () => {

    test("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<AdminScreen />, div);
    });
    // test("renders NavBar", ()=>{
    //     expect(vdom.getByTestId("navDivTest")).toBeDefined();
    // });

});