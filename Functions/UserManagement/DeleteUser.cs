using System;
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
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;


namespace UserUpdate
{
    public static class DeleteUser
    {
        [OpenApiOperation(operationId: "user-delete", tags: new[] { "User Management" }, Summary = "Delete user from the DB", Description = "This can be used to delete the user from the database", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(APIConfiguration), Summary = "User is Deleted", Description = "User is deleted from the database")]
        [OpenApiParameter(name: "email", In = ParameterLocation.Query, Required = true, Type = typeof(string), Summary = "User Email", Description = "Deleted the user from the database, you can pass multiple comma separated values", Visibility = OpenApiVisibilityType.Important)]

        //[OpenApiResponseWithoutBody(statusCode: HttpStatusCode.MethodNotAllowed, Summary = "Invalid input", Description = "Invalid input")]
        [FunctionName("user-delete")]
        public static ActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]
            HttpRequest req,
            ILogger log
        )
        {
            string email_id = req.Query["email"];
            log.LogInformation("Delete User HTTP Function Triggered");


            try
            {
                var str = Environment.GetEnvironmentVariable("SQLConnectionString");

                log.LogInformation(str);
                using (SqlConnection connection = new SqlConnection(str))
                {

                    connection.Open();
                    if (string.IsNullOrEmpty(email_id))
                    {
                        log.LogError("No Email Passed");
                        var ErrObj = new { status = 0, message = "Operation Failed" };
                        var ErrObjJson = JsonConvert.SerializeObject(ErrObj);
                        return new OkObjectResult(ErrObjJson);
                    }

                    string inputForSQLQuery = "'" + email_id.Replace(",", "','") + "'";
                    var query = $"DELETE FROM [dbo].[Users] WHERE EmailId IN ({inputForSQLQuery}) ";


                    SqlCommand command = new SqlCommand(query, connection);
                    command.ExecuteNonQuery();
                    log.LogInformation($"Email: ({email_id}) sucessfully deleted from DB");


                }
                var myObj = new { status = 1, message = "Operation Successfull" };
                var jsonToReturn = JsonConvert.SerializeObject(myObj);
                return new OkObjectResult(jsonToReturn);
            }
            catch (System.Exception e)
            {
                log.LogError("Error Encountered");
                log.LogError(e.ToString());
                var myObj = new { status = 0, message = e.ToString() };
                var jsonToReturn = JsonConvert.SerializeObject(myObj);
                return new OkObjectResult(jsonToReturn);
            }

        }
    }
}
