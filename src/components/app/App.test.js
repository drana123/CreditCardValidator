import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'
import App from './App'
import ReactDOM  from 'react-dom';
import '@testing-library/jest-dom';
import {userNotFoundText} from "../../constants/userNotFoundText"

afterEach(cleanup);

describe("App component Tests", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        expect(div).toBeDefined();
    });

    it('lands on a princingView page user is registered in db', () => {
        
        localStorage.setItem("Email","ajaydp@gmail.com");
        localStorage.setItem("userRole","admin");
        const history = createMemoryHistory()
        let vdom = render(
          <Router history={history}>
            <App />
          </Router>,
        )
        expect(vdom.getByTestId("containerDiv")).toBeInTheDocument();
    })    
});

