import React, { Component } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import GridView from '../GridView';
import * as Handlers from '../handleScrollbarFunctions';
import { modifyTradabledata } from '../GridView';


describe('tests Gridview of pricing Screen', () => {
    localStorage.setItem("Email", "ajay@hmail.com");
    localStorage.setItem("userRole", "admin");
    const componentUnderTest = render(<Provider store={store}> <GridView
        data={[]}
        preference={{}}
        loadingStatus={{}}
        ErrorStatus={{}}
        isHavingPreference={0}
    /> </Provider>);
    it('should render properly without crashing', () => {
        expect(componentUnderTest).toBeInTheDocument;
    });
    localStorage.clear();
});

describe('tests Gridview of pricing Screen', () => {
    localStorage.setItem("Email", "ajay@hmail.com");
    localStorage.setItem("userRole", "admin");
    const comp = render(<Provider store={store}> <GridView
        data={[]}
        preference={{
            filters: [{ columnName: 'region', value: '' }, { columnName: 'quoteType', value: '' },
            { columnName: 'tradable', value: '' }, { columnName: 'marketQuoteId', value: '' }],
            sorting: [{ ColumnName: "marketQuoteId", sortingDirection: "asc" }],
            currentPage: 0,
            pageSize: 5,
            MarketPrice: [0, 100],
            MarketHigh: [0, 100],
            MarketOpen: [0, 100],
            MarketLow: [0, 100],
            groups: []
        }}
        loadingStatus={{}}
        ErrorStatus={{}}
        isHavingPreference={1}
    /> </Provider>);
    it('should render with preferences properly without crashing', () => {
        expect(comp).toBeInTheDocument;
        localStorage.clear();
    });
});
describe('tests Scrollbar functions', () => {
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
    it('should filter data according to new market price range', () => {
        const newRows = Handlers.handleMarketPrice([2, 10], data);
        expect(newRows).toEqual([
            { "marketQuoteId": 2, "regularMarketPrice": 9.74, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.020000458, "regularMarketChangePercentage": -0.20492272, "regularMarketDayHigh": 9.75, "regularMarketDayLow": 9.72, "regularMarketVolume": 215725, "regularMarketOpen": 9.73, "trailingPe": 100.41237, "priceToSales": 0, "forwardPe": 0, "tradeable": false, "symbolName": "AAC", "createdAt": "2021-09-30T00:00:00" },
            { "marketQuoteId": 3, "regularMarketPrice": 2.81, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.03999996, "regularMarketChangePercentage": -1.4035075, "regularMarketDayHigh": 2.85, "regularMarketDayLow": 2.81, "regularMarketVolume": 1307, "regularMarketOpen": 2.78, "trailingPe": 0, "priceToSales": 0.502092, "forwardPe": -4.19403, "tradeable": false, "symbolName": "AACG", "createdAt": "2021-09-30T00:00:00" },
            { "marketQuoteId": 5, "regularMarketPrice": 3.76, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.01999998, "regularMarketChangePercentage": 0.53475887, "regularMarketDayHigh": 3.7727, "regularMarketDayLow": 3.76, "regularMarketVolume": 10679, "regularMarketOpen": 3.78, "trailingPe": 752, "priceToSales": 7.938157, "forwardPe": 14.461539, "tradeable": false, "symbolName": "AAIC", "createdAt": "2021-09-30T00:00:00" },
            { "marketQuoteId": 8, "regularMarketPrice": 3.9, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.01999998, "regularMarketChangePercentage": -0.5102036, "regularMarketDayHigh": 3.94, "regularMarketDayLow": 3.9, "regularMarketVolume": 932, "regularMarketOpen": 4.04, "trailingPe": 5.2278824, "priceToSales": 0.38504797, "forwardPe": 0, "tradeable": false, "symbolName": "AAME", "createdAt": "2021-09-30T00:00:00" },
            { "marketQuoteId": 10, "regularMarketPrice": 7.3, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.12999964, "regularMarketChangePercentage": -1.7496587, "regularMarketDayHigh": 7.49, "regularMarketDayLow": 7.26, "regularMarketVolume": 15379, "regularMarketOpen": 7.77, "trailingPe": 0, "priceToSales": 0.8509957, "forwardPe": -16.59091, "tradeable": false, "symbolName": "AAOI", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    it('should filter data according to new market high range value', () => {
        const newRows = Handlers.handleMarketHigh([170, 180], data);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    it('should filter data according to new market Open range value', () => {
        const newRows = Handlers.handleMarketOpen([170, 180], data);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    it('should filter data according to new market low range value', () => {
        const newRows = Handlers.handleMarketLow([170, 180], data);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });


    //
    it('should filter data according to new market Price Lower Limit value', () => {
        const newRows = Handlers.handleMarketPriceLowerLimit(170, data, 180);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    it('should filter data according to new market Price Upper Limit value', () => {
        const newRows = Handlers.handleMarketPriceUpperLimit(180, data, 170);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });



    it('should filter data according to new market High lowerLimit range value', () => {
        const newRows = Handlers.handleMarketHighLowerLimit(170, data, 180);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    it('should filter data according to new market High UpperLimit value', () => {
        const newRows = Handlers.handleMarketHighUpperLimit(180, data, 170);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });



    it('should filter data according to new market Open LowerLimit range value', () => {
        const newRows = Handlers.handleMarketOpenLowerLimit(170, data, 180);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    it('should filter data according to new market Open UpperLimit range value', () => {
        const newRows = Handlers.handleMarketOpenUpperLimit(180, data, 170);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });


    it('should filter data according to new market low LowerRange value', () => {
        const newRows = Handlers.handleMarketLowLowerLimit(170, data, 180);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    it('should filter data according to new market low Upperrange value', () => {
        const newRows = Handlers.handleMarketLowUpperLimit(180, data, 170);
        expect(newRows).toEqual([
            { "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" }
        ]);
    });

    //

    it('should filter data according to new market Price when Lower Limit value is greater than upperlimit ', () => {
        const newRows = Handlers.handleMarketPriceLowerLimit(1700, data, 180);
        expect(newRows).toEqual(data);
    });

    it('should filter data according to new market Price where Upper Limit value is smaller than lowerlimit value', () => {
        const newRows = Handlers.handleMarketPriceUpperLimit(18, data, 170);
        expect(newRows).toEqual(data);
    });



    it('should filter data according to new market High when lowerLimit range value is greater than upperlimit Range value', () => {
        const newRows = Handlers.handleMarketHighLowerLimit(1700, data, 180);
        expect(newRows).toEqual(data);
    });

    it('should filter data according to new market High when UpperLimit value is smaller than lowerRange value', () => {
        const newRows = Handlers.handleMarketHighUpperLimit(18, data, 170);
        expect(newRows).toEqual(data);
    });



    it('should filter data according to new market Open when LowerLimit range value is greater than upperlimit Range value', () => {
        const newRows = Handlers.handleMarketOpenLowerLimit(1700, data, 180);
        expect(newRows).toEqual(data);
    });

    it('should filter data according to new market Open when UpperLimit range value is smaller than lowerRange value', () => {
        const newRows = Handlers.handleMarketOpenUpperLimit(18, data, 170);
        expect(newRows).toEqual(data);
    });


    it('should filter data according to new market low when LowerRange value is greater than upperlimit Range valuewhen ', () => {
        const newRows = Handlers.handleMarketLowLowerLimit(1700, data, 180);
        expect(newRows).toEqual(data);
    });

    it('should filter data according to new market low when Upperrange value is smaller than lowerRange value', () => {
        const newRows = Handlers.handleMarketLowUpperLimit(18, data, 170);
        expect(newRows).toEqual(data);
    });

    it('should modify tradable column to Yes or No values', () => {
        const newData = modifyTradabledata(data);
        expect(newData).toEqual([{ "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": "No", "symbolName": "A", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 1, "regularMarketPrice": 49.97, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.47000122, "regularMarketChangePercentage": 0.9494974, "regularMarketDayHigh": 50.44, "regularMarketDayLow": 49.41, "regularMarketVolume": 708018, "regularMarketOpen": 48.25, "trailingPe": 21.697786, "priceToSales": 0.89270496, "forwardPe": 10.156505, "tradeable": "No", "symbolName": "AA", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 2, "regularMarketPrice": 9.74, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.020000458, "regularMarketChangePercentage": -0.20492272, "regularMarketDayHigh": 9.75, "regularMarketDayLow": 9.72, "regularMarketVolume": 215725, "regularMarketOpen": 9.73, "trailingPe": 100.41237, "priceToSales": 0, "forwardPe": 0, "tradeable": "No", "symbolName": "AAC", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 3, "regularMarketPrice": 2.81, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.03999996, "regularMarketChangePercentage": -1.4035075, "regularMarketDayHigh": 2.85, "regularMarketDayLow": 2.81, "regularMarketVolume": 1307, "regularMarketOpen": 2.78, "trailingPe": 0, "priceToSales": 0.502092, "forwardPe": -4.19403, "tradeable": "No", "symbolName": "AACG", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 4, "regularMarketPrice": 27.71, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.21000099, "regularMarketChangePercentage": -0.75215256, "regularMarketDayHigh": 27.82, "regularMarketDayLow": 27.6, "regularMarketVolume": 4361, "regularMarketOpen": 27.55, "trailingPe": 0, "priceToSales": 39.50698, "forwardPe": -1.0150183, "tradeable": "No", "symbolName": "AADI", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 5, "regularMarketPrice": 3.76, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.01999998, "regularMarketChangePercentage": 0.53475887, "regularMarketDayHigh": 3.7727, "regularMarketDayLow": 3.76, "regularMarketVolume": 10679, "regularMarketOpen": 3.78, "trailingPe": 752, "priceToSales": 7.938157, "forwardPe": 14.461539, "tradeable": "No", "symbolName": "AAIC", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 6, "regularMarketPrice": 18.8, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.15000153, "regularMarketChangePercentage": -0.79156476, "regularMarketDayHigh": 19.23, "regularMarketDayLow": 18.645, "regularMarketVolume": 5319076, "regularMarketOpen": 20.28, "trailingPe": 0, "priceToSales": 0.651408, "forwardPe": 19.583332, "tradeable": "No", "symbolName": "AAL", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 7, "regularMarketPrice": 28.3, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.20999908, "regularMarketChangePercentage": 0.7475937, "regularMarketDayHigh": 28.465, "regularMarketDayLow": 28.3, "regularMarketVolume": 1729, "regularMarketOpen": 29, "trailingPe": 0.4069249, "priceToSales": -16.231123, "forwardPe": 0, "tradeable": "No", "symbolName": "AAMC", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 8, "regularMarketPrice": 3.9, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.01999998, "regularMarketChangePercentage": -0.5102036, "regularMarketDayHigh": 3.94, "regularMarketDayLow": 3.9, "regularMarketVolume": 932, "regularMarketOpen": 4.04, "trailingPe": 5.2278824, "priceToSales": 0.38504797, "forwardPe": 0, "tradeable": "No", "symbolName": "AAME", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 9, "regularMarketPrice": 26.22, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.010000229, "regularMarketChangePercentage": -0.038125157, "regularMarketDayHigh": 26.62, "regularMarketDayLow": 26.135, "regularMarketVolume": 8385, "regularMarketOpen": 27.07, "trailingPe": 8.593904, "priceToSales": 0.47078308, "forwardPe": 8.828282, "tradeable": "No", "symbolName": "AAN", "createdAt": "2021-09-30T00:00:00" },
        { "marketQuoteId": 10, "regularMarketPrice": 7.3, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.12999964, "regularMarketChangePercentage": -1.7496587, "regularMarketDayHigh": 7.49, "regularMarketDayLow": 7.26, "regularMarketVolume": 15379, "regularMarketOpen": 7.77, "trailingPe": 0, "priceToSales": 0.8509957, "forwardPe": -16.59091, "tradeable": "No", "symbolName": "AAOI", "createdAt": "2021-09-30T00:00:00" }]);
    });

});