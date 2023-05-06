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
        private readonly IDevicesAndDevicesData _contextDevicesAndData;

        public DevicesController(IDevicesBL context, IDevicesAndDevicesData contextDevicesAndData)
        {
            _context = context;
            _contextDevicesAndData = contextDevicesAndData;
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

        [HttpGet("user/{userId}/type/{deviceType}")]
        public List<Devices> GetDevicesForUserByType(int userId, string deviceType)
        {
            var devices = _context.GetDevicesForUserByType(userId, deviceType);

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

        [HttpGet("getNumberOfDevicesByType/{userId}")]
        public Dictionary<string, int> GetNumberOfDevicesByType(int userId)
        {
            var result = _context.GetNumberOfDevicesByType(userId);

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

        


        [HttpGet("getUserDevicesVisibleForDSO/{userid}")]
        public IActionResult GetUserDevicesVisibleForDSO(int userid)
        {
            List<Devices> result = _context.GetUserDevicesVisibleForDSO(userid);
            return Ok(result);
        }

        [HttpGet("chart/{userId}/{type}/{limit}")]
        public IActionResult GetTableContent(int userId, string type, int limit)
        {
            var result = _context.GetDevicesCountByType(userId, type, limit);
            return Ok(
                    new
                    {
                        Rooms = result.rooms,
                        Count = result.count
                    }

                );

        }

        [HttpGet("price")]
        public double getElectricalPowerPrice()
        {
            Random random = new Random();
            double randomNumber = random.NextDouble();
            double result = 20 + (randomNumber % 5);
            return Math.Round(result, 2);
        }



        //DEVICES AND DATAS



        [HttpGet("{userId}/{year}/{month}/{day}/{type}/{size}")]
        public IActionResult GetExrtemeDevice(int userId, int year, int month, int day, string type, string size)
        {
            ExtremeDeviceDTO result = _contextDevicesAndData.GetExtremeDevice(userId, year, month, day, type, size);
            if (result == null || result.DeviceName == "")
            {
                return BadRequest();
            }
            return Ok(
                    new
                    {
                        DeviceId = result.DeviceID,
                        DeviceName = result.DeviceName,
                        AveragePowerUsage = result.Usage
                    }); ;
        }

        [HttpGet("{userId}/{year}/{month}/{type}")]
        public double GetMonthlyStatistics(int userId, int year, int month, string type)
        {
            return _contextDevicesAndData.GetMonthlyStatistics(userId, year, month, type);

        }

        [HttpGet("tableContent/{userId}/{year}/{month}/{day}/{time}/{type}")]
        public List<BigTableContent> GetTableContent(int userId, int year, int month, int day, int time, string type)
        {
            return _contextDevicesAndData.GetTableContent(userId, year, month, day, time, type);

        }

        [HttpGet("getTotalUsageByArea/{area}/{devicetype}/{timeType}")]
        public IActionResult getTotalUsageByArea(string area, string devicetype, string timeType)
        {

            var result = _contextDevicesAndData.getTotalUsageByArea(area, devicetype, timeType);

            return Ok(
                new
                {
                    Area = area,
                    Type = devicetype,
                    Usage = result
                });
        }

        [HttpGet("getExtremeUsageForAreas/{devicetype}/{timeType}/{minmax}")]
        public IActionResult getExtremeUsageForAreas(string devicetype, string timeType, string minmax)
        {

            var result = _contextDevicesAndData.getExtremeUsageForAreas(devicetype, timeType, minmax);

            return Ok(
                new
                {
                    Area = result.Area,
                    Usage = result.Usage
                });
        }

        [HttpGet("getHistoryAndForecastByDayForDevice/{deviceid}/{type}")]
        public IActionResult getHistoryAndForecastByDayForDevice(int deviceid, string type)
        {
            var result = _contextDevicesAndData.GetWeekByDayHistoryAndFutureForDevice(deviceid, type);
            return Ok(result);
        }

        [HttpGet("getHistoryAndForecastByDayForAllDevices/{type}")]
        public IActionResult getHistoryAndForecastByDayForAllDevices(string type)
        {
            var result = _contextDevicesAndData.GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(-1, type);
            return Ok(result);
        }

        [HttpGet("getHistoryAndForecastByDayForAllUserDevices/{userid}/{type}")]
        public IActionResult getHistoryAndForecastByDayForAllUserDevices(int userid, string type)
        {
            var result = _contextDevicesAndData.GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(userid, type);
            return Ok(result);
        }

        [HttpGet("getMonthlyPowerUsageAndProduceOfUser/{userid}/{year}/{month}")]
        public IActionResult GetMonthlyPowerUsageAndProduceOfUser(int userid, int year, int month)
        {
            List<double> result = _contextDevicesAndData.GetMonthlyPowerUsageAndProduceOfUser(userid, year, month);
            return Ok(
                new
                {
                    consumed = result[0],
                    produced = result[1],
                    stocked = result[2]
                });
        }

        [HttpGet("currentMonthAllUsersDevicesUsage/{deviceType}")]
        public IActionResult currentMonthAllUsersDevicesUsage(string deviceType)
        {
            double result = _contextDevicesAndData.CurrentMonthAllUsersDevicesUsage(deviceType);
            return Ok(new
            {
                Usage = result
            });
        }

        [HttpGet("getPowerUsageOfDeviceForGivenTime/{deviceid}/{time}")]
        public IActionResult GetPowerUsageOfDeviceForGivenTime(int deviceid, string time)
        {
            var result = _contextDevicesAndData.GetPowerUsageOfDeviceForGivenTime(deviceid, time);
            return Ok(result);
        }

        [HttpGet("getMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType/{deviceType}/{timeType}")]
        public IActionResult GetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType(string deviceType, string timeType)
        {
            var result = _contextDevicesAndData.GetMaxMinAvgTotalPowerUsageByTimeForDevicesByType(-1, deviceType, timeType);
            return Ok(result);
        }

        [HttpGet("getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType/{userid}/{deviceType}/{timeType}")]
        public IActionResult GetMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(int userid, string deviceType, string timeType)
        {
            var result = _contextDevicesAndData.GetMaxMinAvgTotalPowerUsageByTimeForDevicesByType(userid, deviceType, timeType);
            return Ok(result);
        }

        [HttpGet("getMaxMinAvgTotalPowerUsageByTimeForDevice/{deviceid}/{timeType}")]
        public IActionResult GetMaxMinAvgTotalPowerUsageByTimeForDevice(int deviceid, string timeType)
        {
            var result = _contextDevicesAndData.GetMaxMinAvgTotalPowerUsageByTimeForDevice(deviceid, timeType);
            return Ok(result);
        }

    }
}
