using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.BLL.Interfaces;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly IDevicesBL _context;

        public DevicesController(IDevicesBL context)
        {
            _context = context;
        }

        // GET: api/Devices
        [HttpGet]
        public List<Devices> GetDevices()
        {
            return _context.GetDevices();
        }

        // GET: api/Devices/5
        [HttpGet("{userId}")]
        public List<Devices> GetDevicesForUser(int userId)
        {
            var devices = _context.GetDevicesForUser(userId);

            if (devices == null)
            {
                return null;
            }

            return devices;
        }

        // GET: api/Devices/5
        [HttpGet("{userId}/{deviceId}")]
        public Devices GetDeviceForUser(int userId, int deviceId)
        {
            var devices = _context.GetDeviceForUser(userId, deviceId);

            if (devices == null)
            {
                return null;
            }

            return devices;
        }

        // PUT: api/Devices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutDevices(int id, Devices device)
        {
            if (id != device.Id)
            {
                return BadRequest();
            }

            _context.ModifiedDevice(device);

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.DevicesExists(id))
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
        public IActionResult PostDevices([FromBody] Devices device)
        {
            _context.AddDevice(device);
            _context.SaveChanges();

            return Ok();
        }

        // DELETE: api/Devices/5
        [HttpDelete("{id}")]
        public IActionResult DeleteDevices(int id)
        {
            var device = _context.GetDevice(id);
            if (device == null)
            {
                return NotFound();
            }

            _context.RemoveDevice(device);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("{userId}/{year}/{month}/{day}/{type}/{size}")]
        public IActionResult GetExrtemeDevice(int userId, int year, int month, int day, string type, string size)
        {
            var result = _context.GetExtremeDevice(userId, year, month, day, type, size);
            return Ok(
                    new
                    {
                        DeviceId = result.Item1,
                        DeviceName = result.Item2,
                        AveragePowerUsage = result.Item3
                    }); ;
        }

        [HttpGet("{userId}/{year}/{month}/{type}")]
        public double GetMonthlyStatistics(int userId, int year, int month, string type)
        {
            return _context.GetMonthlyStatistics(userId, year, month, type);
            
        }


        [HttpGet("price")]
        public double getElectricalPowerPrice()
        {
            Random random = new Random();
            double randomNumber = random.NextDouble();
            double result = 0.2 + randomNumber * 0.05;
            return Math.Round(result, 2);
        }

    }
}
