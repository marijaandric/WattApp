namespace backend.Models.DTOs
{
    public class UserWithPowerUsageDTO
    {
        public User user { get; set; }
        public double consumption { get; set; }
        public double production { get; set; }
        public double stock { get; set; }
    }
}
