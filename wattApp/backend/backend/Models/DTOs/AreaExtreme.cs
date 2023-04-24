namespace backend.Models.DTOs
{
    public class AreaExtreme
    {
        public string Area { get; set; }
        public double Usage { get; set; }

        public AreaExtreme(string Area, double Usage) { 
            this.Area = Area;
            this.Usage = Usage;
        }

    }
}
