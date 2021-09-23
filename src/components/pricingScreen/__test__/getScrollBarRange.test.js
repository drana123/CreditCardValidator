import React from 'react';
import * as ScrollBar from '../getScrollBarRange';

describe('tests Scrollbar lower and upper limit values', () => {
    const data = [{ "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 1, "regularMarketPrice": 49.97, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.47000122, "regularMarketChangePercentage": 0.9494974, "regularMarketDayHigh": 50.44, "regularMarketDayLow": 49.41, "regularMarketVolume": 708018, "regularMarketOpen": 48.25, "trailingPe": 21.697786, "priceToSales": 0.89270496, "forwardPe": 10.156505, "tradeable": false, "symbolName": "AA", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 2, "regularMarketPrice": 9.74, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.020000458, "regularMarketChangePercentage": -0.20492272, "regularMarketDayHigh": 9.75, "regularMarketDayLow": 9.72, "regularMarketVolume": 215725, "regularMarketOpen": 9.73, "trailingPe": 100.41237, "priceToSales": 0, "forwardPe": 0, "tradeable": false, "symbolName": "AAC", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 3, "regularMarketPrice": 2.81, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.03999996, "regularMarketChangePercentage": -1.4035075, "regularMarketDayHigh": 2.85, "regularMarketDayLow": 2.81, "regularMarketVolume": 1307, "regularMarketOpen": 2.78, "trailingPe": 0, "priceToSales": 0.502092, "forwardPe": -4.19403, "tradeable": false, "symbolName": "AACG", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 4, "regularMarketPrice": 27.71, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.21000099, "regularMarketChangePercentage": -0.75215256, "regularMarketDayHigh": 27.82, "regularMarketDayLow": 27.6, "regularMarketVolume": 4361, "regularMarketOpen": 27.55, "trailingPe": 0, "priceToSales": 39.50698, "forwardPe": -1.0150183, "tradeable": false, "symbolName": "AADI", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 5, "regularMarketPrice": 3.76, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.01999998, "regularMarketChangePercentage": 0.53475887, "regularMarketDayHigh": 3.7727, "regularMarketDayLow": 3.76, "regularMarketVolume": 10679, "regularMarketOpen": 3.78, "trailingPe": 752, "priceToSales": 7.938157, "forwardPe": 14.461539, "tradeable": false, "symbolName": "AAIC", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 6, "regularMarketPrice": 18.8, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.15000153, "regularMarketChangePercentage": -0.79156476, "regularMarketDayHigh": 19.23, "regularMarketDayLow": 18.645, "regularMarketVolume": 5319076, "regularMarketOpen": 20.28, "trailingPe": 0, "priceToSales": 0.651408, "forwardPe": 19.583332, "tradeable": false, "symbolName": "AAL", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 7, "regularMarketPrice": 28.3, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.20999908, "regularMarketChangePercentage": 0.7475937, "regularMarketDayHigh": 28.465, "regularMarketDayLow": 28.3, "regularMarketVolume": 1729, "regularMarketOpen": 29, "trailingPe": 0.4069249, "priceToSales": -16.231123, "forwardPe": 0, "tradeable": false, "symbolName": "AAMC", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 8, "regularMarketPrice": 3.9, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.01999998, "regularMarketChangePercentage": -0.5102036, "regularMarketDayHigh": 3.94, "regularMarketDayLow": 3.9, "regularMarketVolume": 932, "regularMarketOpen": 4.04, "trailingPe": 5.2278824, "priceToSales": 0.38504797, "forwardPe": 0, "tradeable": false, "symbolName": "AAME", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 9, "regularMarketPrice": 26.22, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.010000229, "regularMarketChangePercentage": -0.038125157, "regularMarketDayHigh": 26.62, "regularMarketDayLow": 26.135, "regularMarketVolume": 8385, "regularMarketOpen": 27.07, "trailingPe": 8.593904, "priceToSales": 0.47078308, "forwardPe": 8.828282, "tradeable": false, "symbolName": "AAN", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 10, "regularMarketPrice": 7.3, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.12999964, "regularMarketChangePercentage": -1.7496587, "regularMarketDayHigh": 7.49, "regularMarketDayLow": 7.26, "regularMarketVolume": 15379, "regularMarketOpen": 7.77, "trailingPe": 0, "priceToSales": 0.8509957, "forwardPe": -16.59091, "tradeable": false, "symbolName": "AAOI", "createdAt": "2021-09-30T00:00:00" }];

    it('should get the scroll bar values according to the given data', () => {
        const scrollBarValues = ScrollBar.getScrollBarRange(data);
        expect(scrollBarValues).toEqual(
            {
                fullRangeOfMarketPrice: [2, 175],
                fullRangeOfMarketOpen: [2, 178],
                fullRangeOfMarketHigh: [2, 178],
                fullRangeOfMarketLow: [2, 175]
            }
        );
    });

    it('should get the scroll bar values when data is undefined', () => {
        const scrollBarValues = ScrollBar.getScrollBarRange(undefined);
        expect(scrollBarValues).toEqual(
            {
                fullRangeOfMarketPrice: [0, 100],
                fullRangeOfMarketOpen: [0, 100],
                fullRangeOfMarketHigh: [0, 100],
                fullRangeOfMarketLow: [0, 100]
            }
        );
    });

    it('should get the scroll bar values when data length is zero', () => {
        const scrollBarValues = ScrollBar.getScrollBarRange([]);
        expect(scrollBarValues).toEqual(
            {
                fullRangeOfMarketPrice: [0, 100],
                fullRangeOfMarketOpen: [0, 100],
                fullRangeOfMarketHigh: [0, 100],
                fullRangeOfMarketLow: [0, 100]
            }
        );
    });
});