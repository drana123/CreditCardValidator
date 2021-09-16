// using System;
// using System.IO;
// using Azure.Identity;
// using Microsoft.Azure.Functions.Extensions.DependencyInjection;
// using Microsoft.Extensions.Configuration;
// using Microsoft.FeatureManagement;

// [assembly: FunctionsStartup(typeof(FunctionApp.Startup))]

// namespace FunctionApp
// {
//     class Startup : FunctionsStartup
//     {
//         public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
//         {

//             FunctionsHostBuilderContext context = builder.GetContext();
//             var config = new ConfigurationBuilder()
//                 .AddJsonFile((Path.Combine(context.ApplicationRootPath, "appsettings.json")), optional: false, reloadOnChange: true)
//                 .AddJsonFile((Path.Combine(context.ApplicationRootPath, "local.settings.json")), optional: true, reloadOnChange: true)
//                 .Build();

//             // var endpoint = IsDevelopmentEnvironment() ? config["appconfig:connectionstring"] : config["appconfig:endpoint"];
//             var endpoint = "Endpoint=https://appcs-price-dev-01.azconfig.io;Id=mx9r-l6-s0:ZsLdUubipTZjC4p80BJ0;Secret=jLXeMNoKcmU/nKJ48UUal/46yOpGKjFAGIp7j7yqgL0=";


//             builder.ConfigurationBuilder.AddAzureAppConfiguration(options =>
//             {
//                 _ = IsDevelopmentEnvironment() ? options.Connect(endpoint) : options.Connect(new Uri(endpoint), new DefaultAzureCredential());
//                 options.Select("*")
//                 .ConfigureRefresh(refreshOptions => refreshOptions.Register("Test:FeatureFlag", refreshAll: true))
//                 .UseFeatureFlags();
//             });
//         }

//         public override void Configure(IFunctionsHostBuilder builder)
//         {

//             builder.Services.AddAzureAppConfiguration();
//             builder.Services.AddFeatureManagement();

//         }

//         private bool IsDevelopmentEnvironment()
//         {
//             return "Development".Equals(Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT"), StringComparison.InvariantCultureIgnoreCase);
//         }
//     }
// }

using FrontendAPIFunctionApp.Configurations;
using FrontendAPIFunctionApp.Interfaces;
using FrontendAPIFunctionApp.Repositories;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(FrontendAPIFunctionApp.Startup))]

namespace FrontendAPIFunctionApp
{
    /// <summary>
    /// This represents the entity to be invoked during the runtime startup.
    /// </summary>
    public class Startup : FunctionsStartup
    {
        /// <inheritdoc />
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddSingleton<AppSettings>();
            builder.Services.AddSingleton<IDatabaseConnector, DatabaseConnector>();
            builder.Services.AddSingleton<IAdminServiceSqlRepository, AdminServiceSqlRepository>();
        }
    }
}