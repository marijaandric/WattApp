using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Models;

namespace backend.BLL
{
    public class DevicesDataBL : IDevicesDataBL
    {

        private readonly IDevicesDataDAL _contextDAL;

        public DevicesDataBL(IDevicesDataDAL context)
        {
            _contextDAL = context;
        }

        public List<DevicesData> GetAllDataForDevice(int id)
        {
            return _contextDAL.GetAllDataForDevice(id);
        }

        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day)
        {
            return _contextDAL.GetDayDataForDevice(id, year, month, day);
        }

        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, string time)
        {
            return _contextDAL.GetHourDataForDevice(id, year, month, day, time);
        }

        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month)
        {
            return _contextDAL.GetMonthDataForDevice(id, year, month);
        }

        public List<DevicesData> GetYearDataForDevice(int id, int year)
        {
            return _contextDAL.GetYearDataForDevice(id, year);
        }
    }
}
