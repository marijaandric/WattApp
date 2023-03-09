using DemoApplication.Domain.Entities;
using DemoApplication.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoApplication.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Context _context;

        public UserController(Context context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _context.User.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> CreateUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return Ok(await _context.User.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User user)
        {
            var dbUser = await _context.User.FindAsync(user.id);

            if(dbUser == null)
            {
                return BadRequest("User not found.");
            }

            dbUser.username = user.username;
            dbUser.firstName = user.firstName;
            dbUser.lastName = user.lastName;
            dbUser.city = user.city;

            await _context.SaveChangesAsync();

            return Ok(await _context.User.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var dbUser = await _context.User.FindAsync(id);

            if (dbUser == null)
            {
                return BadRequest("User not found.");
            }

            _context.User.Remove(dbUser);
            await _context.SaveChangesAsync();

            return Ok(await _context.User.ToListAsync());
        }
    }
}
