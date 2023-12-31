﻿using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using backend.BAL;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Identity;

namespace backend.DAL
{
    public class UserDAL : IUserDAL
    {
        private readonly AppDbContext _context;
        public UserDAL(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult addUser(User userObj)
        {
            _context.Users.AddAsync(userObj);
            _context.SaveChangesAsync();
            return new StatusCodeResult(200);
        }

        public void SaveChanges()
        {
            _context.SaveChangesAsync();
        }

        public IActionResult deleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return new StatusCodeResult(404);
            }

            List<Devices> devices = _context.Devices.Where(e => e.UserID == id).ToList();

            _context.Devices.RemoveRange(devices);
            _context.Users.Remove(user);
            _context.SaveChangesAsync();

            return new StatusCodeResult(200);
        }

        public bool emailExists(string email)
        {
            return _context.Users.Any(e => e.Email == email);
        }

        public User getUser(int id)
        {
            return _context.Users.Find(id);
        }

        public User getUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }

        public List<User> getUsers()
        {
            return _context.Users.ToList();
        }

        public bool refreshTokenExists(string refreshToken)
        {
            return _context.Users.Any(a => a.RefreshToken == refreshToken);
        }

        public List<string> GetAreas()
        {
            List<User> users = getUsers();

            if (users != null && users.Count != 0)
                return users.Select(d => d.Area).ToList().Distinct().ToList();

            return null;
        }

        public IActionResult updateUser(int id, User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(id))
                {
                    return new StatusCodeResult(404);
                }
                else
                {
                    throw;
                }
            }

            return new StatusCodeResult(204);
        }

        public bool userExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        public User getUserByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public List<User> GetUsersByArea(string area)
        {
            return _context.Users.Where(u => u.Area == area).ToList();
        }

        public List<User> GetUsersByType(string type)
        {
            return _context.Users.Where(e => e.Role == type).ToList();
        }

        public List<User> GetAllUsersPagination( int page, int limit)
        {
            return _context.Users.Where(e => e.Id >= page * limit && e.Id < (page + 1) * limit).ToList();
        }

        public int GetNumberOfUsersByType(string type)
        {
            if(type.ToLower() == "prosumer" || type.ToLower() == "admin" || type.ToLower() == "operator" || type.ToLower() == "superAdmin")
                return _context.Users.Where(x => x.Role == type).Count();
            else
                return _context.Users.Count();

        }

        public IActionResult ResetPasswordEmail(User user)
        {
           _context.Entry(user).State = EntityState.Modified;
            try
            {
                _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(user.Id))
                {
                    return new StatusCodeResult(404);
                }
                else
                {
                    throw;
                }
            }

            return new StatusCodeResult(204);

        }

        public IActionResult ResetPassword(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                Console.WriteLine("USLO");
                if (!userExists(user.Id))
                {
                    return new StatusCodeResult(404);
                }
                else
                {
                    throw;
                }
            }

            return new StatusCodeResult(204);
        }

        public List<User> GetProsumersByArea(string area)
        {
            return _context.Users.Where(u => u.Area == area && u.Role.ToLower() == "prosumer").ToList();
        }
    }
}
