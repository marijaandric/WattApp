using backend.BAL;
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

        public List<Devices> GetUserDevicesVisibleForDSO(int userid)
        {
            return _contextDAL.GetUserDevicesVisibleForDSO(userid);
        }

        public Devices GetDevice(int deviceId)
        {
            return _contextDAL.GetDevice(deviceId);
        }

        public Devices GetDeviceForUser(int userId, int deviceId)
        {
            return _contextDAL.GetDeviceForUser(userId, deviceId);
        }

        public void AddDevice(Devices device)
        {
            _contextDAL.AddDevice(device);
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

        public bool DevicesExists(int id)
        {
            return _contextDAL.DevicesExists(id);
        }

        public int GetNumberOfActiveUserDevices(int userid)
        {
            return _contextDAL.GetNumberOfActiveUserDevices(userid);
        }

        public int GetNumberOfDevicesForUserThatDSOCanSee(int userId)
        {
            Console.WriteLine("Can see: " + _contextDAL.GetNumberOfDevicesForUserThatDSOCanSee(userId));
            return _contextDAL.GetNumberOfDevicesForUserThatDSOCanSee(userId);
        }

        public int GetNumberOfDevicesForUserThatDSOCanManage(int userId)
        {
            return _contextDAL.GetNumberOfDevicesForUserThatDSOCanManage(userId);
        }

        public DevicesCountByTypeDTO GetDevicesCountByType(int userId, string type, int limit)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            if (devices == null)
                return null;
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
            DevicesCountByTypeDTO deviceTypes = new DevicesCountByTypeDTO();
            deviceTypes.rooms = new List<string>(map.Keys);
            deviceTypes.count = new List<int>(map.Values);
            return deviceTypes;

        }

    }
}
