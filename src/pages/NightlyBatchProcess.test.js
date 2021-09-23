// import React from 'react';
// import ReactDOM  from 'react-dom';
// import NightlyBatchProcess from './NightlyBatchProcess';
// import {render, cleanup } from '@testing-library/react';
// import { withMsal } from '@azure/msal-react';

// let vdom;
// beforeEach(()=>{
//     vdom = render(<NightlyBatchProcess/>);
//     }
// );
// afterEach(cleanup);

// describe('Nightly Batch Process Component', () => {

//     test("renders without crashing", ()=>{
//         const div = document.createElement('div');
//         ReactDOM.render(<NightlyBatchProcess />, div);
//     });
//     test('renders "NightlyBatch Process" as a text', () => {
  
//       expect(vdom.getByTestId("headingTest").textContent).toBe("Nightly Batch Process");
//     });
//     test('renders div Componet', () => {
//         expect(vdom.getByTestId("divTest")).toBeDefined();
//     });

//     test('renders Grid Componet', () => {
//         expect(vdom.getByTestId("gridTest")).toBeDefined();
//     });

    
  
//     });


import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NightlyBatchProcess from "./nightlyBatchProcess";
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

let vdom;
// beforeEach(()=>{
//     vdom = render(<UsersManagement />);
//     }
// );
afterEach(cleanup);

afterEach(()=>{localStorage.clear();});

describe("NightlyBatchProcess component Tests", ()=>{

    describe("NightlyBatchProcess Page when user is admin", ()=>{
        afterEach(cleanup);
        beforeEach(()=>{
            localStorage.setItem("Email","ajay@hmail.com");
            localStorage.setItem("userRole","admin");
            const history = createMemoryHistory()
            vdom = render(
                <Router history={history}>
                <NightlyBatchProcess />
                </Router>,
            )
            
        })
        // it("renders NightlyBatchProcess page correctly ", ()=>{
        //     expect(vdom.getByTestId("nightlyBatchTest")).toBeInTheDocument();
        // })
        it("renders navBar correctly", ()=>{
            expect(vdom.getByTestId("navDataTest")).toBeInTheDocument();
        })
        it("renders Heading Text correctly",()=>{
            expect(vdom.getByRole("heading").textContent).toBe(" Nightly Batch Process ");
        })
        it("renders grid correctly",()=>{
            expect(screen.getByTestId("gridDataTest")).toBeInTheDocument();
        })
        localStorage.clear();
        
    })

    describe("NightlyBatchProcess Page when user is not admin", ()=>{
        // beforeEach(()=>{
        //     const history = createMemoryHistory()
        //     vdom = render(
        //         <Router history={history}>
        //         <UsersManagement />
        //         </Router>,
        //     )
            
        // })
        it("doesnt render NightlyBatchProcess page when user is not logged in", ()=>{
            const history = createMemoryHistory()
            vdom = render(
                <Router history={history}>
                <NightlyBatchProcess />
                </Router>,
            )
            expect(screen.queryByTestId("nightlyBatchTest")).toBe(null);

        })
        
        it("renders pricingView page when user is not admin",()=>{
            
            localStorage.setItem("Email","ajay@hmail.com");
            localStorage.setItem("userRole","iesisj");
            expect(screen.queryByTestId("pricingView")).toBe(null);
            const history = createMemoryHistory()
            vdom = render(
                <Router history={history}>
                <NightlyBatchProcess />
                </Router>,
            )
            
            expect(screen.queryByTestId("loginPage")).toBe(null);

        })
    });

});
