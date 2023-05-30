using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class DsoNews
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string Priority { get; set; }
    }
}
