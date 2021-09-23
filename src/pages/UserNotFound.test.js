import React from 'react';
import ReactDOM  from 'react-dom';
import UserNotFound from './UserNotFound';
import {render, cleanup } from '@testing-library/react';

let vdom;
beforeEach(()=>{
    vdom = render(<UserNotFound/>);
    }
);

describe('UserNotFound component', () => {

  test("renders without crashing", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<UserNotFound />, div);
});

    test('renders "You are not a user" as a text', () => {
  
      expect(vdom.getByTestId("headingTest").textContent).toBe("You are not a user");
    });
    });
