import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersManagement from "../usersManagement";
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import "regenerator-runtime";

let vdom;
// beforeEach(()=>{
//     vdom = render(<UsersManagement />);
//     }
// );
afterEach(cleanup);

afterEach(()=>{localStorage.clear();});

describe("UsersManagement component Tests", ()=>{

    describe("UsersManagement Page when user is admin", ()=>{
        afterEach(cleanup);
        beforeEach(()=>{
            localStorage.setItem("Email","ajay@hmail.com");
            localStorage.setItem("userRole","admin");
            const history = createMemoryHistory()
            vdom = render(
                <Router history={history}>
                <UsersManagement />
                </Router>,
            )
            
        })
        it("renders UsersManagement page correctly ", ()=>{
            expect(vdom.getByTestId("usersPage")).toBeInTheDocument();
        })
        it("renders navBar correctly", ()=>{
            expect(vdom.getByTestId("navBar")).toBeInTheDocument();
        })
        it("renders Heading Text correctly",()=>{
            expect(vdom.getByRole("heading").textContent).toBe("User Management");
        })
        it("renders grid correctly",()=>{
            expect(screen.getByTestId("usersGrid")).toBeInTheDocument();
            screen.debug();
        })
        localStorage.clear();

    })

    describe("UsersManagement Page when user is not admin", ()=>{
        // beforeEach(()=>{
        //     const history = createMemoryHistory()
        //     vdom = render(
        //         <Router history={history}>
        //         <UsersManagement />
        //         </Router>,
        //     )
            
        // })
        it("doesnt renders UsersManagement page when user is not logged in", ()=>{
            localStorage.clear();
            const history = createMemoryHistory()
            // const route = "/";
            // history.push(route)
            vdom = render(
                <Router history={history}>
                <UsersManagement />
                </Router>,
            )
            expect(screen.queryByTestId("usersPage")).toBe(null);
        })
        
        it("doesnt renders UsersManagement page when user is not admin",()=>{
            
            localStorage.setItem("Email","ajay@hmail.com");
            localStorage.setItem("userRole","iesisj");
            const history = createMemoryHistory()
            const route = '/pricingView';
            history.push(route);
            vdom = render(
                <Router history={history}>
                <UsersManagement />
                </Router>,
            )
            screen.debug();
            expect(screen.queryByTestId("usersPage")).toBe(null);

        })
    });

});