import { RESET_SAVE_PREF , RESET_FETCH_PREF } from '../Actions/types';
import pricingAppReducer from './rootReducer';

import setDefaultpreferences from './setDefaultpreferences';
const InitialState = {
    rows : [],
    preference : setDefaultpreferences(),
    loadingStatus :  {
       marketPriceLoadingStatus : false,
       userPrefLoadingStatus : false,
       saveUserLoadingStatus : false,
    },
    ErrorStatus : {
      marketPriceErrorStatus : false,
      userPrefErrorStatus : false,
      saveUserErrorStatus : false,
    },
    isHavingPreference : 1
}

describe('states returned for RESET_SAVE_PREF action type', () => {
    it('updates save user states ', () => {
        const newState = pricingAppReducer(InitialState,{type: RESET_SAVE_PREF});
        expect(newState.resetPref.loadingStatus.saveUserLoadingStatus).toBe(false);
        expect(newState.resetPref.ErrorStatus.saveUserErrorStatus).toBe(false);
        
    });
})

describe('states returned for RESET_FETCH_PREF action type', () => {
    it('updates user pref states ', () => {
        const newState = pricingAppReducer(InitialState, {type: RESET_FETCH_PREF});
        expect(newState.resetPref.loadingStatus.userPrefLoadingStatus).toBe(false);
        expect(newState.resetPref.ErrorStatus.userPrefErrorStatus).toBe(false);
    });
}) 
