using backend.Models;

namespace backend.DAL.Interfaces
{
    public interface IDevicesDAL
    {
        public List<Devices> GetDevices();
        public List<Devices> GetDevicesForUser(int userId);
        public Devices GetDeviceForUser(int userId, int deviceId);
        public void ModifiedDevice(Devices device);
        public void SaveChanges();
        public bool DevicesExists(int id);
        public void AddDevice(Devices device);
        public Devices GetDevice(int deviceId);
        public void RemoveDevice(Devices device);
    }
}
