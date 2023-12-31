﻿using backend.BAL.Interfaces;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using SQLitePCL;
using backend.Models.DTOs;
using System.Net.Mail;
using System.Net;
using MimeKit;
using Org.BouncyCastle.Crypto.Macs;
using SendGrid.Helpers.Mail;
using System.Diagnostics;
using SendGrid;
using Org.BouncyCastle.Utilities.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using NuGet.Protocol;
using Microsoft.AspNetCore.Identity;

namespace backend.BAL
{
    public class UserBL : IUserBL
    {
        private readonly IUserDAL _contextDAL;
        private readonly IConfiguration _configuration;

        public UserBL(IUserDAL context,IConfiguration _configuration)
        {
            _contextDAL = context;
            this._configuration = _configuration;
        }

        public User authenticateUser(User userObj)
        {
            if (userObj == null)
                return null;

            var user = _contextDAL.getUserByEmail(userObj.Email);

            if (user == null)
                return null;

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
                return null;

            user.Token = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
            _contextDAL.SaveChanges();

            return user;
        }

        public IActionResult deleteUser(int id)
        {
            return _contextDAL.deleteUser(id);
        }

        public Dictionary<string, int> GetNumberOfUsersByType()
        {
            Dictionary<string, int> users = new Dictionary<string, int>();
            users.Add("All", _contextDAL.GetNumberOfUsersByType("all"));
            users.Add("Prosumer", _contextDAL.GetNumberOfUsersByType("prosumer"));
            users.Add("Operator", _contextDAL.GetNumberOfUsersByType("operator"));
            users.Add("Admin", _contextDAL.GetNumberOfUsersByType("admin"));
            return users;
        }

        public User getUser(int id)
        {
            return _contextDAL.getUser(id);
        }

        public List<User> getUsers()
        {
            return _contextDAL.getUsers();
        }

        public List<User> GetUsersByType(string type)
        {
            return _contextDAL.GetUsersByType(type);
        }

        public List<User> GetUsersPaginationByRole(string type, int page, int limit)
        {
            List<User> users = _contextDAL.GetUsersByType(type);
            List<User> result = new List<User>();

            for(int i = page * limit; i < (page + 1) * limit && i < users.Count; i++)
                result.Add(users[i]);
            return result;
        }

        public TokenApiDto refreshToken(TokenApiDto tokenApiDto)
        {
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;

            var principal = GetPrincipalFromExpiredToken(accessToken);

            var username = principal.Identity.Name;

            var user = _contextDAL.getUserByUsername(username);

            if(user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return null;

            var newAccessToken = CreateJwt(user);
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            _contextDAL.SaveChanges();

            return new TokenApiDto { AccessToken = newAccessToken, RefreshToken = newRefreshToken };
        }

        public IActionResult registerUser(User userObj)
        {
            userObj.Password = GenerateRandomPassword();
            //check email
            if (_contextDAL.emailExists(userObj.Email))
                return new StatusCodeResult(404);

            var pass = Check.CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return new StatusCodeResult(404);

            string psw = userObj.Password;
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            userObj.ResetPasswordExpiryTime = DateTime.Now.AddDays(15);
            userObj.ResetPasswordToken = emailToken;
            SendEmailAsync(userObj.Email, "CodeSpark Energy", "Hi, "+ userObj.FirstName + "\nThis is your password: "+ psw + "\nYou can change your password in our application at any time. Your password is unique and only you can know it.\r\nThe link that leads to our application login is: http://softeng.pmg.kg.ac.rs:10011/login\r\nIf you want to reset your password immediately, you can do so by clicking on the following link:http://softeng.pmg.kg.ac.rs:10011/reset?email=" + userObj.Email + "&code=" + emailToken + "\nDo not forget that the password should have at least 8 letters, at least one uppercase letter, at least one lowercase letter, a special character and a number\nThank you for your trust! Enjoy using the application!\r\n\r\nSincerely, CodeSpark Energy");
            return _contextDAL.addUser(userObj);
        }

        public void SendEmailAsync(string toemail, string subject, string message)
        {
            using SmtpClient email = new SmtpClient
            {
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                EnableSsl = true,
                Host = "smtp.gmail.com",
                Port = 587,
                Credentials = new NetworkCredential("dsosikg@gmail.com", "zlxrnjbacpibdhgu")
            };

            try
            {
                email.Send("marijaandric2001@gmail.com", toemail, subject, message);
            }
            catch(Exception e)
            {
                Console.WriteLine("Greska : " + e);
            }

        }


        public string GenerateRandomPassword()
        {
            const string uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
            const string numbers = "0123456789"; 
            const string specialCharacters = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
            const string allChars = uppercaseLetters + lowercaseLetters + numbers;

            var random = new Random();
            var passwordBuilder = new StringBuilder();

            passwordBuilder.Append(uppercaseLetters[random.Next(uppercaseLetters.Length)]);

            passwordBuilder.Append(lowercaseLetters[random.Next(lowercaseLetters.Length)]);

            passwordBuilder.Append(numbers[random.Next(numbers.Length)]);

            passwordBuilder.Append(specialCharacters[random.Next(specialCharacters.Length)]);

            // Add remaining characters
            for (int i = 0; i < 7; i++) 
            {
                passwordBuilder.Append(allChars[random.Next(allChars.Length)]);
            }

            Console.WriteLine(passwordBuilder.ToString());
            return passwordBuilder.ToString();
        }

        public IActionResult updateUser(int id, User user)
        {
            return _contextDAL.updateUser(id, user);
        }

        public bool userExists(int id)
        {
            return _contextDAL.userExists(id);
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.......");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Username}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _contextDAL.refreshTokenExists(refreshToken);

            if (tokenInUser)
                return CreateRefreshToken();
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("veryverysecret.......");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false

            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("This is invalid token");

            return principal;
        }

        public IActionResult ResetPasswordEmail(string email)
        {
            var user = _contextDAL.getUserByEmail(email);

            if(user is null)
            {
                return new StatusCodeResult(404);
            }

            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordExpiryTime = DateTime.Now.AddMinutes(15);
            user.ResetPasswordToken = emailToken;
            SendEmailAsync(email, "ResetPassword", "You are receiving this email because you requested a password reset for your  WattApp account.\nBy clicking the button below, you will be able to reset your password\nhttp://localhost:4200/reset?email=" + email+"&code="+emailToken+ "\n\nKind Regards,\n\nCodeSpark Energy") ;
            return _contextDAL.ResetPasswordEmail(user);

        }

        public IActionResult ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var newToken = resetPasswordDTO.EmailToken.Replace(" ", "+");
            var user = _contextDAL.getUserByEmail(resetPasswordDTO.Email);
            if (user is null)
            {
                Console.WriteLine("USLO3");
                return new StatusCodeResult(404);
            }
            var tokenCode = user.ResetPasswordToken;
            DateTime emailTokenExpiry = user.ResetPasswordExpiryTime;

            if(tokenCode != resetPasswordDTO.EmailToken || emailTokenExpiry < DateTime.Now)
            {
                Console.WriteLine("USLO2");
                return new StatusCodeResult(404);
            }

            user.Password = PasswordHasher.HashPassword(resetPasswordDTO.NewPassword);
            return _contextDAL.ResetPassword(user);


        }

        public IActionResult UpdateUserTheme(int userId)
        {
            User user = _contextDAL.getUser(userId);
            if (user == null)
            {
                return new StatusCodeResult(404);
            }
            user.isDarkTheme = !user.isDarkTheme;
            return _contextDAL.updateUser(user.Id,user);
        }

        public IActionResult ChangePassword(int id,string currentPassword, string newPassword)
        {
            var user = _contextDAL.getUser(id);

            if(user == null)
            {
                return new StatusCodeResult(404);
            }
            var pass = Check.CheckPasswordStrength(newPassword);
            if (!string.IsNullOrEmpty(pass))
                return new StatusCodeResult(404);

            if(PasswordHasher.VerifyPassword(currentPassword,user.Password))
            {
                user.Password = PasswordHasher.HashPassword(newPassword);
                return _contextDAL.updateUser(id,user);
            }
            else
            {
                Console.WriteLine(user.Password);
                Console.WriteLine(currentPassword);
                return new StatusCodeResult(404);
            }
        }

        public List<string> GetAreas()
        {
           return _contextDAL.GetAreas();
        }

        public Dictionary<string, int> GetNumberOfUsersByArea()
        {
            Dictionary<string, int> total = new Dictionary<string, int>();

            List<string> areas = GetAreas();

            if(areas == null)
                return null;

            foreach(var area in areas)
            {
                total.Add(area, _contextDAL.GetUsersByArea(area).Count);
            }

            return total;
        }

        public void SendEmailContactUs(string fromemail, string name, string subject, string message)
        {
            // Set up the SMTP client
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587); // Replace with your SMTP server details
            smtpClient.EnableSsl = true; // Set to true if your SMTP server requires SSL
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("dsosikg@gmail.com", "zlxrnjbacpibdhgu"); // Replace with your SMTP server credentials

            // Set up the email message
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(fromemail, name);
            mailMessage.To.Add("dsosikg@gmail.com"); // Replace with the recipient's email address
            mailMessage.Subject = subject;
            mailMessage.Body = message + "\n" + "email: " + fromemail;

            // Send the email
            smtpClient.Send(mailMessage);
        }
    }
}
