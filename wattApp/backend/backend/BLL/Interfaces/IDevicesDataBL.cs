using backend.Models;

namespace backend.BLL.Interfaces;

public interface IDevicesDataBL
{
    public List<DevicesData> GetAllDataForDevice(int id);
    public List<DevicesData> GetYearDataForDevice(int id, int year);
    public List<DevicesData> GetMonthDataForDevice(int id, int year, int month);
    public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day);
    public DevicesData GetHourDataForDevice(int id, int year, int month, int day, int time);
}
