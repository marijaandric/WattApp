using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DeviceFaker.Models
{
    public class Devices
    {
        [Key]
        public int Id { get; set; }
        public int DeviceID { get; set; }
        public int UserID { get; set; }
        public string DeviceName { get; set; }
        public string Room { get; set; }
        public string DeviceType { get; set; }
    }
}
