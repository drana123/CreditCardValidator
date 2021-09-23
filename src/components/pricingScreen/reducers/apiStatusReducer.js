import * as ActionType from '../Actions/types';
import  InitialState  from './InitialState';


export function apiStatusReducer(state=InitialState , action){
    switch(action.type){
        case ActionType.API_END:
            if (action.payload === ActionType.FETCH_PRICE)
            {  
                return {
                ...state,
                loadingStatus : {
                    ...state.loadingStatus,
                    marketPriceLoadingStatus : true
                }
                };
            }
            else if (action.payload === ActionType.FETCH_PREF)
            {
                return {
                ...state,
                loadingStatus : {
                    ...state.loadingStatus,
                    userPrefLoadingStatus : true
                }
                };
            }
            else if (action.payload === ActionType.SET_PREF || action.payload === ActionType.UPDATE_PREF)
            {
                return {
                ...state,
                loadingStatus : {
                    ...state.loadingStatus,
                    saveUserLoadingStatus : true
                }
                };
            }
            else
            {
                return state;
            }
        case ActionType.API_ERROR :
            if (action.payload === ActionType.FETCH_PRICE)
            {  
                return {
                ...state,
                ErrorStatus : {
                    ...state.ErrorStatus,
                    marketPriceErrorStatus : true
                }
                };
            }
            else if (action.payload === ActionType.FETCH_PREF)
            {
                return {
                ...state,
                ErrorStatus : {
                    ...state.ErrorStatus,
                    userPrefErrorStatus : true
                }
                };
            }
            else if (action.payload === ActionType.SET_PREF || action.payload === ActionType.UPDATE_PREF)
            {
                return {
                ...state,
                ErrorStatus : {
                    ...state.ErrorStatus,
                    saveUserErrorStatus : true
                }
                };
            }
            else 
            {
                return state;
            }
        default :
            return state;
    }
}
