import './updateUserPrefAction'
import { updatePreference, updatePreferenceError ,updateUserPrefAction} from './updateUserPrefAction';
import { apiError } from "./apiAction"
import { UPDATE_PREF, API, API_ERROR } from './types';

test("update user preference", () => {
    const data = {
        "emailId": "ajaydp322@gmail.com",
        "userPreference": '{"sorting":[{"ColumnName":"marketQuoteId","sortingDirection":"asc"}],"currentPage":0,"pageSize":5,"MarketPrice":[0,200],"MarketHigh":[0,400],"MarketLow":[0,400],"MarketOpen":[0,400],"TrailingPe":[0,760],"ForwardPe":[-110,365],"filters":[{"columnName":"region","value":""},{"columnName":"quoteType","value":""},{"columnName":"tradable","value":""},{"columnName":"marketQuoteId","value":""}],"groups":[]}'
    };
    let preference = updatePreference(data);
    expect(preference).toStrictEqual({
        type: UPDATE_PREF,
        payload: data
    });
});


test("Error in update user preference", () => {
    let errorInSetPreference = updatePreferenceError();
    expect(errorInSetPreference).toStrictEqual({ "type": API_ERROR, "payload": UPDATE_PREF })
});


test("Error in update user preference", () => {
    const responseObject = updateUserPrefAction("abc");
    expect(responseObject.type).toEqual(API);
    expect(responseObject.payload.data).toEqual("abc");

});