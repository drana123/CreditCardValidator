import renderer from 'react-test-renderer'
import './FetchMarketPriceAction'
import { fetchUserPrefError, fetchPreference } from './FetchUserPrefAction';
import { apiError } from "./apiAction"
import { FETCH_PREF, API, API_ERROR } from './types';


test("Fetch market price", () => {
    let preference = fetchPreference({"id":1,"emailId":"ajaydp322@gmail.com",
                                        "gridConfig":'{"sorting":[{"ColumnName":"marketQuoteId","sortingDirection":"asc"}],"currentPage":0,"pageSize":5,"MarketPrice":[0,200],"MarketHigh":[0,400],"MarketLow":[0,400],"MarketOpen":[0,400],"TrailingPe":[0,760],"ForwardPe":[-110,365],"filters":[{"columnName":"region","value":""},{"columnName":"quoteType","value":""},{"columnName":"tradable","value":""},{"columnName":"marketQuoteId","value":""}],"groups":[]}'});
                             
    expect(preference).toStrictEqual({"type":FETCH_PREF, "payload": {"id": 1,"email": "ajaydp322@gmail.com", "preference": {"sorting":[{"ColumnName":"marketQuoteId","sortingDirection":"asc"}],"currentPage":0,"pageSize":5,"MarketPrice":[0,200],"MarketHigh":[0,400],"MarketLow":[0,400],"MarketOpen":[0,400],"TrailingPe":[0,760],"ForwardPe":[-110,365],"filters":[{"columnName":"region","value":""},{"columnName":"quoteType","value":""},{"columnName":"tradable","value":""},{"columnName":"marketQuoteId","value":""}],"groups":[]}}})
});


test("Error in fetch user preference", () => {
    let errorInSetPreference = fetchUserPrefError();
    expect(errorInSetPreference).toStrictEqual({ "type": API_ERROR, "payload": FETCH_PREF })
});



