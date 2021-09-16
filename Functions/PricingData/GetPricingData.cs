using System;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using FrontendAPIFunctionApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;

namespace PricingDataTable
{
    public class PricingData
    {
        [OpenApiOperation(operationId: "pricingdata-get", tags: new[] { "Pricing Data" }, Summary = "Get Pricing Data", Description = "This can be used to fetch the Pricing data for price view screen from the database.", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(MarketQuote), Summary = "Pricing Data is fetched", Description = "Pricing Data stored in the database is fetched.")]
        [FunctionName("pricingdata-get")]

        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            DataTable marketQuoteList = new DataTable();

            try
            {

                var str = Environment.GetEnvironmentVariable("SQLConnectionString");


                using (SqlConnection connection = new SqlConnection(str))
                {
                    connection.Open();
                    var query = @"Select [dbo].[MarketQuotes].*, SymbolName From [dbo].[MarketQuotes] left join [dbo].[Symbols] on [dbo].[MarketQuotes].SymbolId = [dbo].[Symbols].SymbolId";
                    SqlCommand command = new SqlCommand(query, connection);
                    SqlDataAdapter sda = new SqlDataAdapter(command);
                    sda.Fill(marketQuoteList);

                }

            }
            catch (System.Exception e)
            {

                log.LogError(e.ToString());
            }
            if (marketQuoteList.Rows.Count > 0)
            {
                return new OkObjectResult(marketQuoteList);
            }
            else
            {
                return new NotFoundResult();
            }
        }
    }
}
