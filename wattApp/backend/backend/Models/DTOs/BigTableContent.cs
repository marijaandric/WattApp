namespace backend.Models.DTOs
{
    public class BigTableContent
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int deviceID { get; set; }
        public string Username { get; set; }
        public string DeviceName { get; set; }
        public string DeviceModel { get; set; }
        public string Room { get; set; }
        public string DeviceType { get; set; }
        public bool isActive { get; set; }
        public int day { get; set; }
        public int month { get; set; }
        public int year { get; set; }
        public int time { get; set; }
        public double powerUsage { get; set; }
        
    }
}
