
export function getScrollBarRange(data)
{
    if (data===undefined || data.length===0)
    {
        return {
            fullRangeOfMarketPrice : [0,100],
            fullRangeOfMarketOpen : [0,100],
            fullRangeOfMarketHigh : [0,100],
            fullRangeOfMarketLow : [0,100]
        };
    }
        const fullRangeOfMarketPrice = [Number.MAX_VALUE,Number.MIN_VALUE];
        const fullRangeOfMarketOpen = [Number.MAX_VALUE,Number.MIN_VALUE];
        const fullRangeOfMarketHigh = [Number.MAX_VALUE,Number.MIN_VALUE];
        const fullRangeOfMarketLow = [Number.MAX_VALUE,Number.MIN_VALUE];
    
    for (var i = 0 ; i < data.length;i++){
        const row = data[i];
        fullRangeOfMarketPrice[0] = Math.min(fullRangeOfMarketPrice[0] , row.regularMarketPrice);
        fullRangeOfMarketPrice[1] = Math.max(fullRangeOfMarketPrice[1] , row.regularMarketPrice);
        
        fullRangeOfMarketOpen[0] = Math.min(fullRangeOfMarketOpen[0] , row.regularMarketOpen);
        fullRangeOfMarketOpen[1] = Math.max(fullRangeOfMarketOpen[1] , row.regularMarketOpen);
        
        fullRangeOfMarketHigh[0] = Math.min(fullRangeOfMarketHigh[0] , row.regularMarketDayHigh);
        fullRangeOfMarketHigh[1] = Math.max(fullRangeOfMarketHigh[1] , row.regularMarketDayHigh);
        
        fullRangeOfMarketLow[0] = Math.min(fullRangeOfMarketLow[0] , row.regularMarketDayLow);
        fullRangeOfMarketLow[1] = Math.max(fullRangeOfMarketLow[1] , row.regularMarketDayLow);
        
    }
    
    const ScrollRange = {
        fullRangeOfMarketPrice : [Math.trunc(fullRangeOfMarketPrice[0]), Math.trunc(fullRangeOfMarketPrice[1]+1)],
        fullRangeOfMarketOpen : [Math.trunc(fullRangeOfMarketOpen[0]), Math.trunc(fullRangeOfMarketOpen[1]+1)],
        fullRangeOfMarketHigh : [Math.trunc(fullRangeOfMarketHigh[0]), Math.trunc(fullRangeOfMarketHigh[1]+1)],
        fullRangeOfMarketLow :[Math.trunc(fullRangeOfMarketLow[0]), Math.trunc(fullRangeOfMarketLow[1]+1)]
    }
    return ScrollRange;
}