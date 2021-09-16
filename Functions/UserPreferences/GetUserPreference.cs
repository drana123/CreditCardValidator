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
using Microsoft.OpenApi.Models;

namespace FrontendAPIFunctionApp
{
    public class GetUserPreference
    {
        private IAdminServiceSqlRepository adminService;

        public GetUserPreference(IAdminServiceSqlRepository adminService)
        {
            this.adminService = adminService;
        }

        [OpenApiOperation(operationId: "preference-get", tags: new[] { "User Preferences" }, Summary = "Get Preferences of a user", Description = "This gets user preference", Visibility = OpenApiVisibilityType.Important)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(UserPreference), Summary = " User Grid View", Description = "Get the User Grid View from the Database,given email of user")]
        [OpenApiParameter(name: "email", In = ParameterLocation.Query, Required = true, Type = typeof(string), Summary = "Email", Visibility = OpenApiVisibilityType.Important)]

        [FunctionName("preference-get")]

        public async Task<IActionResult> Run(
          [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
          ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string EmailId;
            Console.WriteLine(req.QueryString);
            try
            {
                EmailId = req.Query["email"];
            }
            catch (Exception e)
            {
                return new OkObjectResult(new ErrorMessage
                {
                    Status = 0,
                    Message = "No query parameters provided"
                });
            }

            if (EmailId.Equals(""))
            {
                return new OkObjectResult(new ErrorMessage
                {
                    Status = 0,
                    Message = "Provide an email id"
                });
            }

            //List<UserPreference> viewList = new List<UserPreference>();
            List<UserPreference> viewList = await adminService.GetSomeUserPreferences(EmailId);


            if (viewList.Count > 0)
            {
                return new OkObjectResult(viewList);
            }
            else
            {
                UserPreference _userview = new UserPreference
                {
                    EmailId = EmailId,
                    GridConfig = ""

                };
                viewList.Add(_userview);
                return new OkObjectResult(viewList);

            }

        }
    }
}
