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
    public class DevicesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DevicesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Devices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Devices>>> GetDevices()
        {
            return await _context.Devices.ToListAsync();
        }

        // GET: api/Devices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Devices>> GetDevices(int id)
        {
            var devices = await _context.Devices.FindAsync(id);

            if (devices == null)
            {
                return NotFound();
            }

            return devices;
        }

        // PUT: api/Devices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDevices(int id, Devices devices)
        {
            if (id != devices.Id)
            {
                return BadRequest();
            }

            _context.Entry(devices).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DevicesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Devices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Devices>> PostDevices(Devices devices)
        {
            _context.Devices.Add(devices);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDevices", new { id = devices.Id }, devices);
        }

        // DELETE: api/Devices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevices(int id)
        {
            var devices = await _context.Devices.FindAsync(id);
            if (devices == null)
            {
                return NotFound();
            }

            _context.Devices.Remove(devices);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DevicesExists(int id)
        {
            return _context.Devices.Any(e => e.Id == id);
        }
    }
}
