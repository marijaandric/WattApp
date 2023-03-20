using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.BLL
{
    public class DevicesBL : IDevicesBL
    {
        private readonly IDevicesDAL _contextDAL;

        public DevicesBL(IDevicesDAL context)
        {
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

        public List<Devices> GetDevicesForUser(int userId)
        {
            return _contextDAL.GetDevicesForUser(userId);
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
