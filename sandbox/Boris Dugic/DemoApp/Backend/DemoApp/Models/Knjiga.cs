using System.ComponentModel.DataAnnotations;

namespace DemoApp.Models
{
    public class Knjiga
    {
        [Key]
        public Guid Id { get; set; }
        public string Naslov { get; set; } = string.Empty;
        public string Pisac { get; set; } = string.Empty;
        public int brojStrana { get; set; }
        public int cena { get; set; }
    }
}
