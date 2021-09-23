import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../loginPage/LoginPage";
import UserNotfound from "../../pages/UserNotfound";
import WithCustomMiddleware from "../pricingScreen/Container";
import apiConfiguration from '../../pages/apiConfiguration';
import UsersManagement from '../../pages/usersManagement';
import nightlyBatchProcess from '../../pages/nightlyBatchProcess';
import AdminScreen from "../admin/AdminScreen";
import { Provider } from "react-redux";
import store from "../../store/store";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <switch>
        <Route  path="/" exact component={LoginPage} />
        <Route path="/apiconfig"  component={AdminScreen} />
        <Route path="/userNotFound" exact component={UserNotfound} />
        <Route path="/pricingView" exact component={WithCustomMiddleware} />
          <Route path='/usersManagement' exact component={UsersManagement} />
          <Route path='/nightlyBatchProcess' exact component={nightlyBatchProcess} />
          </switch>
      </Router>
    </Provider>
  );
}


export default App;

