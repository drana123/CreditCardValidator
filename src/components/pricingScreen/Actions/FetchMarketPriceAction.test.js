import renderer from 'react-test-renderer'
import './FetchMarketPriceAction'
import { fetchMarketPriceError, fetchPrice } from './FetchMarketPriceAction';

import { FETCH_PRICE, API_ERROR } from './types';


test("Fetch market price", () => {
    let preference = fetchPrice("abc");
    expect(preference).toStrictEqual({"type": FETCH_PRICE, "payload": "abc"})
});


test("Error in set preference", () => {
    let errorInSetPreference = fetchMarketPriceError("abc");
    expect(errorInSetPreference).toStrictEqual({"type":API_ERROR,"payload":FETCH_PRICE})
});

