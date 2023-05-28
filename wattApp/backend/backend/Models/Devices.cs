using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Devices
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public int FakeID { get; set; }
        public string DeviceName { get; set; }
        public string DeviceModel { get; set; }
        public string Model { get; set; }
        public string Manufacturer { get; set; }
        public string ManufacturingYear { get; set; }
        public float Power { get; set; }
        public string Room { get; set; }
        public string DeviceType { get; set; }
        public bool isActive { get; set; }
        public bool allowOperatorControll { get; set; } = false;
        public bool allowOperatorVisibility { get; set; } = true;
        public int? ImageId { get; set; }
    }
}
