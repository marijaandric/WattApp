using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class DevicesData
    {
        [Key]
        public string id { get; set; }
        public int deviceID { get; set; }
        public int day { get; set; }
        public int month { get; set; }
        public int year { get; set; }
        public int time { get; set; }
        public double powerUsage { get; set; }
    }
}
