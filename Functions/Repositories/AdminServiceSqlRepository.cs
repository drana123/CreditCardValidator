using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using FrontendAPIFunctionApp.Interfaces;
using FrontendAPIFunctionApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace FrontendAPIFunctionApp.Repositories
{
    public class AdminServiceSqlRepository : IAdminServiceSqlRepository
    {
        private IDatabaseConnector connector;

        public AdminServiceSqlRepository(IDatabaseConnector connector)
        {
            this.connector = connector;
        }

        public async Task<APIConfiguration> GetLatestApiConfiguration()
        {
            APIConfiguration config = default(APIConfiguration);

            try
            {
                this.connector.openConnection();
                string query = @"SELECT * FROM [dbo].[ApiEndpoints]";
                var reader = await this.connector.runQueryAsync(query);

                while (reader.Read())
                {
                    config = new APIConfiguration
                    {
                        ApiEndpointId = int.Parse(reader["id"].ToString()),
                        ApiEndpointUrl = reader["api_endpoint_url"].ToString(),
                        Headers = reader["headers"].ToString(),
                        Parameters = reader["paramters"].ToString(),
                        Frequency = reader["scheduling_frequency"].ToString()
                    };
                }
                this.connector.closeConnection();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return config;
        }

        public async Task<List<UserPreference>> GetSomeUserPreferences(string emailId)
        {
            List<UserPreference> up = new List<UserPreference>();

            try
            {
                this.connector.openConnection();
                var fetchQuery = @$"SELECT * from [dbo].[UserGridViews] where EmailID='{emailId}'";

                var reader = await this.connector.runQueryAsync(fetchQuery);
                while (reader.Read())
                {
                    UserPreference _userview = new UserPreference
                    {
                        EmailId = reader["EmailId"].ToString(),
                        GridConfig = reader["UserPreference"].ToString()

                    };
                    up.Add(_userview);

                }
                this.connector.closeConnection();

            }
            catch (Exception e)
            {
                throw e;
            }

            return up;
        }
    }
}