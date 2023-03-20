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

        // GET: api/DevicesDatas/5
        [HttpGet("{id}/{year}/{month}/{day}/{time}")]
        public List<DevicesData> GetDevicesDataByIdDateTime(int id, int year, int month, int day, string time)
        {
            if (_context.DevicesData == null)
            {
                return null;
            }

            var devicesData = _context.DevicesData.Where(e => e.DeviceID == id && e.Year == year && e.Month == month &&  e.Day == day && e.Time == time).ToList();

            if (devicesData == null)
            {
                return null;
            }

            return devicesData;
        }

        // GET: api/DevicesDatas/5
        [HttpGet("{id}/{year}/{month}/{day}")]
        public List<DevicesData> GetDevicesDataByIdDate(int id, int year, int month, int day)
        {
            if (_context.DevicesData == null)
            {
                return null;
            }

            var devicesData = _context.DevicesData.Where(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day).ToList();

            if (devicesData == null)
            {
                return null;
            }

            return devicesData;
        }

        // GET: api/DevicesDatas/5
        [HttpGet("{id}/{year}/{month}")]
        public List<DevicesData> GetDevicesDataByIdYearMonth(int id, int year, int month)
        {
            if (_context.DevicesData == null)
            {
                return null;
            }

            var devicesData = _context.DevicesData.Where(e => e.DeviceID == id && e.Year == year && e.Month == month).ToList();

            if (devicesData == null)
            {
                return null;
            }

            return devicesData;
        }

        private bool DevicesDataExists(int id)
        {
            return (_context.DevicesData?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
