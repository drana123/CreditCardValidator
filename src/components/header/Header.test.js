import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'

import Header from './Header';

let vdom;
beforeEach(()=>{
    // let onClickMock = jest.fn();
    const history = createMemoryHistory()
    vdom = render(
    <Router history={history}  >
        <Header />
      </Router>,)
    
    localStorage.setItem("userRole","admin");
    // localStorage.setItem()
}
);
afterEach(cleanup);

describe('Header Component when it is a admin', () => {

    test("renders the logoutButton component", ()=>{
          
           expect(vdom.getByTestId("logOutButtonTest")).toBeDefined();
          
       });

       test('renders "pricing solution" as heading', ()=>{
          
        expect(vdom.getByTestId("headingTest").textContent).toBe("Pricing Solution");
       
    });

    test("renders signout button", ()=>{
          
        expect(vdom.getByTestId("buttonTest").textContent).toBe("Admin View");
       
    });
});
