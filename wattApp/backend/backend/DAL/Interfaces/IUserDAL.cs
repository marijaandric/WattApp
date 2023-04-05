using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.DAL.Interfaces
{
    public interface IUserDAL
    {
        public List<User> getUsers();
        public User getUser(int id);
        public User getUserByEmail(string email);
        public User getUserByUsername(string username);
        public bool userExists(int id);
        public bool emailExists(string email);
        public bool refreshTokenExists(string refreshToken);
        public IActionResult updateUser(int id, User user);
        public IActionResult deleteUser(int id);
        public IActionResult addUser(User userObj);
        public void SaveChanges();
        List<User> GetUsersByArea(string area);
    }
}
