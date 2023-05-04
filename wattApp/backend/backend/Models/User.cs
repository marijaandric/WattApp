using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string Area { get; set; }
        public int? ImageId { get; set; }
        public string? ResetPasswordToken { get; set; }
        public DateTime ResetPasswordExpiryTime { get; set; }
        public Boolean isDarkTheme { get; set; }
    }
}
