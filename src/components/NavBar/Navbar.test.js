import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'



import Navbar from './Navbar';
import LogOutButton from "./LogOutButton";

let vdom;
beforeEach(()=>{
    const history = createMemoryHistory()
    vdom = render(
    <Router history={history}>
        <Navbar />
      </Router>,)
    }
);
afterEach(cleanup);

describe('NavBar Component', () => {

     test("renders without crashing", ()=>{
            // const history = createMemoryHistory()
            // render(
            //   <Router history={history}>
            //     <Navbar />
            //   </Router>,
            // )
            expect(vdom.getByTestId("navDivTest")).toBeDefined();
           
        });
        test("Sign Out Button displayed with correct text", ()=>{
            expect(vdom.getByTestId("logOutButtonTest").textContent).toBe("Sign out"); 
        });
        test('Styling Nav component renders',()=>{
            expect(vdom.getByTestId("stylingNavTest")).toBeDefined();

        });
        test('List renders',()=>{
            expect(vdom.getByTestId("listTest")).toBeDefined();

        });
        test('Menu Bar Div renders as a list item',()=>{
            expect(vdom.getByTestId("listItemTest")).toBeDefined();
            expect(vdom.getByTestId("menuBarDivTest")).toBeDefined();

        });
        test('Renders routing components correctly',()=>{
            expect(screen.getByText(/API Configuration/i)).toBeInTheDocument();

            const leftClick = {button: 0}
  userEvent.click(screen.getByText(/Nightly Batch Process/i), leftClick)

  // check that the content changed to the new page
  expect(screen.getByText(/Nightly Batch Process/i)).toBeInTheDocument()

  const rightClick = {button:0}
  userEvent.click(screen.getByText(/Users Management/i), rightClick)

  // check that the content changed to the new page
  expect(screen.getByText(/user/i)).toBeInTheDocument()

  const click = {button:0}
  userEvent.click(screen.getByText(/Pricing View/i), click)

  // check that the content changed to the new page
  expect(screen.getByText(/pricing/i)).toBeInTheDocument()

        });

        test('Renders API Configuration/UserManagement/NightlyBatchProcess as a list item',()=>{
            expect(vdom.getByTestId("apiConfigTest")).toBeDefined();
            expect(vdom.getByTestId("usersManagementTest")).toBeDefined();
            expect(vdom.getByTestId("nightlyBatchTest")).toBeDefined();
            expect(vdom.getByTestId("pricingViewTest")).toBeDefined();


        });
         // test('',()=>{
            

        // });

        
    });


  
