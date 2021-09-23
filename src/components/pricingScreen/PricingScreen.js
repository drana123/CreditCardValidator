import React from 'react';
import Header from '../header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import apiConfiguration from '../../pages/apiConfiguration';
import usersManagement from '../../pages/usersManagement';
import nightlyBatchProcess from '../../pages/nightlyBatchProcess';


function PricingScreen() {
  return (
    <>
      <Router>
         <Header /> 
          <Route path='/' component={PricingScreen} />
          <Route path='/apiConfig' component={AdminScreen} />
      </Router>
    </>
  );
}

export default PricingScreen;
