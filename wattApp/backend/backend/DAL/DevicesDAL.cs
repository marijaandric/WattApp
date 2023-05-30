
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

        public List<Devices> GetDevicesForUserByType(int userId, string deviceType)
        {
            return _context.Devices.Where(d => d.UserID == userId && d.DeviceType.ToLower() == deviceType.ToLower()).ToList();
        }

        public List<Devices> GetAllDevicesForUserIDs(List<int> userids)
        {
            return _context.Devices.Where(d => userids.Contains(d.UserID)).ToList();
        }

        public List<Devices> GetUserDevicesVisibleForDSO(int userid)
        {
            return _context.Devices.Where(e => e.UserID == userid && e.allowOperatorVisibility == true).ToList();
        }

        public int GetNumberOfDevicesByType(int userId, string type)
        {
            return _context.Devices.Where(x => x.UserID == userId && x.DeviceType.ToLower() == type.ToLower()).Count();
        }
        public int GetNumberOfDevicesForUserThatDSOCanSee(int userId)
        {
            var res = _context.Devices.Where(e => e.UserID == userId && e.allowOperatorVisibility == true).ToList();
            return res.Count;
        }

        public int GetNumberOfDevicesForUserThatDSOCanManage(int userId)
        {
            var res = _context.Devices.Where(e => e.UserID == userId && e.allowOperatorControll == true).ToList();
            return res.Count;
        }

        public int GetNumberOfActiveUserDevices(int userId)
        {
            var res = _context.Devices.Where(e => e.UserID == userId && e.isActive == true).ToList();
            return res.Count;
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
            return _context.Devices.Where(e => e.DeviceType.ToLower() == type.ToLower()).ToList();
        }

        public List<Devices> GetDevicesForUser(int userId)
        {
            return _context.Devices.Where(e => e.UserID == userId).ToList();
        }

        public List<Devices> GetUserDevicesByType(int userId, string type)
        {
            if(type == "All")
                return GetDevicesForUser(userId);
            return _context.Devices.Where(e => e.UserID == userId && e.DeviceType.ToLower() == type.ToLower()).ToList();
        }

        public void ModifiedDevice(Devices device)
        {
            _context.Entry(device).State = EntityState.Modified;
        }

        public void RemoveDevice(Devices device)
        {
            _context.Devices.Remove(device);
        }

        public void RemoveUserDevices(int userid)
        {
            _context.Devices.RemoveRange(GetDevicesForUser(userid));
        }

        public void SaveChanges()
        {
            _context.SaveChangesAsync();
        }

        public List<int> GetListOfFakeIDsForUserDevices(int userid)
        {
            var devices = _context.Devices.Where(d => d.UserID == userid).ToList();
            return devices.Select(d => d.FakeID).ToList();
        }

        public List<Devices> GetListOfDevicesByAreaAndType(string area, string deviceType)
        {
            List<int> usersIDs = _context.Users.Where(u => u.Area == area).Select(u => u.Id).ToList();
            List<Devices> devices = _context.Devices.Where(d => usersIDs.Contains(d.UserID) && d.DeviceType == deviceType).ToList();

            return devices;
        }

        public int GetDeviceIDForUserByFakeID(int userId, int fakeid)
        {
            return _context.Devices.FirstOrDefault(e => e.UserID == userId && e.FakeID == fakeid).Id;
        }

    }
}
