using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;

namespace backend.DAL
{
    public class DevicesDataDAL : IDevicesDataDAL
    {
        private string host = "localhost";
        private int port = 5137;

        public List<DevicesData> GetAllDataForDevice(int id)
        {
            return Helpers.HttpRequest.SendHttpRequest($"http://{host}:{port}/api/DevicesDatas/{id}");
        }

        public List<DevicesData> GetYearDataForDevice(int id, int year)
        {
            return Helpers.HttpRequest.SendHttpRequest($"http://{host}:{port}/api/DevicesDatas/{id}/{year}");
        }

        public List<DevicesData> GetMonthDataForDevice(int id, int year, int month)
        {
            return Helpers.HttpRequest.SendHttpRequest($"http://{host}:{port}/api/DevicesDatas/{id}/{year}/{month}");

        }

        public List<DevicesData> GetDayDataForDevice(int id, int year, int month, int day)
        {
            return Helpers.HttpRequest.SendHttpRequest($"http://{host}:{port}/api/DevicesDatas/{id}/{year}/{month}/{day}");
        }

        public DevicesData GetHourDataForDevice(int id, int year, int month, int day, int time)
        {
            return Helpers.HttpRequest.SendHttpRequestForDevice($"http://{host}:{port}/api/DevicesDatas/{id}/{year}/{month}/{day}/{time}");
        }

       
    }
}
