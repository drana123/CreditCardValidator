namespace FrontendAPIFunctionApp.Models
{
    public class UserPreferenceInput
    {
        public int Id { get; set; }
        public string EmailId { get; set; }
        public string GridConfig { get; set; }
        public int IsHavingPreference { get; set; }

    }
}