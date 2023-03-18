using System.ComponentModel.DataAnnotations;

namespace DeviceFaker.Models
{
    public class DevicesData
    {
        [Key]
        public int Id { get; set; }
        public int DeviceID { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string Time { get; set; }
        public float PowerUsage { get; set; }
    }
}
