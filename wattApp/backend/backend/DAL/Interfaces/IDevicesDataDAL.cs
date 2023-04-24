using backend.Models;
using backend.Models.DTOs;

namespace backend.DAL.Interfaces
{
    public interface IDevicesDataDAL
    {
        public List<DevicesData> GetAllDataForDevice(int id);
        public List<DevicesData> GetYearDataForDevice(int id, int year);
        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month);
        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day);
        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, int time);
        public List<DevicesData> GetMonthDataForAllDevices(int year, int month);
        public List<DevicesData> GetWeekDataForAllDevices(int deviceid, int year, int month, int day);
        public List<DevicesData> GetWeekDataForAllDevicesInFuture(int deviceid, int year, int month, int day);
        public List<DevicesData> GetWeekHistoryAndFutureForAllDevices(int deviceid, int year, int month, int day);
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForDevice(int deviceid, int year, int month, int day);
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForAllDevices(int year, int month, int day);
        List<UsageDTO> GetMonthPowerUsageOfDevices(List<int> consumerDevices, int year, int month);
    }
}
