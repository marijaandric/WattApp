using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DsoNewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DsoNewsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/DsoNews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DsoNews>>> GetNews()
        {
            return await _context.News.OrderByDescending(e => e.Created).ToListAsync();
        }

        // GET: api/DsoNews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DsoNews>> GetDsoNews(int id)
        {
            var dsoNews = await _context.News.FindAsync(id);

            if (dsoNews == null)
            {
                return NotFound();
            }

            return dsoNews;
        }


        // POST: api/DsoNews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DsoNews>> PostDsoNews(DsoNews dsoNews)
        {
            _context.News.Add(dsoNews);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDsoNews", new { id = dsoNews.Id }, dsoNews);
        }

        // DELETE: api/DsoNews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDsoNews(int id)
        {
            var dsoNews = await _context.News.FindAsync(id);
            if (dsoNews == null)
            {
                return NotFound();
            }

            _context.News.Remove(dsoNews);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
