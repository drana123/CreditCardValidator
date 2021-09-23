import { createStore, applyMiddleware } from 'redux';
import pricingAppReducer from '../components/pricingScreen/reducers/rootReducer';
import apiMiddleware from '../components/pricingScreen/Middleware/dbApiMiddleware'
const store = createStore(pricingAppReducer, applyMiddleware(apiMiddleware));
export default store;