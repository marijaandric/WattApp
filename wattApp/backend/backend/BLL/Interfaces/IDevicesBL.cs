using backend.Models;
using backend.Models.NotDbModels;
using Microsoft.AspNetCore.Mvc;

namespace backend.BLL.Interfaces
{
    public interface IDevicesBL
    {
        public List<Devices> GetDevices();
        public List<Devices> GetDevicesByType(String type);
        public List<Devices> GetDevicesForUser(int userId);
        public Devices GetDeviceForUser(int userId, int deviceId);
        public void ModifiedDevice(Devices device);
        public void SaveChanges();
        public bool DevicesExists(int id);
        public void AddDevice(Devices device);
        public Devices GetDevice(int deviceId);
        public void RemoveDevice(Devices device);
        public (int, string, double) GetExtremeDevice(int userId, int year, int month, int day, string type, string size);
        public double GetMonthlyStatistics(int userId, int year, int month, string type);
        public  List<BigTableContent> GetTableContent(int userId, int year, int month, int day, string time, string type);
    }
}
