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
    public static class SaveAPIConfiguration
    {
        [OpenApiOperation(operationId: "config-save", tags: new[] { "API Configuration" }, Summary = "Insert third party API configurations", Description = "This can be used to save the third party API configurations in the database.", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(APIConfiguration), Required = true, Description = "API configuration object that needs to be saved in the database")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(APIConfiguration), Summary = "API configuration is inserted", Description = "API configuration is saved in the database.")]
        [FunctionName("config-save")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
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
                string nonQuery = $"INSERT INTO [dbo].[ApiEndpoints] (api_endpoint_id, api_endpoint_url, api_host, api_key, symbols, region) VALUES ('{config.ApiEndpointId}', '{config.ApiEndpointUrl}', '{config.Headers}', '{config.Parameters}')";
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