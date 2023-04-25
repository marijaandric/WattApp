using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeviceFaker.Models;
using DeviceFaker.Services;
using MongoDB.Driver.Core.Misc;
using Microsoft.AspNetCore.Http.HttpResults;
using DeviceFaker.Models.DTOs;

namespace DeviceFaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesDatasController : ControllerBase
    {
        private readonly DevicesDataService _devicesDataService;

        public DevicesDatasController(DevicesDataService devicesDataService)
        {
            _devicesDataService = devicesDataService;
        }

        // GET: api/DevicesDatas/5/2023/9/19/13:00:00
        [HttpGet("{id}/{year}/{month}/{day}/{time}")]
        public DevicesData GetDevicesDataByIdDateTime(int id, int year, int month, int day, int time)
        {
           
            var devicesData = _devicesDataService.GetDevicesDataByIdDateTime(id, year, month, day, time);

            return devicesData;
        }

        // GET: api/DevicesDatas/5/2023/9/19
        [HttpGet("{id}/{year}/{month}/{day}")]
        public List<DevicesData> GetDevicesDataByIdDate(int id, int year, int month, int day)
        {
           
            var devicesData = _devicesDataService.GetDevicesDataByIdDate(id, year, month, day);

            return devicesData;
        }

        // GET: api/DevicesDatas/5/2023/9
        [HttpGet("{id}/{year}/{month}")]
        public List<DevicesData> GetDevicesDataByIdYearMonth(int id, int year, int month)
        {
            var devicesData = _devicesDataService.GetDevicesDataByIdYearMonth(id, year, month);

            return devicesData;
        }

        // GET: api/DevicesDatas/5/2023/9
        [HttpGet("{id}/{year}")]
        public List<DevicesData> GetDevicesDataByIdYearMonth(int id, int year)
        {
            var devicesData = _devicesDataService.GetDevicesDataByIdYear(id, year);

            return devicesData;
        }

        // GET: api/DevicesDatas/5/2023/9
        [HttpGet("{id}")]
        public List<DevicesData> GetDevicesDataById(int id)
        {
            var devicesData = _devicesDataService.GetDevicesDataById(id);

            return devicesData;
        }

        [HttpGet("GetMonthDataForAllDevices/{year}/{month}")]
        public List<DevicesData> GetMonthDataForAllDevices(int year, int month)
        {
            var devicesData = _devicesDataService.GetMonthDataForAllDevices(year, month);
            return devicesData;
        }

        [HttpPost("GetWeekByDayHistoryAndFutureForDevice/{year}/{month}/{day}")]
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForDevice([FromBody] List<int> devicesids, int year, int month, int day)
        {
            var result =  _devicesDataService.GetWeekByDayHistoryAndFutureForAllDevicesOrDevice(devicesids, year, month, day);
            return result;
        }

        [HttpPost("getMonthPoweUsageOfDevices/{year}/{month}")]
        public List<UsageDTO> GetMonthPowerUsageOfDevices([FromBody] List<int> ids, int year, int month)
        {
            var result = _devicesDataService.GetMonthPowerUsageOfDevices(ids, year, month);
            return result;
        }

        [HttpPost("getDayPoweUsageOfDevices/{year}/{month}/{day}")]
        public List<UsageDTO> GetDayPowerUsageOfDevices([FromBody] List<int> ids, int year, int month, int day)
        {
            var result = _devicesDataService.GetDayPowerUsageOfDevices(ids, year, month, day);
            return result;
        }


    }
}
