using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.BLL.Interfaces
{
    public interface IDevicesAndDevicesData
    {
        public ExtremeDeviceDTO GetExtremeDevice(int userId, int year, int month, int day, string type, string size);
        public double GetMonthlyStatistics(int userId, int year, int month, string type);
        public List<BigTableContent> GetTableContent(int userId, int year, int month, int day, int time, string type);
        public double getTotalUsageByArea(string area, string devicetype, string timeType);
        public AreaExtreme getExtremeUsageForAreas(string devicetype, string timeType, string minmax);
        public HAFDatasDTO GetWeekByDayHistoryAndFutureForDevice(int deviceid, string type);
        public HAFDatasTypesDTO GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(int userid, string type);
        public List<double> GetMonthlyPowerUsageAndProduceOfUser(int userid, int year, int month);
        public double CurrentMonthAllUsersDevicesUsage(string deviceType);
        public Dictionary<string, double> GetPowerUsageOfDeviceForGivenTime(int deviceid, string time);
        public Dictionary<string, double> GetMaxMinAvgTotalPowerUsageByTimeForDevicesByType(int userid, string deviceType, string timeType);
        public Dictionary<string, double>  GetMaxMinAvgTotalPowerUsageByTimeForDevice(int deviceid, string timeType);
    }
}
