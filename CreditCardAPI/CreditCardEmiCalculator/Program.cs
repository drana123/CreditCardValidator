using System;

namespace CreditCardEmiCalculator
{

   
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter your Loan amount:");
            int amount = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter your tenure in months:");
            int tenure = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter your Rate of interest:");
            double roi = Convert.ToDouble(Console.ReadLine());

            CreditCardLoan LoanforDhiraj = new CreditCardLoan(amount,tenure,roi);
            int emi=LoanforDhiraj.FindEmi();
            int interest=LoanforDhiraj.FindTotalInterest();
            int netAmount=LoanforDhiraj.FindTotaAmount();
        }
    }
}


