using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeviceFaker.Context;
using DeviceFaker.Models;

namespace DeviceFaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesDatasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DevicesDatasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/DevicesDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DevicesData>>> GetDevicesData()
        {
          if (_context.DevicesData == null)
          {
              return NotFound();
          }
            return await _context.DevicesData.ToListAsync();
        }

        // GET: api/DevicesDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DevicesData>> GetDevicesData(int id)
        {
          if (_context.DevicesData == null)
          {
              return NotFound();
          }
            var devicesData = await _context.DevicesData.FindAsync(id);

            if (devicesData == null)
            {
                return NotFound();
            }

            return devicesData;
        }

        // PUT: api/DevicesDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDevicesData(int id, DevicesData devicesData)
        {
            if (id != devicesData.Id)
            {
                return BadRequest();
            }

            _context.Entry(devicesData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DevicesDataExists(id))
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

        // POST: api/DevicesDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DevicesData>> PostDevicesData(DevicesData devicesData)
        {
          if (_context.DevicesData == null)
          {
              return Problem("Entity set 'AppDbContext.DevicesData'  is null.");
          }
            _context.DevicesData.Add(devicesData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDevicesData", new { id = devicesData.Id }, devicesData);
        }

        // DELETE: api/DevicesDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevicesData(int id)
        {
            if (_context.DevicesData == null)
            {
                return NotFound();
            }
            var devicesData = await _context.DevicesData.FindAsync(id);
            if (devicesData == null)
            {
                return NotFound();
            }

            _context.DevicesData.Remove(devicesData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DevicesDataExists(int id)
        {
            return (_context.DevicesData?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
