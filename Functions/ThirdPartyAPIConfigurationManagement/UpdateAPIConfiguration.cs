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
using Newtonsoft.Json;

namespace FrontendAPIFunctionApp
{
    public static class UpdateAPIConfiguration
    {
        [OpenApiOperation(operationId: "config-update", tags: new[] { "API Configuration" }, Summary = "Update third party API configurations", Description = "This can be used to update the third party API configurations in the database.", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(APIConfiguration), Required = true, Description = "API configuration object that needs to be updated in the database")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(APIConfiguration), Summary = "API configuration is updated", Description = "API configuration is updated in the database.")]
        [FunctionName("config-update")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "put", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# UpdateAPIConfiguration function started.");

            string connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            APIConfiguration config = JsonConvert.DeserializeObject<APIConfiguration>(requestBody);
            log.LogInformation($"Request body : {config}");

            List<APIConfiguration> resultConfigs = new List<APIConfiguration>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string nonQuery = $"UPDATE [dbo].[ApiEndpoints] SET api_endpoint_url = '{config.ApiEndpointUrl}', api_host = '{config.Parameters}', api_key = '{config.Headers}', WHERE id = {config.ApiEndpointId}";
                Console.WriteLine(nonQuery);
                SqlCommand command = new SqlCommand(nonQuery, connection);
                int rowsAffected = await command.ExecuteNonQueryAsync();
                Console.WriteLine("Rows affected = " + rowsAffected);

                string query = @"SELECT * FROM [dbo].[ApiEndpoints]";
                SqlCommand resultCommand = new SqlCommand(query, connection);
                SqlDataReader reader = await resultCommand.ExecuteReaderAsync();
                while (reader.Read())
                {
                    resultConfigs.Add(new APIConfiguration
                    {
                        ApiEndpointId = int.Parse(reader["id"].ToString()),
                        ApiEndpointUrl = reader["api_endpoint_url"].ToString(),
                        Headers = reader["headers"].ToString(),
                        Parameters = reader["paramters"].ToString(),
                        Frequency = reader["scheduling_frequency"].ToString()
                    });
                }
                connection.Close();
            }

            return new OkObjectResult(resultConfigs[0]);
        }

    }
}