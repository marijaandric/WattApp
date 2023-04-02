using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.BLL.Interfaces;
using backend.Models.DTOs;

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
            return _context.GetYearDataForDevice(id, year);

        }

        [HttpGet("{id}/{year}/{month}")]
        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month)
        {
            return _context.GetMonthDataForDevice(id, year, month);

        }

        [HttpGet("{id}/{year}/{month}/{day}")]
        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day)
        {
            return _context.GetDayDataForDevice(id, year, month, day);

        }

        [HttpGet("{id}/{year}/{month}/{day}/{time}")]
        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, int time)
        {
            return _context.GetHourDataForDevice(id, year, month, day, time);

        }

    }
}
