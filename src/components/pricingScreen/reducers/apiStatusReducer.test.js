import {API_END ,API_ERROR , FETCH_PREF, SET_PREF , FETCH_PRICE} from '../Actions/types';
import InitialState from './InitialState';
import pricingAppReducer from './rootReducer';

describe('states returned for API_END action type', () => {
    it('handles market prices fetch', () => {
        const newState = pricingAppReducer(InitialState, {type: API_END, payload: FETCH_PRICE});
        expect(newState.apiStatus.loadingStatus.marketPriceLoadingStatus).toBe(true);
    });
    it('handles user pref fetch', () => {
        const newState = pricingAppReducer(InitialState, {type: API_END, payload: FETCH_PREF});
       expect(newState.apiStatus.loadingStatus.userPrefLoadingStatus).toBe(true);
    })
    it('handles setting user pref', () => {
        const newState = pricingAppReducer(InitialState, {type: API_END, payload: SET_PREF})
        expect(newState.apiStatus.loadingStatus.saveUserLoadingStatus).toBe(true);
    })
    it('handles undefined payload', () => {
        const newState = pricingAppReducer(InitialState, {type: API_END, payload: undefined})
       expect(newState.apiStatus.loadingStatus).toEqual({
        marketPriceLoadingStatus : false,
        userPrefLoadingStatus : false,
        saveUserLoadingStatus : false,
     });
    })
})


describe('states returned for API_ERROR action type', () => {
    it('handles market prices fetch', () => {
        const newState = pricingAppReducer(InitialState, {type: API_ERROR, payload: FETCH_PRICE});
        expect(newState.apiStatus.ErrorStatus.marketPriceErrorStatus).toBe(true);
    });
    it('handles user pref fetch', () => {
        const newState = pricingAppReducer(InitialState, {type: API_ERROR, payload: FETCH_PREF});
       expect(newState.apiStatus.ErrorStatus.userPrefErrorStatus).toBe(true);
    })
    it('handles setting user pref', () => {
        const newState = pricingAppReducer(InitialState, {type: API_ERROR, payload: SET_PREF})
        expect(newState.apiStatus.ErrorStatus.saveUserErrorStatus).toBe(true);
    })
    it('handles undefined payload', () => {
        const newState = pricingAppReducer(InitialState, {type: API_ERROR, payload: undefined})
       expect(newState.apiStatus.ErrorStatus).toEqual({
        marketPriceErrorStatus : false,
        userPrefErrorStatus : false,
        saveUserErrorStatus : false
     });
    })
})
