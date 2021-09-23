import * as ActionType from '../Actions/types';
import  InitialState from './InitialState';

export function resetPreferenceReducer(state=InitialState , action){
    switch(action.type){
        case ActionType.RESET_SAVE_PREF :
            return {
                ...state,
                loadingStatus : {
                ...state.loadingStatus,
                saveUserLoadingStatus : false
                },
                ErrorStatus : {
                ...state.ErrorStatus,
                saveUserErrorStatus : false
                }
            }
        case ActionType.RESET_FETCH_PREF :
            return {
                ...state,
                loadingStatus : {
                    ...state.loadingStatus,
                    userPrefLoadingStatus : false
                },
            ErrorStatus : {
                ...state.ErrorStatus,
                userPrefErrorStatus : false
                }
            }
        default :
            return state;
    }
}
