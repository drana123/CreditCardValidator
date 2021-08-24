
using System;

namespace CreditCardValidatorLib
{
    public class CreditCardValidator
    {

        public static bool validate(string CreditCardNumber)
        {
            //Validate length
            int CreditCardNumberLength = CreditCardNumber.Length;
            if (CreditCardNumberLength != 13 && CreditCardNumberLength != 16) {
                throw new ArgumentException("Given CC Number Length is Invalid");
            }

            //Validate chars
            for(int i = 0; i < CreditCardNumberLength; i++)
            {
                if(!(CreditCardNumber[i] >='0' && CreditCardNumber[i] <= '9'))
                {
                    throw new ArgumentException("Given CC number contains Invalid Character");
                }
            }

            //Validate IIN 
            string IIN="";
            IIN += CreditCardNumber[0];
            if (IIN != "4")
            {
                IIN += CreditCardNumber[1];
                int IINumber = Convert.ToInt32(IIN);
                if(!(IINumber >=51 && IINumber <= 55))
                {
                    throw new ArgumentException("Given CC number doesnt belong to Visa/Mastercard");

                }

            }
            else
            {
                if (CreditCardNumberLength == 16)
                {
                    throw new ArgumentException("Given CC number doesnt belong to Visa/Mastercard");

                }
            }
            //Validate Checksum
            int Sum = 0;
            bool isCorrectPosition = false;
            for (int i = CreditCardNumberLength - 1; i >= 0; i--)
            {

                int digit = CreditCardNumber[i] - '0';

                if (isCorrectPosition == true)
                    digit = digit * 2;

                Sum += digit / 10;
                Sum += digit % 10;

                isCorrectPosition = !isCorrectPosition;
            }
            if (Sum % 10!= 0)
            {
                throw new ArgumentException("Given CC number failed to pass Luhn Algorithm");

            }
            //Valid card number
            return true;
        }
    }
}
