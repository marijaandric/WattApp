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
            return await _context.DsoNews.OrderByDescending(e => e.Created).ToListAsync();
        }

        // GET: api/DsoNews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DsoNews>> GetDsoNews(int id)
        {
            var dsoNews = await _context.DsoNews.FindAsync(id);

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
            _context.DsoNews.Add(dsoNews);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDsoNews", new { id = dsoNews.Id }, dsoNews);
        }

        // DELETE: api/DsoNews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDsoNews(int id)
        {
            var dsoNews = await _context.DsoNews.FindAsync(id);
            if (dsoNews == null)
            {
                return NotFound();
            }

            _context.DsoNews.Remove(dsoNews);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/DsoNews
        [HttpPut("{id}")]
        public IActionResult UpdateDsoNews(int id, DsoNews dsoNews)
        {
            if (id != dsoNews.Id)
            {
                return new StatusCodeResult(404);
            }
            _context.Entry(dsoNews).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!dsoNewsExists(id))
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

        private bool dsoNewsExists(int id)
        {
            DsoNews dn = _context.DsoNews.Find(id);
            if (dn != null)
                return true;
            return false;
        }

    }
}
