using System;
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

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _context;

        public UserController(IUserBL context)
        {
            _context = context;
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

    }
}
