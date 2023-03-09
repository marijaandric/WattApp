namespace DemoApplication.Domain.Entities
{
    public class User
    {
        public int id { get; set; }
        public string username { get; set; } = string.Empty;
        public string firstName { get; set; } = string.Empty;
        public string lastName { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
    }
}
