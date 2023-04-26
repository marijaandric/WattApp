using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

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
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForDevices(List<int> devicesids, int year, int month, int day);
        List<UsageDTO> GetMonthPowerUsageOfDevices(List<int> consumerDevices, int year, int month);
        public List<UsageDTO> GetDayPowerUsageOfDevices(List<int> consumerDevices, int year, int month, int day);
        public double GetDayPowerUsageSumOfDevices([FromBody] List<int> ids, int year, int month, int day);
        public double GetWeekPowerUsageSumOfDevices([FromBody] List<int> ids, int year, int month, int day);
        public double GetMonthPowerUsageSumOfDevices([FromBody] List<int> ids, int year, int month);
        public double GetYearPowerUsageSumOfDevices([FromBody] List<int> ids, int year);
    }
}
