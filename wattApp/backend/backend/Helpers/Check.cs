using System.Text;
using System.Text.RegularExpressions;

namespace backend.Helpers
{
    public static class Check
    {
        public static string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if(password.Length < 8)
                sb.Append("Minimum password length should be 8\n");
            if(!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric, with at least one caps\n");
            if (!Regex.IsMatch(password, @"[\W_]"))
                sb.Append("Password should have at least one special character!\n");
            return sb.ToString();
        }
    }
}
