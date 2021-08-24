using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CreditCardEmiCalculator;

namespace CreditCardEmiCalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EMICalculatorController : ControllerBase
    {

        [HttpGet("{amount}/{tenure}/{rateOfInterest}")]
        public string EMICalculatorClass(int amount, int tenure, float rateOfInterest)
        {
            CreditCardLoan _CreditCardLoan = new CreditCardLoan(amount, tenure, rateOfInterest);

            int emi = _CreditCardLoan.FindEmi();
            int interest = _CreditCardLoan.FindTotalInterest();
            int netAmount = _CreditCardLoan.FindTotaAmount();

            string resultDisplay = $"The emi is:{emi}. The interest is:{interest}. The total amount is:{netAmount}.";

            return resultDisplay;
        }

    }
}
