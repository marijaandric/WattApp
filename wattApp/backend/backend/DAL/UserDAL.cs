﻿using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

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

        public IActionResult deleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return new StatusCodeResult(404);
            }

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

    }
}