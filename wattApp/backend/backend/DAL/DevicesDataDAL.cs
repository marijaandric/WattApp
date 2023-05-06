using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

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




        // #### HISTORY AND FORECAST ZA JEDAN UREDJAJ ####

        public List<HAFDatasDTO> GetByDayHistoryAndForecastForDevices(List<List<int>> devicesids, int year, int month, int day, string type)
        {
            return Helpers.HttpRequest.SendHttpRequestForWeekDatas($"http://{host}:{port}/api/DevicesDatas/GetByDayHistoryAndForecastForDevices/{year}/{month}/{day}/{type}", devicesids);
        }


        // #### LISTA MESECNE SUMIRANE POTROSNJE UREDJAJA PO ID-u ####
        public List<UsageDTO> GetMonthPowerUsageOfDevices(List<int> devicesids, int year, int month)
        {
            return Helpers.HttpRequest.SendPostRequestForUsageDTO($"http://{host}:{port}/api/DevicesDatas/getMonthPoweUsageOfDevices/{year}/{month}/", devicesids);
        }

        // #### LISTA DNEVNE SUMIRANE POTROSNJE UREDJAJA PO ID-u ####
        public List<UsageDTO> GetDayPowerUsageOfDevices(List<int> devicesids, int year, int month, int day)
        {
            return Helpers.HttpRequest.SendPostRequestForUsageDTO($"http://{host}:{port}/api/DevicesDatas/getDayPoweUsageOfDevices/{year}/{month}/{day}", devicesids);
        }


        // #### SUMA PO DANU UKUPNA ZA SVE DEVICE-ove ####
        public double GetDayPowerUsageSumOfDevices([FromBody] List<int> ids, int year, int month, int day)
        {
            return Helpers.HttpRequest.SendHttpRequestForDatasDoubles($"http://{host}:{port}/api/DevicesDatas/getDayPowerUsageSumOfDevices/{year}/{month}/{day}", ids);
        }

        // #### SUMA PO NEDELJI UKUPNA ZA SVE DEVICE-ove ####
        public double GetWeekPowerUsageSumOfDevices([FromBody] List<int> ids, int year, int month, int day)
        {
            return Helpers.HttpRequest.SendHttpRequestForDatasDoubles($"http://{host}:{port}/api/DevicesDatas/getWeekPowerUsageSumOfDevices/{year}/{month}/{day}", ids);
        }

        // #### SUMA PO MESECU UKUPNA ZA SVE DEVICE-ove ####
        public double GetMonthPowerUsageSumOfDevices([FromBody] List<int> ids, int year, int month)
        {
            return Helpers.HttpRequest.SendHttpRequestForDatasDoubles($"http://{host}:{port}/api/DevicesDatas/getMonthPowerUsageSumOfDevices/{year}/{month}", ids);
        }

        // #### SUMA PO GODINI UKUPNA ZA SVE DEVICE-ove ####
        public double GetYearPowerUsageSumOfDevices([FromBody] List<int> ids, int year)
        {
            return Helpers.HttpRequest.SendHttpRequestForDatasDoubles($"http://{host}:{port}/api/DevicesDatas/getYearPowerUsageSumOfDevices/{year}", ids);
        }


        public List<UsageDTO> GetWeekUsageForDevicesByDay(List<int> devicesids, int year, int month, int day)
        {
            return Helpers.HttpRequest.SendPostRequestForUsageDTO($"http://{host}:{port}/api/DevicesDatas/getWeekUsageForDevicesByDay/{year}/{month}/{day}", devicesids);
        }

        public List<UsageDTO> GetMonthUsageForDevicesByDay(List<int> devicesids, int year, int month)
        {
            return Helpers.HttpRequest.SendPostRequestForUsageDTO($"http://{host}:{port}/api/DevicesDatas/getMonthUsageForDevicesByDay/{year}/{month}", devicesids);
        }

        public List<UsageDTO> GetYearUsageForDevicesByMonth(List<int> devicesids, int year)
        {
            return Helpers.HttpRequest.SendPostRequestForUsageDTO($"http://{host}:{port}/api/DevicesDatas/getYearUsageForDevicesByDay/{year}", devicesids);
        }

    }
}
