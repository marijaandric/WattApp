using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserDbContext _logger;
        private static int counter = 200;
        public UsersController(UserDbContext logger)
        {
            _logger = logger;
        }

        //Get all users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _logger.Users.ToListAsync();
            return Ok(users);
        }

        //Get single user
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetUser")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await _logger.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(user != null)
                return Ok(user);
            
            return NotFound("User not found");
        }

        //Add user
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            user.Id = Guid.NewGuid();
            await _logger.Users.AddAsync(user);
            await _logger.SaveChangesAsync();
        
            return CreatedAtAction(nameof(GetUser), new { id = user.Id } , user);
        }

        //Update user
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id, [FromBody] User user)
        {
            var existingUser = await _logger.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(existingUser != null)
            {
                existingUser.UserName = user.UserName;
                existingUser.Age = user.Age;
                existingUser.Role = user.Role;
                await _logger.SaveChangesAsync();
                return Ok(existingUser);
            }
            
            return NotFound("User not found");
        }

        //Delete user
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            var existingUser = await _logger.Users.FirstOrDefaultAsync(x => x.Id == id);
            if(existingUser != null)
            {
                _logger.Remove(existingUser);
                await _logger.SaveChangesAsync();
                return Ok(existingUser);
            }
            
            return NotFound("User not found");
        }
    }
}