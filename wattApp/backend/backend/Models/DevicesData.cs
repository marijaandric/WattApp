using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class DevicesData
    {
        [Key]
        public string id { get; set; }
        public int deviceID { get; set; }
        public int day { get; set; }
        public int month { get; set; }
        public int year { get; set; }
        public string time { get; set; }
        public double powerUsage { get; set; }
    }
}
