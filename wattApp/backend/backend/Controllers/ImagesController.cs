using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.BLL.Interfaces;
using backend.Models.DTOs;
using backend.BAL.Interfaces;
using System.Collections.Generic;
using backend.Context;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ImagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Images>>> GetImages()
        {
            return await _context.Images.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Images>> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }

        [HttpPost("user/{id}")]
        public async Task<ActionResult<Images>> AddUserImage(int id, IFormFile file)
        {
            if (file == null || file.Length > 2000000)
            {
                return BadRequest("Invalid file");
            }

            byte[] imageData;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                imageData = memoryStream.ToArray();
            }

            Images image = new Images
            {
                Name = file.FileName,
                ContentType = file.ContentType,
                Data = imageData
            };
            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            User user = _context.Users.Find(id);
            user.ImageId = image.Id;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUserImage(int id)
        {
            User user = await _context.Users.FindAsync(id);
            if (user == null || user.ImageId == null)
            {
                return NoContent();
            }

            Images image = await _context.Images.FindAsync(user.ImageId);
            if (image == null)
            {
                return NoContent();
            }

            return File(image.Data, image.ContentType);
        }

        [HttpDelete("user/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            User user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var imageId = user.ImageId;
            user.ImageId = null;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            Images image = await _context.Images.FindAsync(imageId);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
