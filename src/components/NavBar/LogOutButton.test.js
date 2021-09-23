import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import React from 'react'
import {Router} from 'react-router-dom'
import LogOutButton, {handleLogout} from "./LogOutButton"
import '@testing-library/jest-dom'
import { Loader } from 'rsuite'

describe('NavBar Component', () => {
    test("logout on click button works", ()=>{
            
        const handleLoginMock =jest.fn();
        const vdom = render(<LogOutButton handleLogout = {handleLoginMock}/>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleLoginMock.mock.calls.length).toBe(1);

    });
});
describe("handleLogout function", ()=>{
    test("handleLogout test",()=>{
        let instance = ()=>{};
        let called=0, instanceCalled=0;
        instance.logoutPopup = ()=>{
            instanceCalled=1;
        }
        let storage = {};
        storage.clear = ()=>{
            called = 1;
        }
        handleLogout(instance, storage);
        expect(called).toBe(1);
    })
})