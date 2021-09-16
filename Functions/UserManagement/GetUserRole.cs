using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Threading.Tasks;
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

namespace FrontendAPIFunctionApp
{
    public static class GetUserRole
    {
        [OpenApiOperation(operationId: "user-get", tags: new[] { "User Management" }, Summary = "Returns the role of user", Description = "This can be used to fetch the user role from the database", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<User>), Summary = "user role is fetched", Description = "User role stored in the database is fetched.")]
        //[OpenApiResponseWithoutBody(statusCode: HttpStatusCode.MethodNotAllowed, Summary = "Invalid input", Description = "Invalid input")]
        [OpenApiParameter(name: "email", In = ParameterLocation.Query, Required = false, Type = typeof(string), Summary = "User Email", Description = "Checks if User Email is in the Database and their corresponding roles", Visibility = OpenApiVisibilityType.Important)]
        [FunctionName("user-get")]
        public static async Task<IActionResult>
        Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]
            HttpRequest req,
            ILogger log
        )
        {
            string email = req.Query["email"];
            log.LogInformation("Welcome to C# HTTP trigger function");
            if (string.IsNullOrEmpty(email))
            {
                log.LogInformation("Email Not Detected in Query String");
            }
            List<User> userList = new List<User>();

            try
            {
                var str = Environment.GetEnvironmentVariable("SQLConnectionString");


                log.LogInformation(str);
                using (SqlConnection connection = new SqlConnection(str))
                {

                    connection.Open();


                    var query = string.IsNullOrEmpty(email) ? @"Select * from [dbo].[Users]" : $"SELECT * FROM [dbo].[Users] WHERE EmailId = '{email}'";
                    SqlCommand command = new SqlCommand(query, connection);
                    int i = 1;
                    var reader = await command.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        log.LogInformation($"Processed Tuple: {i++}");
                        User _user =
                            new User
                            {
                                UserName = reader["UserName"].ToString(),
                                EmailID = reader["EmailID"].ToString(),
                                UserRole = reader["UserRole"].ToString()
                            };
                        userList.Add(_user);
                    }
                }
            }
            catch (System.Exception e)
            {
                log.LogError("Error Encountered");
                //log.LogError(e.ToString());
                log.LogError(e.Message);
                var myObj = new { status = 0, message = e.Message };
                var jsonToReturn = JsonConvert.SerializeObject(myObj);
                return new OkObjectResult(jsonToReturn);
            }

            if (userList.Count > 0)
            {
                log.LogInformation("DB is not Empty");
                return new OkObjectResult(userList);
            }
            else
            {
                var myObj = new { status = 0, message = "User Not Found" };
                var jsonToReturn = JsonConvert.SerializeObject(myObj);
                log.LogError("User not in Db");
                return new OkObjectResult(jsonToReturn);
            }
        }
    }
}
