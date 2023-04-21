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
    }
}
