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
    public static class SaveUserPreference
    {
        [OpenApiOperation(operationId: "preference-save", tags: new[] { "User Preferences" }, Summary = "Inserts if user preference is not present initially in the database, else updates user preference", Description = "This can be used to save the third party API configurations in the database.", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(UserPreferenceInput), Required = true, Description = "User Grid View Object with an extra field 'isHavingPreference(0/1)' should be given in the body")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(UserPreference), Summary = "User Grid View", Description = "User Grid View is updated/ inserted in the database")]

        [FunctionName("preference-save")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            Console.WriteLine(requestBody);
            UserPreferenceInput _userGridViewInput = JsonConvert.DeserializeObject<UserPreferenceInput>(requestBody);
            Console.WriteLine(_userGridViewInput);
            List<UserPreference> viewList = new List<UserPreference>();
            // return new OkObjectResult(userinput);


            try
            {
                var connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
                log.LogInformation(connectionString);
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    if (_userGridViewInput.IsHavingPreference == 0)
                    {
                        var insertionQuery = @$"Insert into [dbo].[UserGridViews] (EmailId,UserPreference) values ('{_userGridViewInput.EmailId}','{_userGridViewInput.GridConfig}');";
                        SqlCommand insertionCommand = new SqlCommand(insertionQuery, connection);
                        var rows = await insertionCommand.ExecuteNonQueryAsync();

                    }
                    else
                    {
                        var updationQuery = @$"Update [dbo].[UserGridViews] set UserPreference='{_userGridViewInput.GridConfig}' where EmailId='{_userGridViewInput.EmailId}'";
                        SqlCommand updationCommand = new SqlCommand(updationQuery, connection);
                        var rows = await updationCommand.ExecuteNonQueryAsync();


                    }
                    var fetchQuery = @$"Select * from [dbo].[UserGridViews] where EmailID='{_userGridViewInput.EmailId}'";
                    SqlCommand queryCommand = new SqlCommand(fetchQuery, connection);

                    var reader = await queryCommand.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        log.LogInformation("C# HTTP trigger function processed a request.1");
                        UserPreference _userview = new UserPreference
                        {
                            EmailId = reader["EmailId"].ToString(),
                            GridConfig = reader["UserPreference"].ToString()

                        };
                        viewList.Add(_userview);

                    }
                    connection.Close();

                }
            }
            catch (System.Exception e)
            {
                ErrorMessage _error = new ErrorMessage
                {
                    Status = 0,
                    Message = "Server error has occured, Failed"
                };

                log.LogError(e.ToString());
                return new OkObjectResult(_error);
            }
            if (viewList.Count > 0)
            {
                return new OkObjectResult(viewList);
            }
            else
            {
                ErrorMessage _error = new ErrorMessage
                {
                    Status = 0,
                    Message = "Some error has occured,Please try again"
                };

                return new OkObjectResult(_error);

            }


        }
    }
}
