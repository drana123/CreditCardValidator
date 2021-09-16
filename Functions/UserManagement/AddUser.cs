using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
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
    public static class AddUser
    {
        [OpenApiOperation(operationId: "user-add", tags: new[] { "User Management" }, Summary = "Adds a User in the database", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(User), Required = true, Description = "User details to be given")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(User), Summary = "User Added", Description = "User is added in the database")]
        [FunctionName("user-add")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            Console.WriteLine(requestBody);
            User userinput = JsonConvert.DeserializeObject<User>(requestBody);
            Console.WriteLine(userinput);
            List<User> userList = new List<User>();
            // return new OkObjectResult(userinput);


            try
            {
                var connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
                log.LogInformation(connectionString);
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    var insertionQuery = @$"Insert into [dbo].[Users]  (EmailID,UserRole,UserName) values ('{userinput.EmailID}','{userinput.UserRole}','{userinput.UserName}')";
                    SqlCommand insertionCommand = new SqlCommand(insertionQuery, connection);
                    var rows = await insertionCommand.ExecuteNonQueryAsync();
                    var fetchQuery = @$"Select * from [dbo].[Users] where EmailID='{userinput.EmailID}'";
                    SqlCommand queryCommand = new SqlCommand(fetchQuery, connection);

                    var reader = await queryCommand.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        log.LogInformation("C# HTTP trigger function processed a request.1");
                        User _user = new User
                        {
                            EmailID = reader["EmailID"].ToString(),
                            UserRole = reader["UserRole"].ToString(),
                            UserName = reader["UserName"].ToString()

                        };
                        userList.Add(_user);

                    }
                    connection.Close();

                }
            }
            catch (System.Exception e)
            {

                ErrorMessage _error = new ErrorMessage
                {
                    Status = 0,
                    Message = "Server error has occured/The user already exists, Failed"
                };

                log.LogError(e.ToString());
                return new OkObjectResult(_error);
            }
            if (userList.Count > 0)
            {
                return new OkObjectResult(userList);
            }
            else
            {
                ErrorMessage _error = new ErrorMessage
                {
                    Status = 0,
                    Message = "User Not Found, Failed"
                };

                return new OkObjectResult(_error);

            }
        }
    }
}
