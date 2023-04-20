using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.BLL.Interfaces;
using backend.Models.DTOs;

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

        // GET: api/Devices/type
        [HttpGet("type/{deviceType}")]
        public List<Devices> GetDevicesByType(string deviceType)
        {
            return _context.GetDevicesByType(deviceType);
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
        [HttpGet("getNumberOfUserDevices/{userId}")]
        public int GetNumberOfUserDevices(int userId)
        {
            var devices = _context.GetDevicesForUser(userId);

            if (devices == null)
            {
                return 0;
            }

            return devices.Count;
        }

        [HttpGet("getNumberOfActiveUserDevices/{userId}")]
        public int GetNumberOfActiveUserDevices(int userId)
        {
            int result = _context.GetNumberOfActiveUserDevices(userId);

            return result;
        }

        [HttpGet("getNumberOfDevicesForUserThatDSOCanSee/{userId}")]
        public int GetNumberOfDevicesForUserThatDSOCanSee(int userId)
        {
            int result = _context.GetNumberOfDevicesForUserThatDSOCanSee(userId);

            return result;
        }

        [HttpGet("getNumberOfDevicesForUserThatDSOCanManage/{userId}")]
        public int GetNumberOfDevicesForUserThatDSOCanManage(int userId)
        {
            int result = _context.GetNumberOfDevicesForUserThatDSOCanManage(userId);

            return result;
        }

        // GET: api/Devices/device/5
        // actual ID
        [HttpGet("device/{id}")]
        public Devices GetDeviceById(int id)
        {
            return _context.GetDevice(id);
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

        [HttpGet("tableContent/{userId}/{year}/{month}/{day}/{time}/{type}")]
        public List<BigTableContent> GetTableContent(int userId, int year, int month, int day, int time, string type)
        {
            return _context.GetTableContent(userId, year, month, day, time, type);

        }

        [HttpGet("chart/{userId}/{type}/{limit}")]
        public IActionResult GetTableContent(int userId, string type, int limit)
        {
            var result = _context.GetDevicesCountByType(userId, type, limit);
            return Ok(
                    new
                    {
                        Rooms = result.Item1,
                        Count = result.Item2
                    }

                );

        }

        [HttpGet("currentMonthAllUsersDevicesUsage/{deviceType}")]
        public IActionResult currentMonthAllUsersDevicesUsage(string deviceType)
        {
            double result = _context.currentMonthAllUsersDevicesUsage(deviceType);
            return Ok(new
            {
                Usage = result
            });
        }

        [HttpGet("getTotalUsageByArea/{area}/{type}/{timeType}")]
        public IActionResult getTotalUsageByArea(string area, string type, string timeType)
        {

            var result = _context.getTotalUsageByArea(area, type, timeType);

            return Ok(
                new
                {
                    Area = area,
                    Type = type,
                    Usage = result
                });
        }

        [HttpGet("getExtremeUsageForAreas/{type}/{timeType}/{minmax}")]
        public IActionResult getExtremeUsageForAreas(string type, string timeType, string minmax)
        {

            var result = _context.getExtremeUsageForAreas(type, timeType, minmax);

            return Ok(
                new
                {
                    Area = result.Item1,
                    Usage = result.Item2
                });
        }

        [HttpGet("getHistoryAndForecastByDayForDevice/{deviceid}")]
        public IActionResult getHistoryAndForecastByDayForDevice(int deviceid)
        {
            var result = _context.GetWeekByDayHistoryAndFutureForDevice(deviceid);
            return Ok(result);
        }

        [HttpGet("getHistoryAndForecastByDayForAllDevices")]
        public IActionResult getHistoryAndForecastByDayForAllDevices()
        {
            var result = _context.GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(-1);
            return Ok(result);
        }

        [HttpGet("getHistoryAndForecastByDayForAllUserDevices/{userid}")]
        public IActionResult getHistoryAndForecastByDayForAllUserDevices(int userid)
        {
            var result = _context.GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(userid);
            return Ok(result);
        }

        [HttpGet("getMonthlyPowerUsageAndProduceOfUser/{userid}/{year}/{month}")]
        public IActionResult GetMonthlyPowerUsageAndProduceOfUser(int userid, int year, int month)
        {
            List<double> result = _context.GetMonthlyPowerUsageAndProduceOfUser(userid, year, month);
            return Ok(
                new
                {
                    consumed = result[0],
                    produced = result[1],
                    stocked = result[2]
                });
        }

        [HttpGet("getUserDevicesVisibleForDSO/{userid}")]
        public IActionResult GetUserDevicesVisibleForDSO(int userid)
        {
            List<Devices> result = _context.GetUserDevicesVisibleForDSO(userid);
            return Ok(result);
        }


        [HttpGet("price")]
        public double getElectricalPowerPrice()
        {
            Random random = new Random();
            double randomNumber = random.NextDouble();
            double result = 20 + (randomNumber % 5);
            return Math.Round(result, 2);
        }
    }
}
