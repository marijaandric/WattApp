using backend.Context;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

namespace backend.Helpers
{
    public static class Check
    {
        public static Task<bool> ChecEmail(string email, AppDbContext _context)
        { 
            return _context.Users.AnyAsync(x => x.Email == email);
        }
        public static string CheckPasswordStrength(string password, AppDbContext _context)
        {
            StringBuilder sb = new StringBuilder();
            if(password.Length < 8)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if(!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric, with at least one caps" + Environment.NewLine);
            if (!Regex.IsMatch(password, @"[\W_]"))
                sb.Append("Password should have at least one special character!" + Environment.NewLine);
            return sb.ToString();
        }
    }
}
