using System;

namespace CreditCardEmiCalculator
{

    class EmiCalculator
    {
        public int CalculateEmi(int amount,int months,double roi)
        {
            roi = roi / 12;
            roi = roi * 0.01;
            double EmiWithDecimal= (amount * roi * Math.Pow(1.00 + roi, months)) / (Math.Pow(1.00 + roi, months) - 1.00);
             return Convert.ToInt32(Math.Round(EmiWithDecimal));
        }


    }
}