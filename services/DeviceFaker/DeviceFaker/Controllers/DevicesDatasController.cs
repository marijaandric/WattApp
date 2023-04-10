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

        [HttpGet("GetWeekDataForAllDevices/{deviceid}/{year}/{month}/{day}")]
        public List<DevicesData> GetWeekDataForAllDevices(int deviceid, int year, int month, int day)
        {
            var devicesData = _devicesDataService.GetWeekDataForAllDevicesOrDevice(deviceid, year, month, day);
            return devicesData;
        }

        [HttpGet("GetWeekDataForAllDevicesInFuture/{deviceid}/{year}/{month}/{day}")]
        public List<DevicesData> GetWeekDataForAllDevicesInFuture(int deviceid, int year, int month, int day)
        {
            var devicesData = _devicesDataService.GetWeekDataForAllDevicesOrDeviceInFuture(deviceid, year, month, day);
            return devicesData;
        }

        [HttpGet("GetWeekHistoryAndFutureForAllDevices/{deviceid}/{year}/{month}/{day}")]
        public List<DevicesData> GetWeekHistoryAndFutureForAllDevices(int deviceid, int year, int month, int day)
        {
            var devicesData = _devicesDataService.GetWeekHistoryAndFutureForAllDevices(deviceid, year, month, day);
            return devicesData;
        }


        [HttpGet("GetWeekByDayHistoryAndFutureForAllDevices/{year}/{month}/{day}")]
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForAllDevices(int year, int month, int day)
        {
            return _devicesDataService.GetWeekByDayHistoryAndFutureForAllDevicesOrDevice(-1, year, month, day);
        }

        [HttpGet("GetWeekByDayHistoryAndFutureForDevice/{deviceid}/{year}/{month}/{day}")]
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForDevice(int deviceid, int year, int month, int day)
        {
            return _devicesDataService.GetWeekByDayHistoryAndFutureForAllDevicesOrDevice(deviceid, year, month, day);
        }

    }
}
