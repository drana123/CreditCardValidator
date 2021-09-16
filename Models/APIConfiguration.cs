namespace FrontendAPIFunctionApp.Models
{
    public class APIConfiguration
    {
        public int ApiEndpointId { get; set; }
        public string ApiEndpointUrl { get; set; }
        public string Headers { get; set; }
        public string Parameters { get; set; }
        public string Frequency { get; set; }
    }
}