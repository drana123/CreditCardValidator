using System;
using CreditCardValidatorLib;

namespace CheckCreditCardNumber
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter the Credit Card Number");
            string CC_Number = Console.ReadLine();
            CreditCardValidator CheckValidity= new CreditCardValidator();
            try
            {
                CreditCardValidator.validate(CC_Number);
                Console.WriteLine("Valid Card Number");

            }
            catch ( Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
