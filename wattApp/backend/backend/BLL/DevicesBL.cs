using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.BLL
{
    public class DevicesBL : IDevicesBL
    {
        private readonly IDevicesDAL _contextDAL;
        private readonly IDevicesDataDAL _contextDataDAL;
        public DevicesBL(IDevicesDAL context, IDevicesDataDAL contextDataDAL)
        {
            _contextDataDAL = contextDataDAL;
            _contextDAL = context;
        }

        public void AddDevice(Devices device)
        {
            _contextDAL.AddDevice(device);
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

        public List<Devices> GetDevicesForUser(int userId)
        {
            return _contextDAL.GetDevicesForUser(userId);
        }

        public (int, string, double) GetExtremeDevice(int userId, int year, int month, int day, string type, string size)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            Dictionary<int, double> devicesMap = new Dictionary<int, double>();

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
