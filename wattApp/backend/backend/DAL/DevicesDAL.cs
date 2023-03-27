
using backend.BAL;
using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL
{
    public class DevicesDAL : IDevicesDAL
    {
        private readonly AppDbContext _context;

        public DevicesDAL(AppDbContext context)
        {
            _context = context;
        }

        public void AddDevice(Devices device)
        {
            _context.Devices.Add(device);
        }

        public bool DevicesExists(int id)
        {
            return _context.Devices.Any(e => e.Id == id);
        }

        public Devices GetDevice(int deviceId)
        {
            return _context.Devices.FirstOrDefault(e => e.Id == deviceId);
        }

        public Devices GetDeviceForUser(int userId, int deviceId)
        {
            return _context.Devices.FirstOrDefault(e => e.UserID == userId && e.Id == deviceId);
        }

        public List<Devices> GetDevices()
        {
            return _context.Devices.ToList();
        }

        public List<Devices> GetDevicesByType(string type)
        {
            return _context.Devices.Where(e => e.DeviceType == type).ToList();
        }

        public List<Devices> GetDevicesForUser(int userId)
        {
            return _context.Devices.Where(e => e.UserID == userId).ToList();
        }

        public List<Devices> GetUserDevicesByType(int userId, string type)
        {
            return _context.Devices.Where(e => e.UserID == userId && e.DeviceType == type).ToList();
        }

        public void ModifiedDevice(Devices device)
        {
            _context.Entry(device).State = EntityState.Modified;
        }

        public void RemoveDevice(Devices device)
        {
            _context.Devices.Remove(device);
        }

        public void SaveChanges()
        {
            _context.SaveChangesAsync();
        }
    }
}
