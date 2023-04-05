using backend.BLL.Interfaces;
using backend.DAL;
using backend.DAL.Interfaces;
using backend.Helpers;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.BLL
{
    public class DevicesBL : IDevicesBL
    {
        private readonly IDevicesDAL _contextDAL;
        private readonly IDevicesDataDAL _contextDataDAL;
        private readonly IUserDAL _contextUserDAL;
        public DevicesBL(IDevicesDAL context, IDevicesDataDAL contextDataDAL, IUserDAL contextUserDAL)
        {
            _contextDataDAL = contextDataDAL;
            _contextDAL = context;
            _contextUserDAL = contextUserDAL;
        }

        public void AddDevice(Devices device)
        {
            _contextDAL.AddDevice(device);
        }

        public double currentMonthAllUsersDevicesUsage(string deviceType)
        {
            DateTime now = DateTime.Now;
            List<Devices> devices = _contextDAL.GetDevicesByType(deviceType);
            List<DevicesData> devicesData = _contextDataDAL.GetMonthDataForAllDevices(now.Year, now.Month);
            List<int> ids = devices.Select(d => d.Id).ToList();

            double total = 0;

            foreach (DevicesData deviceData in devicesData)
            {
                if (ids.Contains(deviceData.deviceID))
                    total += deviceData.powerUsage;
            }

            return total;
        }

        public bool DevicesExists(int id)
        {
            return _contextDAL.DevicesExists(id);
        }

        public Devices GetDevice(int deviceId)
        {
            return _contextDAL.GetDevice(deviceId);
        }

        public Devices GetDeviceForUser(int userId, int deviceId)
        {
            return _contextDAL.GetDeviceForUser(userId, deviceId);
        }

        public List<Devices> GetDevices()
        {
            return _contextDAL.GetDevices();
        }

        public List<Devices> GetDevicesByType(String type)
        {
            return _contextDAL.GetDevicesByType(type);
        }

        public (List<string>?, List<int>?) GetDevicesCountByType(int userId, string type, int limit)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            if (devices == null)
                return (null, null);
            var map = new Dictionary<string, int>();
            int counter = 0;
            Console.WriteLine(limit);
            for (int i = 0; i < devices.Count; i++)
            {
                if (!map.ContainsKey(devices[i].Room) && counter < limit)
                {
                    counter = counter + 1;
                    Console.WriteLine(counter);
                    int pom = 1;
                    for (int j = i + 1; j < devices.Count; j++)
                        if (devices[j].Room == devices[i].Room)
                            pom = pom + 1;
                    map.Add(devices[i].Room, pom);
                }
                if (counter + 1 == limit)
                {
                    int pom = 0;
                    for (int j = i; j < devices.Count; j++)
                        if (!map.ContainsKey(devices[j].Room))
                            pom = pom + 1;
                    map.Add("Other", pom);
                    break;
                }
            }

            return (new List<string>(map.Keys), new List<int>(map.Values));

        }

        public List<Devices> GetDevicesForUser(int userId)
        {
            return _contextDAL.GetDevicesForUser(userId);
        }

        public (int?, string?, double?) GetExtremeDevice(int userId, int year, int month, int day, string type, string size)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            Dictionary<int, double> devicesMap = new Dictionary<int, double>();

            if (devices.Count == 0)
                return (null, null, null);

            int deviceWithValue = -1;
            double value = -1;
            string deviceName = "";

            foreach (var device in devices)
            {
                List<DevicesData> devicesDatas = _contextDataDAL.GetDayDataForDevice(device.Id, year, month, day);
                devicesMap.Add(device.Id, Calculator.CalculateAveragePowerUsage(devicesDatas));
            }

            if(size == "max")
            {
                double maxValue = double.MinValue;

                foreach (var pair in devicesMap)
                {
                    if (pair.Value > maxValue)
                    {
                        deviceWithValue = pair.Key;
                        maxValue = pair.Value;
                    }
                }
                value = maxValue;
            }
            else
            {
                double minValue = double.MaxValue;

                foreach (var pair in devicesMap)
                {
                    if (pair.Value < minValue)
                    {
                        deviceWithValue = pair.Key;
                        minValue = pair.Value;
                    }
                }
                value = minValue;
            }

            deviceName = _contextDAL.GetDeviceForUser(userId, deviceWithValue).DeviceName;
            Console.WriteLine((deviceWithValue, deviceName, value));
            return (deviceWithValue, deviceName, value);
        }

        public double getExtremeUsageByArea(string area, string type, string timeType)
        {
            DateTime time = DateTime.Now;
            List<User> users = _contextUserDAL.GetUsersByArea(area);
            List<Devices> devices = new List<Devices>();
            List<DevicesData> devicesdata = new List<DevicesData>();

            foreach (User user in users)
            {
                devices.AddRange(_contextDAL.GetDevicesByType(type));
            }

            foreach (Devices device in devices)
            {
                if(timeType == "Month")
                    devicesdata.AddRange(_contextDataDAL.GetMonthDataForDevice(device.Id, time.Year, time.Month));
                if(timeType == "Day")
                    devicesdata.AddRange(_contextDataDAL.GetDayDataForDevice(device.Id, time.Year, time.Month, time.Day));
            }

            double total = Calculator.CalculateTotalPowerUsage(devicesdata);

            return total;
        }

        public double GetMonthlyStatistics(int userId, int year, int month, string type)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            if(devices.Count == 0)
                return 0;
            double total = 0;
            foreach (var device in devices)
            {
                List<DevicesData> devicesDatas = _contextDataDAL.GetMonthDataForDevice(device.Id, year, month);
                total += Calculator.CalculateTotalPowerUsage(devicesDatas);
            }
            return total;
        }

        public List<BigTableContent> GetTableContent(int userId, int year, int month, int day, int time, string type)
        {
            User userObj = _contextUserDAL.getUser(userId);
            List<Devices> devices = _contextDAL.GetDevicesForUser(userId);
            List<BigTableContent> content = new List<BigTableContent>();

            if (userObj == null || devices == null)
                return null;

            int id = 0;
            foreach (var device in devices)
            {
                List<DevicesData> devicesDatas = new List<DevicesData>();
                if (type == "hour")
                    devicesDatas.Add(_contextDataDAL.GetHourDataForDevice(device.Id, year, month, day, time));
                else if (type == "day")
                    devicesDatas = _contextDataDAL.GetDayDataForDevice(device.Id, year, month, day);
                else if (type == "month")
                    devicesDatas = _contextDataDAL.GetMonthDataForDevice(device.Id, year, month);
                else
                    devicesDatas = _contextDataDAL.GetYearDataForDevice(device.Id, year);

                Console.WriteLine(devicesDatas.Count);

                foreach (var deviceData in devicesDatas)
                {
                    
                    BigTableContent contentData = new BigTableContent();
                    contentData.Id = id++;
                    contentData.userId = userObj.Id;
                    contentData.deviceID = device.Id;
                    contentData.Username = userObj.Username;
                    contentData.DeviceName = device.DeviceName;
                    contentData.DeviceModel = device.DeviceModel;
                    contentData.Room = device.Room;
                    contentData.DeviceType = device.DeviceType;
                    contentData.isActive = device.isActive;
                    contentData.day = day;
                    contentData.month = month;
                    contentData.year = year;
                    contentData.time = time;
                    contentData.powerUsage = deviceData.powerUsage;

                    content.Add(contentData);
                }

            }
            return content;
        }

        public void ModifiedDevice(Devices device)
        {
            _contextDAL.ModifiedDevice(device);
        }

        public void RemoveDevice(Devices device)
        {
            _contextDAL.RemoveDevice(device);
        }

        public void SaveChanges()
        {
            _contextDAL?.SaveChanges();
        }

    }
}
