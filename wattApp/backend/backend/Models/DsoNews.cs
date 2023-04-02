using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class DsoNews
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public string Priority { get; set; }
    }
}
