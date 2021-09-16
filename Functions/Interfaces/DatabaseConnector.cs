using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace FrontendAPIFunctionApp.Interfaces
{
    public class DatabaseConnector : IDatabaseConnector
    {
        private string connectionString;
        private SqlConnection Connection { get; set; }
        private SqlCommand Command { get; set; }

        public DatabaseConnector()
        {
            this.connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
        }

        public void openConnection()
        {
            this.Connection = new SqlConnection(this.connectionString);
            this.Connection.Open();
        }

        public async Task<IDataReader> runQueryAsync(string query)
        {
            this.Command = new SqlCommand(query, this.Connection);
            SqlDataReader reader = await this.Command.ExecuteReaderAsync();
            return reader;
        }

        public void closeConnection()
        {
            this.Connection.Close();
        }
    }
}