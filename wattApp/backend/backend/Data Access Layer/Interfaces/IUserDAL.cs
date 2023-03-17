using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Data_Access_Layer.Interfaces
{
    public interface IUserDAL
    {
        public List<User> getUsers();
        public User getUser(int id);
        public User getUserByEmail(string email);
        public bool userExists(int id);
        public bool emailExists(string email);
        public IActionResult updateUser(int id, User user);
        public IActionResult deleteUser(int id);
        public IActionResult addUser(User userObj);

    }
}
