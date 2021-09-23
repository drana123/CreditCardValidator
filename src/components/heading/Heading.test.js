import React from 'react';
import ReactDOM  from 'react-dom';
import  Heading  from './Heading.js';
import {render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

let vdom;
beforeEach(()=>{
    vdom = render(<Heading text = "test"/>);
    }
);
afterEach(cleanup);

describe("Heading component Tests", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Heading/>, div);
        expect(div).toBeDefined();
    });

    it("renders heading text correctly", ()=>{
        expect(vdom.container.textContent).toBe("test")
        expect(vdom.getByRole("heading")).toBeVisible();
        // const element = screen.getByRole("heading")
        // expect(element.textContent()).toBe("test");

    });

    it("renders image correctly", ()=>{
        expect(vdom.getByRole("img")).toBeVisible();
    });
});