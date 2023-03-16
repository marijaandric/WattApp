using backend.Bussiness_Logic_Layer.Interfaces;
using backend.Data_Access_Layer.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;

namespace backend.Bussiness_Logic_Layer
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

            user.Token = Token.CreateJwt(user);
            return user;
        }

        public IActionResult deleteUser(int id)
        {
            return _contextDAL.deleteUser(id);
        }

        public User getUser(int id)
        {
            return _contextDAL.getUser(id);
        }

        public List<User> getUsers()
        {
            return _contextDAL.getUsers();
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
    }
}
