import React from 'react';
import Navbar from '../NavBar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ApiConfiguration} from '../../pages/apiConfiguration';
import usersManagement from '../../pages/usersManagement';
import NightlyBatchProcess from '../../pages/nightlyBatchProcess';
import WithCustomMiddleware from "../pricingScreen/Container";


function AdminScreen() {
  return (
    <>
  
      <Router>
      
        <Switch>
    
          <Route path='/apiConfig' exact component={ApiConfiguration} />
          <Route path='/usersManagement' component={usersManagement} />
          <Route path='/nightlyBatchProcess' component={NightlyBatchProcess} />
          <Route path="/pricingView" exact component={WithCustomMiddleware} />
        
        </Switch>
      </Router>
    </>
  );
}

export default AdminScreen;



