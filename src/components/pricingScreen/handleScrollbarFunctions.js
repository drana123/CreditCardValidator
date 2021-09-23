

export const handleMarketPrice = (newRangeValue, data) => {
    const newRows = data.filter((row) => { return row.regularMarketPrice >= newRangeValue[0] && row.regularMarketPrice <= newRangeValue[1] });
    return newRows;
};
export const handleMarketHigh = (newRangeValue, data) => {
    const newRows = data.filter((row) => { return row.regularMarketDayHigh >= newRangeValue[0] && row.regularMarketDayHigh <= newRangeValue[1] });
    return newRows;
};
export const handleMarketOpen = (newRangeValue, data) => {
    const newRows = data.filter((row) => { return row.regularMarketOpen >= newRangeValue[0] && row.regularMarketOpen <= newRangeValue[1] });
    return newRows;
};
export const handleMarketLow = (newRangeValue, data) => {
    const newRows = data.filter((row) => { return row.regularMarketDayLow >= newRangeValue[0] && row.regularMarketDayLow <= newRangeValue[1] });
    return newRows;
};


export const handleMarketPriceLowerLimit = (newLowerValue, data, end) => {
    if (newLowerValue > end) return data;
    const newRows = data.filter((row) => { return row.regularMarketPrice >= newLowerValue && row.regularMarketPrice <= end });
    return newRows;
};
export const handleMarketPriceUpperLimit = (newUpperValue, data, start) => {
    if (newUpperValue < start) return data;
    const newRows = data.filter((row) => { return row.regularMarketPrice >= start && row.regularMarketPrice <= newUpperValue });
    return newRows;
};

export const handleMarketHighLowerLimit = (newLowerValue, data, end) => {
    if (newLowerValue > end) return data;
    const newRows = data.filter((row) => { return row.regularMarketDayHigh >= newLowerValue && row.regularMarketDayHigh <= end });
    return newRows;
};
export const handleMarketHighUpperLimit = (newUpperValue, data, start) => {
    if (newUpperValue < start) return data;
    const newRows = data.filter((row) => { return row.regularMarketDayHigh >= start && row.regularMarketDayHigh <= newUpperValue });
    return newRows;
};

export const handleMarketOpenLowerLimit = (newLowerValue, data, end) => {
    if (newLowerValue > end) return data;
    const newRows = data.filter((row) => { return row.regularMarketOpen >= newLowerValue && row.regularMarketOpen <= end });
    return newRows;
};

export const handleMarketOpenUpperLimit = (newUpperValue, data, start) => {
    if (newUpperValue < start) return data;
    const newRows = data.filter((row) => { return row.regularMarketOpen >= start && row.regularMarketOpen <= newUpperValue });
    return newRows;
};

export const handleMarketLowLowerLimit = (newLowerValue, data, end) => {
    if (newLowerValue > end) return data;
    const newRows = data.filter((row) => { return row.regularMarketDayLow >= newLowerValue && row.regularMarketDayLow <= end });
    return newRows;
};

export const handleMarketLowUpperLimit = (newUpperValue, data, start) => {
    if (newUpperValue < start) return data;
    const newRows = data.filter((row) => { return row.regularMarketDayLow >= start && row.regularMarketDayLow <= newUpperValue });
    return newRows;
};

