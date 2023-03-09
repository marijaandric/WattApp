using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // POST - AUTENTIFIKACIJA
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateUser([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

            var user = await _context.Users
                .FirstOrDefaultAsync(x=>x.Email == userObj.Email && x.Password == userObj.Password);
            if(user == null)
                return NotFound(new { Message = "User Not Found!"});

            return Ok(
                new {
                    Message = "Login Success!"
                });
        }

        //POST - REGISTRACIJA
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null || string.IsNullOrEmpty(userObj.Email) || string.IsNullOrEmpty(userObj.Password) || string.IsNullOrEmpty(userObj.FirstName) || string.IsNullOrEmpty(userObj.LastName))
                return BadRequest();
            
            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok( new {Message = "User Registered!"});
        }
        
    }
}
