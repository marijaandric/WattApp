using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models;
using backend.BLL.Interfaces;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesDatasController : ControllerBase
    {
        private readonly IDevicesDataBL _context;

        public DevicesDatasController(IDevicesDataBL context)
        {
            _context = context;
        }


        // GET: api/DevicesDatas/5
        [HttpGet("{id}")]
        public List<DevicesData> GetAllDataForDevice(int id)
        {
            var devicesData = _context.GetAllDataForDevice(id);

            return devicesData;
        }

        [HttpGet("{id}/{year}")]
        public List<DevicesData> GetYearDataForDevice(int id, int year)
        {
            var devicesData = _context.GetYearDataForDevice(id, year);

            return devicesData;
        }

        [HttpGet("{id}/{year}/{month}")]
        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month)
        {
            var devicesData = _context.GetMonthDataForDevice(id, year, month);

            return null;
        }

        [HttpGet("{id}/{year}/{month}/{day}")]
        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day)
        {
            var devicesData = _context.GetDayDataForDevice(id, year, month, day);

            return devicesData;
        }

        [HttpGet("{id}/{year}/{month}/{day}/{time}")]
        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, string time)
        {
            var devicesData = _context.GetHourDataForDevice(id, year, month, day, time);

            return devicesData;
        }

    }
}
