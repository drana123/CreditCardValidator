using System;
using Xunit;

namespace CreditCardValidatorLib.Tests
{
    public class CreditCardValidatorTests
    {
        [Fact]
        public void Given_CreditCardNumber_OfInvalivdLength_When_Validated_Then_Exception_Thrown()
        {

            // Assert.True(actualValue == expectedValue);
            Assert.Throws<ArgumentException>(() =>
            {
                bool actualValue = CreditCardValidator.validate("1234");
                return actualValue;
            });
        }

        [Fact]
        public void Given_CreditCardNumber_WithInvalidCharacters_When_Validated_Then_Exception_Thrown()
        {
           // bool actualValue = CreditCardValidator.validate("134234b567891");
            //bool expectedValue = false;
            //Assert.True(actualValue == expectedValue);

            Assert.Throws<ArgumentException>(() =>
            {
                bool actualValue = CreditCardValidator.validate("134234b567891");
                return actualValue;
            });

        }

        [Fact]   
        public void Given_CreditCardNumber_WithInvalidIIN_When_Validated_Then_Exception_Thrown()
        {
           // bool actualValue = CreditCardValidator.validate("1234123412341234");
            //bool expectedValue = false;
            //Assert.True(actualValue == expectedValue);

            Assert.Throws<ArgumentException>(() =>
            {
                bool actualValue = CreditCardValidator.validate("1234123412341234");
                return actualValue;
            });
        }
        [Fact]
        public void Given_CreditCardNumber_WithInvalidChecksum_When_Validated_Then_Exception_Thrown()
        {
           // bool actualValue = CreditCardValidator.validate("371449635398432");
            //bool expectedValue = false;
            //Assert.True(actualValue == expectedValue);

            Assert.Throws<ArgumentException>(() =>
            {
                bool actualValue = CreditCardValidator.validate("371449635398432");
                return actualValue;
            });
        }
        [Fact]
        public void Given_ValidCreditCardNumb_When_Validated_Then_valid_Expected()
        {
            bool actualValue = CreditCardValidator.validate("5555555555554444");
            bool expectedValue = true;
            Assert.True(actualValue == expectedValue);
        }
         






    }
}
