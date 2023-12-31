﻿using backend.Models;
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
        public List<string> GetAreas();
        public void SaveChanges();
        public List<User> GetUsersByArea(string area);
        public List<User> GetUsersByType(string type);
        public List<User> GetAllUsersPagination(int page, int limit);
        public int GetNumberOfUsersByType(string type);
        public IActionResult ResetPasswordEmail(User user);
        public IActionResult ResetPassword(User user);
        public List<User> GetProsumersByArea(string area);
    }
}
