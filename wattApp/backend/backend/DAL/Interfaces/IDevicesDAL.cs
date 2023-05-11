using backend.Models;

namespace backend.DAL.Interfaces
{
    public interface IDevicesDAL
    {
        public List<Devices> GetDevices();
        public List<Devices> GetDevicesByType(String type);
        public List<Devices> GetDevicesForUser(int userId);
        public List<Devices> GetDevicesForUserByType(int userId, string deviceType);
        public List<Devices> GetUserDevicesByType(int userId, string type);
        public List<Devices> GetUserDevicesVisibleForDSO(int userid);
        public List<Devices> GetAllDevicesForUserIDs(List<int> userid);
        public Devices GetDeviceForUser(int userId, int deviceId);
        public Devices GetDevice(int deviceId);
        public int GetNumberOfDevicesForUserThatDSOCanSee(int userId);
        public int GetNumberOfDevicesForUserThatDSOCanManage(int userId);
        public int GetNumberOfActiveUserDevices(int userid);
        public void ModifiedDevice(Devices device);
        public void SaveChanges();
        public void AddDevice(Devices device);
        public void RemoveDevice(Devices device);
        public bool DevicesExists(int id);
        public int GetNumberOfDevicesByType(int userId, string type);
        public List<int> GetListOfFakeIDsForUserDevices(int userid);
        public List<Devices> GetListOfDevicesByAreaAndType(string area, string deviceType);
        public int GetDeviceIDForUserByFakeID(int userId, int fakeid);
    }
}
