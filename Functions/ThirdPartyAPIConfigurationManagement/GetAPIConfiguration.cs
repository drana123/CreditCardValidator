using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Threading.Tasks;
using FrontendAPIFunctionApp.Interfaces;
using FrontendAPIFunctionApp.Models;
using FrontendAPIFunctionApp.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;

namespace FrontendAPIFunctionApp
{
    public class GetAPIConfiguration
    {
        private IAdminServiceSqlRepository adminService;

        public GetAPIConfiguration(IAdminServiceSqlRepository adminService)
        {
            this.adminService = adminService;
        }

        [OpenApiOperation(operationId: "config-get", tags: new[] { "API Configuration" }, Summary = "Get third party API configurations", Description = "This can be used to fetch the third party API configurations from the database.", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(APIConfiguration), Summary = "API configuration is fetched", Description = "API configuration stored in the database is fetched.")]
        [FunctionName("config-get")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            APIConfiguration configuration = await adminService.GetLatestApiConfiguration();
            return new OkObjectResult(configuration);
        }
    }
}