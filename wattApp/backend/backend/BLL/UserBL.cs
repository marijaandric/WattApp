using backend.BAL.Interfaces;
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

namespace backend.BAL
{
    public class UserBL : IUserBL
    {
        private readonly IUserDAL _contextDAL;

        public UserBL(IUserDAL context)
        {
            _contextDAL = context;
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
            users.Add("Other", _contextDAL.GetNumberOfUsersByType("other"));

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
            //check email
            if (_contextDAL.emailExists(userObj.Email))
                return new StatusCodeResult(404);

            var pass = Check.CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return new StatusCodeResult(404);

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";
            return _contextDAL.addUser(userObj);
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

    }
}
