using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Weather
    {
        [Key]
        public int Id { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int Time { get; set; }
        public float Temperature { get; set; }
        public int CloudCover { get; set; }
    }
}
