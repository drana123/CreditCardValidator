import * as ActionType from '../Actions/types';
import setDefaultpreferences from './setDefaultpreferences';
import InitialState from './InitialState';


export function fetchApiReducer(state = InitialState, action) {
  switch (action.type) {
    case ActionType.FETCH_PRICE:
        return   {...state , rows : action.payload};
    case ActionType.FETCH_PREF:
        if ( action.payload.id===-1)
        {
          return {
            ...state,
            preference : setDefaultpreferences(),
          }
        }
        else
        {
          
          return {
            ...state,
            preference : {
              ...state.preference ,
              filters : action.payload.preference.filters,
              sorting : action.payload.preference.sorting,
              currentPage : action.payload.preference.currentPage,
              pageSize : action.payload.preference.pageSize,
              MarketPrice : action.payload.preference.MarketPrice,
              MarketHigh : action.payload.preference.MarketHigh,
              MarketLow : action.payload.preference.MarketLow,
              MarketOpen : action.payload.preference.MarketOpen,
              groups : action.payload.preference.groups
            },
            isHavingPreference : 1
          };      
        }
    
    default:
      return state;
  }
}