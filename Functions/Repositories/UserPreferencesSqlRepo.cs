// using System;
// using System.Collections.Generic;
// using FrontendAPIFunctionApp.Models;

// namespace FrontendAPIFunctionApp.Repositories
// {
//     public class UserPreferenceSqlRepo
//     {
//         public List<UserPreference> GetAllUserPreferences()
//         {
//             try
//             {
//                 var connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
//                 log.LogInformation(connectionString);
//                 using (SqlConnection connection = new SqlConnection(connectionString))
//                 {
//                     connection.Open();
//                     var fetchQuery = @$"Select * from [dbo].[UserGridViews] where EmailID='{EmailId}'";
//                     SqlCommand queryCommand = new SqlCommand(fetchQuery, connection);

//                     var reader = await queryCommand.ExecuteReaderAsync();
//                     while (reader.Read())
//                     {
//                         log.LogInformation("C# HTTP trigger function processed a request.1");
//                         UserPreference _userview = new UserPreference
//                         {
//                             EmailId = reader["EmailId"].ToString(),
//                             GridConfig = reader["UserPreference"].ToString()

//                         };
//                         viewList.Add(_userview);

//                     }
//                     connection.Close();

//                 }
//             }
//             catch (System.Exception e)
//             {
//                 ErrorMessage _error = new ErrorMessage
//                 {
//                     Status = 0,
//                     Message = "Server error has occured, Failed"
//                 };

//                 log.LogError(e.ToString());
//                 return new OkObjectResult(_error);
//             }
//         }
//     }
// }