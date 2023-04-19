using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Images
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public byte[] Data { get; set; }

        public int? DeviceId { get; set; }
        public Devices Device { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }
    }
}
