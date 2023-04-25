using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using backend.Models.DTOs;

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

        public List<DevicesData> GetMonthDataForAllDevices(int year, int month)
        {
            return Helpers.HttpRequest.SendHttpRequest($"http://{host}:{port}/api/DevicesDatas/GetMonthDataForAllDevices/{year}/{month}");
        }


        public WeekDatasDTO GetWeekByDayHistoryAndFutureForDevices(List<int> devicesids, int year, int month, int day)
        {
            return Helpers.HttpRequest.SendHttpRequestForWeekDatas($"http://{host}:{port}/api/DevicesDatas/GetWeekByDayHistoryAndFutureForDevice/{year}/{month}/{day}", devicesids);
        }


        public List<UsageDTO> GetMonthPowerUsageOfDevices(List<int> consumerDevices, int year, int month)
        {
            return Helpers.HttpRequest.SendPostRequestForUsageDTO($"http://{host}:{port}/api/DevicesDatas/getMonthPoweUsageOfDevices/{year}/{month}/", consumerDevices);
        }

        public List<UsageDTO> GetDayPowerUsageOfDevices(List<int> consumerDevices, int year, int month, int day)
        {
            return Helpers.HttpRequest.SendPostRequestForUsageDTO($"http://{host}:{port}/api/DevicesDatas/getDayPoweUsageOfDevices/{year}/{month}/{day}", consumerDevices);
        }

    }
}
