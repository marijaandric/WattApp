using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using backend.Models.DTOs;

namespace backend.BLL
{
    public class DevicesDataBL : IDevicesDataBL
    {

        private readonly IDevicesDataDAL _contextDAL;

        private readonly IDevicesDAL _contextDevicesDAL;
        public DevicesDataBL(IDevicesDataDAL context, IDevicesDAL contextDevicesDAL)
        {
            _contextDAL = context;
            _contextDevicesDAL = contextDevicesDAL;
        }

        public List<DevicesData> GetAllDataForDevice(int id)
        {
            return _contextDAL.GetAllDataForDevice(_contextDevicesDAL.GetDevice(id).FakeID);
        }

        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day)
        {
            return _contextDAL.GetDayDataForDevice(_contextDevicesDAL.GetDevice(id).FakeID, year, month, day);
        }

        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, int time)
        {
            return _contextDAL.GetHourDataForDevice(_contextDevicesDAL.GetDevice(id).FakeID, year, month, day, time);
        }

        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month)
        {
            return _contextDAL.GetMonthDataForDevice(_contextDevicesDAL.GetDevice(id).FakeID, year, month);
        }

        public List<DevicesData> GetYearDataForDevice(int id, int year)
        {
            return _contextDAL.GetYearDataForDevice(_contextDevicesDAL.GetDevice(id).FakeID, year);
        }
    }
}
