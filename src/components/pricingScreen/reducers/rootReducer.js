
import { apiStatusReducer } from './apiStatusReducer';
import {resetPreferenceReducer} from './resetPreferenceReducer';
import {fetchApiReducer} from './fetchApiReducer';
import { combineReducers } from 'redux';

const pricingAppReducer = combineReducers({ fetchApi : fetchApiReducer, apiStatus :apiStatusReducer, resetPref : resetPreferenceReducer});

export default pricingAppReducer;