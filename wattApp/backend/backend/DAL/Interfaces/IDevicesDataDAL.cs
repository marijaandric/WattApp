using backend.Models;

namespace backend.DAL.Interfaces
{
    public interface IDevicesDataDAL
    {
        public List<DevicesData> GetAllDataForDevice(int id);
        public List<DevicesData> GetYearDataForDevice(int id, int year);
        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month);
        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day);
        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, int time);
    }
}
