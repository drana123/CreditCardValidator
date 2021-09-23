import React from "react";
import {render,screen} from '@testing-library/react';
import SimpleMenu from "./Menu";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "./Button";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import {handleClick} from './Menu';
describe("Drop down menu",() => {
    test("checks if simple menu is rendered",() => {
        const menuName = "Frequency"
        render(<SimpleMenu menuNameValue={menuName} />);
        expect(screen.getByText("Daily")).toBeInTheDocument();
        expect(screen.getByText("Monthly")).toBeInTheDocument();
        expect(screen.getByText("Weekly")).toBeInTheDocument();
        expect(screen.getByText("Frequency")).toBeInTheDocument();
    });
    
    test("checks button is working",() => {
      const mockTrigger = jest.fn();
      const menuName = "Frequency"
      const {getByTestId} = render(<SimpleMenu menuNameValue={menuName} handleClick = {mockTrigger} />);
      userEvent.click(getByTestId('menuBtn'));
      expect(mockTrigger).toBeCalled();
  });
 
  test("should test handle Click function" , ()=>{
    const mockTrigger = jest.fn();
    handleClick("event" , mockTrigger);
    expect(mockTrigger).toBeCalled();
  });
    // test("Check for handleClick and handleClose", () => {
    //     const handleClose = jest.fn();
    //     const handleClick = jest.fn();
    //     const menuName = "Frequency";
    //     const anchorEl = true;
    //     render(<div>
    //         <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
    //           {menuName}
    //         </Button>
    //         <Menu
    //           id="simple-menu"
    //           anchorEl={anchorEl}
    //           keepMounted
    //           open={Boolean(anchorEl)}
    //           onClose={handleClose}
    //         >
    //           <MenuItem onClick={handleClose}>Daily</MenuItem>
    //           <MenuItem onClick={handleClose}>Weekly</MenuItem>
    //           <MenuItem  onClick={handleClose}>Monthly</MenuItem>
    //         </Menu>
    //       </div>)
    //       screen.debug();
    // });

    
    
});