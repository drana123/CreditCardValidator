using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace FrontendAPIFunctionApp.Interfaces
{
    public interface IDatabaseConnector
    {
        void openConnection();
        Task<IDataReader> runQueryAsync(string query);
        void closeConnection();
    }
}