using System;

namespace CreditCardEmiCalculator
{

    class TotalInterestCalculator
    {
        public int CalculateTotalInterest(int amount, int months, double roi)
        {
            roi = roi / 12;
            roi = roi * 0.01;
            double EmiWithDecimal = (amount * roi * Math.Pow(1.00 + roi, months)) / (Math.Pow(1.00 + roi, months) - 1.00);
            double NetAmount = EmiWithDecimal * months;
            double Interest = NetAmount - amount;
            return Convert.ToInt32(Math.Round(Interest));
        }


    }
}