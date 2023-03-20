using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;

namespace backend.DAL
{
    public class DevicesDataDAL : IDevicesDataDAL
    {
        private readonly AppDbContext _context;

        public DevicesDataDAL(AppDbContext context)
        {
            _context = context;
        }

        public List<DevicesData> GetAllDataForDevice(int id)
        {
            return _context.DevicesData.Where(e => e.DeviceID == id).ToList();
        }

        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day)
        {
            return _context.DevicesData.Where(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day).ToList();
        }

        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, string time)
        {
            return _context.DevicesData.FirstOrDefault(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day && e.Time == time  );
        }

        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month)
        {
            return _context.DevicesData.Where(e => e.DeviceID == id && e.Year == year && e.Month == month).ToList();
        }

        public List<DevicesData> GetYearDataForDevice(int id, int year)
        {
            return _context.DevicesData.Where(e => e.DeviceID == id && e.Year == year).ToList();
        }
    }
}
