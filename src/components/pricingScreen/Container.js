import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMarketPrice } from './Actions/fetchMarketPriceAction';
import GridView from './GridView';
import './pricingscreen.css'
import {fetchUserPref} from './Actions/fetchUserPrefAction';
import Header from '../header/Header';

class WithCustomMiddleware extends Component {
  componentDidMount() {
    const email = localStorage.getItem("Email");
    this.props.getAllMarketprices();
    this.props.getUserPreference(email);
    
   
  }

  render = (props) => (

    
      <div data-testid="containerDiv">
      <Header/>
      <GridView
      data = {this.props.data}
      preference = {this.props.preference}
      email = {this.props.email}
      loadingStatus = {this.props.loadingStatus}
      ErrorStatus = {this.props.ErrorStatus}
      isHavingPreference = {this.props.isHavingPreference}
      >
      </GridView>
      </div>
  );
}

const mapStateToProps = function (state) {
  return {
  data : state.fetchApi.rows,
  preference : state.fetchApi.preference,
  loadingStatus : state.apiStatus.loadingStatus,
  ErrorStatus : state.apiStatus.ErrorStatus,
  isHavingPreference : state.fetchApi.isHavingPreference
  }
};

function mapDispatchToProps(dispatch) {
  return {
    getAllMarketprices: () => {dispatch(fetchMarketPrice())},
    getUserPreference : (email) => {dispatch(fetchUserPref(email));}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithCustomMiddleware);



