using backend.Models.DTOs;

namespace backend.BLL.Interfaces
{
    public interface IDevicesAndDevicesData
    {
        public ExtremeDeviceDTO GetExtremeDevice(int userId, int year, int month, int day, string type, string size);
        public double GetMonthlyStatistics(int userId, int year, int month, string type);
        public List<BigTableContent> GetTableContent(int userId, int year, int month, int day, int time, string type);
        public double getTotalUsageByArea(string area, string type, string timeType);
        public AreaExtreme getExtremeUsageForAreas(string type, string timeType, string minmax);
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForDevice(int deviceid);
        public WeekDatasTypesDTO GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(int userid);
        public List<double> GetMonthlyPowerUsageAndProduceOfUser(int userid, int year, int month);
        public double currentMonthAllUsersDevicesUsage(string deviceType);
    }
}
