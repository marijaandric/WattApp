namespace DeviceFaker.Models.DTOs
{
    public class UsageDTO
    {
        public int DeviceID { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int Time { get; set; }
        public double Usage { get; set; }
    }
}
