using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.BLL.Interfaces
{
    public interface IDevicesBL
    {
        public List<Devices> GetDevices();
        public List<Devices> GetDevicesByType(String type);
        public List<Devices> GetDevicesForUser(int userId);
        public List<Devices> GetUserDevicesVisibleForDSO(int userid);
        public Devices GetDeviceForUser(int userId, int deviceId);
        public Devices GetDevice(int deviceId);
        public void AddDevice(Devices device);
        public void ModifiedDevice(Devices device);
        public void RemoveDevice(Devices device);
        public void SaveChanges();
        public bool DevicesExists(int id);
        public int GetNumberOfActiveUserDevices(int userid);
        public int GetNumberOfDevicesForUserThatDSOCanSee(int userId);
        public int GetNumberOfDevicesForUserThatDSOCanManage(int userId);
        public DevicesCountByTypeDTO GetDevicesCountByType(int userId, string type, int limit);

    }
}
