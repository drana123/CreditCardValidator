using System;
namespace FrontendAPIFunctionApp.Models
{
    public class MarketQuote
    {
        public int MarketQuoteId { get; set; }
        public decimal RegularMarketPrice { get; set; }
        public string Region { get; set; }
        public string QuoteType { get; set; }
        public decimal RegularMarketChange { get; set; }
        public decimal RegularMarketChangePercentage { get; set; }
        public decimal RegularMarketDayHigh { get; set; }
        public decimal RegularMarketDayLow { get; set; }
        public long RegularMarketVolume { get; set; }
        public decimal RegularMarketOpen { get; set; }
        public decimal TrailingPe { get; set; }
        public decimal PriceToSales { get; set; }
        public decimal ForwardPe { get; set; }
        public bool Tradeable { get; set; }
        public string SymbolName { get; set; }
        public DateTime Createdat { get; set; }
    }
}