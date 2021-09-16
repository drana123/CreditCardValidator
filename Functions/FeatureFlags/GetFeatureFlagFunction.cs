// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Net;
// using System.Threading.Tasks;
// using FrontendAPIFunctionApp.Models;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Azure.WebJobs;
// using Microsoft.Azure.WebJobs.Extensions.Http;
// using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
// using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Configuration.AzureAppConfiguration;
// using Microsoft.Extensions.Logging;
// using Microsoft.FeatureManagement;
// using Microsoft.OpenApi.Models;

// namespace func_pricingsolution_dev_eastus_001
// {
//     public class FeatureFlagFunction
//     {

//         private readonly IFeatureManager _featureManager;
//         private readonly IConfiguration _configuration;
//         private readonly IConfigurationRefresher _configurationRefresher;
//         private List<String> _featuresList;
//         public FeatureFlagFunction(IFeatureManager featureManager, IConfiguration configuration, IConfigurationRefresherProvider refresherProvider)
//         {
//             _featureManager = featureManager;
//             _configuration = configuration;
//             _configurationRefresher = refresherProvider.Refreshers.First();
//             GetListOfFeatures();
//         }

//         private async void GetListOfFeatures()
//         {
//             _featuresList = await _featureManager.GetFeatureNamesAsync().ToListAsync();
//         }

//         [OpenApiOperation(operationId: "features-get", tags: new[] { "Feature Status" }, Summary = "Returns the if status is enabled or not", Description = "This can be used to fetch the status of a feature from feature manager", Visibility = OpenApiVisibilityType.Important)]
//         [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<FeatureState>), Summary = "Feature is Fetched", Description = "Feature Status is Fetched")]
//         //[OpenApiResponseWithoutBody(statusCode: HttpStatusCode.MethodNotAllowed, Summary = "Invalid input", Description = "Invalid input")]
//         [OpenApiParameter(name: "featurename", In = ParameterLocation.Query, Required = false, Type = typeof(string), Summary = "Feature Status", Description = "Is feature Enabled or not", Visibility = OpenApiVisibilityType.Important)]


//         [FunctionName("features-get")]
//         public async Task<IActionResult> Run(
//             [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
//             ILogger log)
//         {
//             log.LogInformation("C# HTTP trigger function processed a request.");

//             await _configurationRefresher.TryRefreshAsync();

//             string features = req.Query["featurename"];
//             List<FeatureState> _resultFeaturesList = new List<FeatureState>();
//             string[] featuresArray;

//             if (String.IsNullOrEmpty(features))
//             {
//                 featuresArray = _featuresList.ToArray();
//             }
//             else
//             {
//                 featuresArray = features.Split(',');
//             }

//             foreach (var feature in featuresArray)
//             {
//                 if (!_featuresList.Contains(feature))
//                 {
//                     var status = StatusCodes.Status404NotFound;
//                     var content = $"Feature {feature} Not Found";
//                     var errorResponse = new ErrorResponse
//                     {
//                         Status = status,
//                         Message = content
//                     };
//                     log.LogError(content);
//                     return new NotFoundObjectResult(errorResponse);

//                 }

//                 FeatureState _newFeature = new FeatureState
//                 {
//                     FeatureName = feature,
//                     IsFeatureEnabled = await _featureManager.IsEnabledAsync(feature)
//                 };
//                 _resultFeaturesList.Add(_newFeature);

//             }

//             return new OkObjectResult(_resultFeaturesList);


//         }
//     }
// }
