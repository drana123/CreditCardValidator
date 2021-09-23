import React from 'react';
import {render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from "../grid/Grid";
import "regenerator-runtime";

let vdom;
beforeEach(()=>{
    vdom = render(      <Grid />
        );
    }
);
afterEach(cleanup);

describe("Grid component Tests", ()=>{
    it("renders without crashing", ()=>{
        expect(vdom.container).toBeInTheDocument();
    })
    it("renders grid without crashing", ()=>{
        expect(screen.getByTestId("grid")).toBeInTheDocument();
    })
    it("renders pagingPanel without crashing", ()=>{
        expect(screen.getByTestId("pagingPanel")).toBeInTheDocument();
    })
    
    it("renders editingState without crashing", ()=>{
        expect(screen.getByTestId("editingState")).toBeInTheDocument();
    })
    it("renders pagingState without crashing", ()=>{
        expect(screen.getByTestId("pagingState")).toBeInTheDocument();
    })
    
});