﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models;
using backend.BAL.Interfaces;
using backend.Helpers;
using backend.Models.DTOs;
using backend.BAL;
using Microsoft.AspNetCore.Identity;
using backend.DAL.Interfaces;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _context;
        private readonly UsersPaginationProvider paginationProvider;

        public UserController(IUserBL context, UsersPaginationProvider paginationProvider)
        {
            _context = context;
            this.paginationProvider = paginationProvider;
        }

        [HttpGet]
        public List<User> getUsers()
        {
            List<User> users = _context.getUsers();
            return users;
        }
        // GET: api/proba/5
        [HttpGet("{id}")]
        public User getUser(int id)
        {
            var user = _context.getUser(id);

            if (user == null)
            {
                return null;
            }

            return user;
        }

        // POST - AUTENTIFIKACIJA
        [HttpPost("authenticate")]
        public IActionResult authenticateUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = _context.authenticateUser(userObj);
            if(user == null)
                return BadRequest();
            var newAccessToken = user.Token;

            if (user != null)
                return Ok(
                    new TokenApiDto()
                    {
                        AccessToken = newAccessToken,
                        RefreshToken = user.RefreshToken
                    }
                    );
            return BadRequest();
        }

        //POST - REGISTRACIJA
        [HttpPost("register")]
        public IActionResult registerUser([FromBody] User userObj)
        {
            if (userObj == null || string.IsNullOrEmpty(userObj.Email) || string.IsNullOrEmpty(userObj.Password) || string.IsNullOrEmpty(userObj.FirstName) || string.IsNullOrEmpty(userObj.LastName))
                return BadRequest();
            return _context.registerUser(userObj);
        }

        // DELETE: api/proba/5
        [HttpDelete("{id}")]
        public IActionResult deleteUser(int id)
        {
            return _context.deleteUser(id);
        }

        [HttpPut("{id}")]
        public IActionResult updateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return new StatusCodeResult(404);
            }

            return _context.updateUser(id, user);
        }
        private bool userExists(int id)
        {
            return _context.userExists(id);
        }

        [HttpPost("refresh")]
        public IActionResult refreshToken(TokenApiDto tokenApiDto)
        {
            if (tokenApiDto == null)
                return BadRequest("Invalid Client Request");

            TokenApiDto token = _context.refreshToken(tokenApiDto);
            if (token == null)
                return BadRequest("Invalid request");

            return Ok(token);
        }

        [HttpGet("getUsersByRole/{type}")]
        public List<User> GetUsersByType(string type)
        {
            var users = _context.GetUsersByType(type);

            return users;
        }

        [HttpGet("getUsersPaginationByRole/{type}/{page}/{limit}")]
        public List<User> GetUsersPaginationByRole(string type, int page, int limit)
        {
            var users = _context.GetUsersPaginationByRole(type, page, limit);

            return users;
        }

        [HttpGet("getUsersPaginationByRole/{type}")]
        public int GetUsersCountPaginationByRole(string type)
        {
            return paginationProvider.GetAllUsersByTypeCount(type);

        }

        [HttpGet("getNumberOfUsersByType/")]
        public Dictionary<string, int> GetNumberOfUsersByType()
        {
            var users = _context.GetNumberOfUsersByType();

            return users;
        }

        [HttpGet("getAreas/")]
        public List<string> GetAreas()
        {
            var areas = _context.GetAreas();

            return areas;
        }

        [HttpGet("getNumberOfUsersByArea/")]
        public Dictionary<string, int> GetNumberOfUsersByArea()
        {
            var areas = _context.GetNumberOfUsersByArea();

            return areas;
        }

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> ResetPasswordEmail(string email)
        { 
            if(string.IsNullOrEmpty(email))
            {
                return BadRequest();
            }
            return _context.ResetPasswordEmail(email);
        }

        [HttpPost("reset-email")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            return _context.ResetPassword(resetPasswordDTO);
        }

        [HttpPut("updateUserTheme/{id}")]
        public async Task<IActionResult> UpdateUserTheme(int id)
        {
            return _context.UpdateUserTheme(id);
        }

        [HttpPut("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO cp)
        {
            return _context.ChangePassword(cp.Id,cp.CurrentPassword,cp.NewPassword);
        }

        [HttpPost("contact-us")]
        public async Task<IActionResult> ContactUs(ContactUsDTO cu)
        {
            _context.SendEmailContactUs(cu.Email, cu.Name, cu.Subject, cu.Message);
            return Ok();
        }

    }
}
