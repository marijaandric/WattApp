using backend.Data_Access_Layer;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Bussiness_Logic_Layer.Interfaces
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
    }
}
