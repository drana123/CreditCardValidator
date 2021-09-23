import { FETCH_PRICE , FETCH_PREF } from '../Actions/types';
import InitialState from './InitialState';
import pricingAppReducer from './rootReducer';
import setDefaultpreferences from './setDefaultpreferences';

describe('state returned for FETCH_PRICE action type', () => {
    it('updates rows in state', () => {
        const newState = pricingAppReducer(InitialState, {type: FETCH_PRICE, payload: [{"marketQuoteId":7,"regularMarketPrice":28.3,"region":"US","quoteType":"EQUITY","regularMarketChange":0.20999908,"regularMarketChangePercentage":0.7475937,"regularMarketDayHigh":28.465,"regularMarketDayLow":28.3,"regularMarketVolume":1729,"regularMarketOpen":29.0,"trailingPe":0.4069249,"priceToSales":-16.231123,"forwardPe":0.0,"tradeable":false,"symbolName":"AAMC","createdAt":"2021-09-30T00:00:00"}]});
        expect(newState.fetchApi.rows).toEqual([{"marketQuoteId":7,"regularMarketPrice":28.3,"region":"US","quoteType":"EQUITY","regularMarketChange":0.20999908,"regularMarketChangePercentage":0.7475937,"regularMarketDayHigh":28.465,"regularMarketDayLow":28.3,"regularMarketVolume":1729,"regularMarketOpen":29.0,"trailingPe":0.4069249,"priceToSales":-16.231123,"forwardPe":0.0,"tradeable":false,"symbolName":"AAMC","createdAt":"2021-09-30T00:00:00"}]);
    });
})

describe('states returned for FETCH_PREF action type', () => {
  

    it('applies existing pref states', () => {
        const newState = pricingAppReducer(InitialState, {type: FETCH_PREF, payload : { 
            preference :{
                    filters : [{columnName: 'region', value: ''} , {columnName: 'quoteType', value: ''},
                            {columnName: 'tradable', value: ''} ,{columnName: 'marketQuoteId', value: ''}],
                    sorting : [{ColumnName : "marketQuoteId" , sortingDirection : "desc"}],
                    currentPage : 2,
                    pageSize : 10,
                    MarketPrice : [100,200],
                    MarketHigh : [200,400],
                    MarketOpen : [200,400],
                    MarketLow : [10,400],
                    groups : []
                }
            }
        });
          
          
          expect(newState.fetchApi.preference).toEqual({
            filters : [{columnName: 'region', value: ''} , {columnName: 'quoteType', value: ''},
                       {columnName: 'tradable', value: ''} ,{columnName: 'marketQuoteId', value: ''}],
            sorting : [{ColumnName : "marketQuoteId" , sortingDirection : "desc"}],
            currentPage : 2,
            pageSize : 10,
            MarketPrice : [100,200],
            MarketHigh : [200,400],
            MarketOpen : [200,400],
            MarketLow : [10,400],
            groups : []
          });
    });

    it('applies existing pref states', () => {
        const newState = pricingAppReducer(InitialState, {type: FETCH_PREF, payload : { 
            id : -1,
            preference : {}
            }
        });
        const expectedValue = setDefaultpreferences();
        expect(newState.fetchApi.preference).toEqual(expectedValue);
    });
}); 