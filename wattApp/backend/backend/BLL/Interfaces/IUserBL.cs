using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.BAL.Interfaces
{
    public interface IUserBL
    {
        public List<User> getUsers();
        public User getUser(int id);
        public bool userExists(int id);
        public IActionResult updateUser(int id, User user);
        public IActionResult deleteUser(int id);
        public User authenticateUser(User userObj);
        public IActionResult registerUser(User userObj);
        public TokenApiDto refreshToken(TokenApiDto tokenApiDto);
        public List<User> GetUsersByType(string type);
        public List<User> GetUsersPaginationByRole(string type, int page, int limit);
    }
}
