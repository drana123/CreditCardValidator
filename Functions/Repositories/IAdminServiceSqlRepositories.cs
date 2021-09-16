using System.Threading.Tasks;
using FrontendAPIFunctionApp.Models;
using System.Collections.Generic;

namespace FrontendAPIFunctionApp.Repositories
{
    public interface IAdminServiceSqlRepository
    {
        Task<APIConfiguration> GetLatestApiConfiguration();
        Task<List<UserPreference>> GetSomeUserPreferences(string s);
    }
}