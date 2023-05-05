namespace backend.Models.DTOs
{
    public class ResetPasswordDTO
    {
        public string Email { get; set; }
        public string EmailToken { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set;}
    }
}
