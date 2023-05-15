namespace DeviceFaker.Models.DTOs
{
    public class UsageDTO
    {
        public int deviceID { get; set; }
        public int day { get; set; }
        public int month { get; set; }
        public int year { get; set; }
        public int time { get; set; }
        public double usage { get; set; }
    }
}
