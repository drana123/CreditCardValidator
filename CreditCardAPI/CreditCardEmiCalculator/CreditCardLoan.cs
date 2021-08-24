using System;


namespace CreditCardEmiCalculator
{
    public class CreditCardLoan
    {
        int amount, tenure;
        double roi;

        public CreditCardLoan(int amount, int tenure, double roi)
        {
            this.amount = amount;
            this.tenure = tenure;
            this.roi = roi;
        }

        public int FindEmi()
        {
            EmiCalculator _EmiCalculator = new EmiCalculator();
            // Console.WriteLine("The emi is {0} per month.", _EmiCalculator.CalculateEmi(amount, tenure, roi));
            return _EmiCalculator.CalculateEmi(amount, tenure, roi);
        }
        public int FindTotalInterest()
        {
            TotalInterestCalculator _TotalInterest = new TotalInterestCalculator();
            //Console.WriteLine("The total interest is {0}.", _TotalInterest.CalculateTotalInterest(amount, tenure, roi));
            return _TotalInterest.CalculateTotalInterest(amount, tenure, roi);
        }
        public int FindTotaAmount()
        {
            NetPayableCalculator _NetPayableCalculator = new NetPayableCalculator();
            // Console.WriteLine("The total amount is {0}.", _NetPayableCalculator.CalculateNetAmount(amount, tenure, roi));
            return _NetPayableCalculator.CalculateNetAmount(amount, tenure, roi);

        }

    }
}
