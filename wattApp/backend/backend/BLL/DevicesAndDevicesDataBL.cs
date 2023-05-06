﻿using backend.BLL.Interfaces;
using backend.Helpers;
using backend.Models.DTOs;
using backend.Models;
using backend.DAL.Interfaces;
using NuGet.Packaging;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ViewComponents;

namespace backend.BLL
{
    public class DevicesAndDevicesDataBL : IDevicesAndDevicesData
    {

        private readonly IDevicesDAL _contextDAL;
        private readonly IDevicesDataDAL _contextDataDAL;
        private readonly IUserDAL _contextUserDAL;

        public DevicesAndDevicesDataBL(IDevicesDAL context, IDevicesDataDAL contextDataDAL, IUserDAL contextUserDAL)
        {
            _contextDataDAL = contextDataDAL;
            _contextDAL = context;
            _contextUserDAL = contextUserDAL;
        }

        
        public List<BigTableContent> GetTableContent(int userId, int year, int month, int day, int time, string type)
        {
            User userObj = _contextUserDAL.getUser(userId);
            List<Devices> devices = _contextDAL.GetDevicesForUser(userId);
            List<BigTableContent> content = new List<BigTableContent>();

            if (userObj == null || devices == null)
                return null;

            int id = 0;
            foreach (var device in devices)
            {
                List<DevicesData> devicesDatas = new List<DevicesData>();
                if (type == "hour")
                    devicesDatas.Add(_contextDataDAL.GetHourDataForDevice(device.Id, year, month, day, time));
                else if (type == "day")
                    devicesDatas = _contextDataDAL.GetDayDataForDevice(device.Id, year, month, day);
                else if (type == "month")
                    devicesDatas = _contextDataDAL.GetMonthDataForDevice(device.Id, year, month);
                else
                    devicesDatas = _contextDataDAL.GetYearDataForDevice(device.Id, year);

                Console.WriteLine(devicesDatas.Count);

                foreach (var deviceData in devicesDatas)
                {

                    BigTableContent contentData = new BigTableContent();
                    contentData.Id = id++;
                    contentData.userId = userObj.Id;
                    contentData.deviceID = device.Id;
                    contentData.Username = userObj.Username;
                    contentData.DeviceName = device.DeviceName;
                    contentData.DeviceModel = device.DeviceModel;
                    contentData.Room = device.Room;
                    contentData.DeviceType = device.DeviceType;
                    contentData.isActive = device.isActive;
                    contentData.day = day;
                    contentData.month = month;
                    contentData.year = year;
                    contentData.time = time;
                    contentData.powerUsage = deviceData.powerUsage;

                    content.Add(contentData);
                }

            }
            return content;
        }


        //optimizovano kao, ali moze bolje ako zatreba (da se odjednom salju sva naselja)
        public AreaExtreme GetExtremeUsageForAreas(string devicetype, string timeType, string minmax)
        {
            List<User> users = _contextUserDAL.getUsers();
            List<string> areas = users.Select(d => d.Area).ToList().Distinct().ToList();

            if (users == null || areas == null)
                return null;

            string maxArea = "";
            string minArea = "";

            double max = -1;
            double min = double.MaxValue;
            double areaTotalUsage;
            foreach (string area in areas)
            {
                areaTotalUsage = GetTotalUsageByArea(area, devicetype, timeType);
                if (areaTotalUsage > max)
                {
                    max = areaTotalUsage;
                    maxArea = area;
                }
                if (areaTotalUsage < min)
                {
                    min = areaTotalUsage;
                    minArea = area;
                }
            }
            if (max < 0)
                return null;
            if (minmax == "Max")
                return new AreaExtreme(maxArea, max);
            else
                return new AreaExtreme(minArea, min);
        }

        //optimizovano
        public double GetTotalUsageByArea(string area, string devicetype, string timeType)
        {
            DateTime now = DateTime.Now;
            List<User> users = _contextUserDAL.GetUsersByArea(area);
            List<Devices> devices = new List<Devices>();

            if (users == null || users.Count == 0)
                return 0;

            devices = _contextDAL.GetAllDevicesForUserIDs(users.Select(d => d.Id).ToList());

            if (devices == null || devices.Count == 0)
                return 0;

            if(timeType.ToLower() == "year")
                return _contextDataDAL.GetYearPowerUsageSumOfDevices(devices.Where(d => d.DeviceType.ToLower() == devicetype.ToLower()).Select(d => d.Id).ToList(), now.Year);
            else if (timeType.ToLower() == "month")
                return _contextDataDAL.GetMonthPowerUsageSumOfDevices(devices.Where(d => d.DeviceType.ToLower() == devicetype.ToLower()).Select(d => d.Id).ToList(), now.Year, now.Month);
            else if (timeType.ToLower() == "week")
                return _contextDataDAL.GetWeekPowerUsageSumOfDevices(devices.Where(d => d.DeviceType.ToLower() == devicetype.ToLower()).Select(d => d.Id).ToList(), now.Year, now.Month, now.Day);
            else
                return _contextDataDAL.GetDayPowerUsageSumOfDevices(devices.Where(d => d.DeviceType.ToLower() == devicetype.ToLower()).Select(d => d.Id).ToList(), now.Year, now.Month, now.Day);
        }

        //optimizovano
        public ExtremeDeviceDTO GetExtremeDevice(int userId, int year, int month, int day, string type, string size)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            Dictionary<int, double> devicesMap = new Dictionary<int, double>();

            if (devices == null || devices.Count == 0)
                return null;

            int deviceWithValue = -1;
            double value = -1;
            string deviceName = "";


            List<UsageDTO> devicesDatas = _contextDataDAL.GetDayPowerUsageOfDevices(devices.Select(d => d.Id).ToList(), year, month, day);

            foreach (var dvcs in devicesDatas)
                devicesMap.Add(dvcs.deviceID, dvcs.usage);

            if (size == "max")
            {
                double maxValue = double.MinValue;

                foreach (var pair in devicesMap)
                {
                    if (pair.Value > maxValue)
                    {
                        deviceWithValue = pair.Key;
                        maxValue = pair.Value;
                    }
                }
                value = maxValue;
            }
            else
            {
                double minValue = double.MaxValue;

                foreach (var pair in devicesMap)
                {
                    if (pair.Value < minValue)
                    {
                        deviceWithValue = pair.Key;
                        minValue = pair.Value;
                    }
                }
                value = minValue;
            }

            deviceName = _contextDAL.GetDeviceForUser(userId, deviceWithValue).DeviceName;
            ExtremeDeviceDTO deviceDTO = new ExtremeDeviceDTO();
            deviceDTO.DeviceName = deviceName;
            deviceDTO.DeviceID = deviceWithValue;
            deviceDTO.Usage = value;
            return deviceDTO;
        }

        //optimizovano
        public double GetMonthlyStatistics(int userId, int year, int month, string type)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            if (devices == null || devices.Count == 0)
                return 0;

            return _contextDataDAL.GetMonthPowerUsageSumOfDevices(devices.Select(d => d.Id).ToList(), year, month);

        }

        //optimizovano
        public HAFDatasDTO GetWeekByDayHistoryAndFutureForDevice(int deviceid, string type)
        {
            DateTime now = DateTime.Now;
            List<List<int>> deviceids = new List<List<int>>();
            deviceids.Add(new List<int>());
            deviceids[0].Add(deviceid);
            List<HAFDatasDTO> devicesDatas = _contextDataDAL.GetByDayHistoryAndForecastForDevices(deviceids, now.Year, now.Month, now.Day, type);

            return devicesDatas[0];
        }

        //optimizovano
        public HAFDatasTypesDTO GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(int userid, string type)
        {
            DateTime now = DateTime.Now;
            List<Devices> consumerDevices;
            List<Devices> producerDevices;
            List<Devices> stockDevices;
            if (userid != -1)
            {
                if (_contextUserDAL.userExists(userid) == false)
                    return null;
                if (_contextDAL.GetDevicesForUser(userid) == null || _contextDAL.GetDevicesForUser(userid).Count == 0)
                    return null;
                consumerDevices = _contextDAL.GetUserDevicesByType(userid, "Consumer");
                producerDevices = _contextDAL.GetUserDevicesByType(userid, "Producer");
                stockDevices = _contextDAL.GetUserDevicesByType(userid, "Stock");
            }
            else
            {
                consumerDevices = _contextDAL.GetDevicesByType("Consumer");
                producerDevices = _contextDAL.GetDevicesByType("Producer");
                stockDevices = _contextDAL.GetDevicesByType("Stock");
            }
                

            List<List<int>> devicesids = new List<List<int>>();

            if(consumerDevices != null || consumerDevices.Count != 0)
                devicesids.Add(consumerDevices.Select(d => d.Id).ToList());

            if (producerDevices != null || producerDevices.Count != 0)
                devicesids.Add(producerDevices.Select(d => d.Id).ToList());

            if (stockDevices != null || stockDevices.Count != 0)
                devicesids.Add(stockDevices.Select(d => d.Id).ToList());

            if(devicesids.Count == 0)
                return null;

            List<HAFDatasDTO> result = _contextDataDAL.GetByDayHistoryAndForecastForDevices(devicesids, now.Year, now.Month, now.Day, type);

            return new HAFDatasTypesDTO(result[0].dates, result[0].datas, result[1].datas, result[2].datas);
            
        }


        //optimizovano
        public List<double> GetMonthlyPowerUsageAndProduceOfUser(int userid, int year, int month)
        {
            List<Devices> consumerDevices = _contextDAL.GetUserDevicesByType(userid, "Consumer");
            List<Devices> producerDevices = _contextDAL.GetUserDevicesByType(userid, "Producer");
            List<Devices> stockDevices = _contextDAL.GetUserDevicesByType(userid, "Stock");

            List<double> result = new List<double>();

            double consumerUsage = _contextDataDAL.GetMonthPowerUsageSumOfDevices(consumerDevices.Select(d => d.Id).ToList(), year, month);
            double producerUsage = _contextDataDAL.GetMonthPowerUsageSumOfDevices(producerDevices.Select(d => d.Id).ToList(), year, month);
            double stockUsage = _contextDataDAL.GetMonthPowerUsageSumOfDevices(stockDevices.Select(d => d.Id).ToList(), year, month);

            result.Add(consumerUsage);
            result.Add(producerUsage);
            result.Add(stockUsage);

            return result;
        }

        //optimizovano
        public double CurrentMonthAllUsersDevicesUsage(string deviceType)
        {
            DateTime now = DateTime.Now;
            List<Devices> devices = _contextDAL.GetDevicesByType(deviceType);

            double total = _contextDataDAL.GetMonthPowerUsageSumOfDevices(devices.Select(d => d.Id).ToList(), now.Year, now.Month);
            
            return total;
        }

        //optimizovano
        public Dictionary<string, double> GetPowerUsageOfDeviceForGivenTime(int deviceid, string time)
        {
            DateTime now = DateTime.Now;
            Dictionary<string, double> device = new Dictionary<string, double>();
            string deviceType = _contextDAL.GetDevice(deviceid).DeviceType;
            double value = 0;
            List<int> devicesid = new List<int> { deviceid };

            switch(time)
            {
                case "day":
                    value = _contextDataDAL.GetDayPowerUsageSumOfDevices(devicesid, now.Year, now.Month, now.Day);
                    break;
                case "week":
                    value = _contextDataDAL.GetWeekPowerUsageSumOfDevices(devicesid, now.Year, now.Month, now.Day);
                    break;
                case "month":
                    value = _contextDataDAL.GetMonthPowerUsageSumOfDevices(devicesid, now.Year, now.Month);
                    break;
                case "year":
                    value = _contextDataDAL.GetYearPowerUsageSumOfDevices(devicesid, now.Year);
                    break;
            }
            device.Add(deviceType, value);
            return device;
        }

        public Dictionary<string, double> GetMaxMinAvgTotalPowerUsageByTimeForDevicesByType(int userid, string deviceType, string timeType)
        {
            DateTime now = DateTime.Now;
            List<Devices> devices;

            if (userid == -1)
                devices = _contextDAL.GetDevicesByType(deviceType);
            else
                devices = _contextDAL.GetDevicesForUserByType(userid, deviceType);

            if(devices.Count == 0 || devices == null)
                return null;

            List<UsageDTO> usages;

            if (timeType.ToLower() == "week")
                usages = _contextDataDAL.GetWeekUsageForDevicesByDay(devices.Select(d => d.Id).ToList(), now.Year, now.Month, now.Day);
            else if (timeType.ToLower() == "month")
                usages = _contextDataDAL.GetMonthUsageForDevicesByDay(devices.Select(d => d.Id).ToList(), now.Year, now.Month);
            else
                usages = _contextDataDAL.GetYearUsageForDevicesByMonth(devices.Select(d => d.Id).ToList(), now.Year);

            Dictionary<string, double> result = new Dictionary<string, double>();
            UsageDTO max, min;

            max = usages.OrderByDescending(item => item.usage).First();
            min = usages.OrderBy(item => item.usage).First();
            double total = usages.Sum(item => item.usage);
            double avg = total / usages.Count;

            if (timeType.ToLower() != "year")
            {
                result.Add(max.day + "." + max.month, max.usage);
                result.Add(min.day + "." + min.month, min.usage);
            }
            else
            {
                result.Add(max.month.ToString(), max.usage);
                result.Add(min.month.ToString(), min.usage);
            }
            result.Add("total", total);
            result.Add("average", avg);

            return result;
        }

        public Dictionary<string, double> GetMaxMinAvgTotalPowerUsageByTimeForDevice(int deviceid, string timeType)
        {
            DateTime now = DateTime.Now;

            List<int> device = new List<int>();
            device.Add(deviceid);

            List<UsageDTO> usages;

            if (timeType.ToLower() == "week")
                usages = _contextDataDAL.GetWeekUsageForDevicesByDay(device, now.Year, now.Month, now.Day);
            else if (timeType.ToLower() == "month")
                usages = _contextDataDAL.GetMonthUsageForDevicesByDay(device.ToList(), now.Year, now.Month);
            else
                usages = _contextDataDAL.GetYearUsageForDevicesByMonth(device.ToList(), now.Year);

            Dictionary<string, double> result = new Dictionary<string, double>();
            UsageDTO max, min;

            max = usages.OrderByDescending(item => item.usage).First();
            min = usages.OrderBy(item => item.usage).First();
            double total = usages.Sum(item => item.usage);
            double avg = total / usages.Count;

            if (timeType.ToLower() != "year")
            {
                result.Add(max.day + "." + max.month, max.usage);
                result.Add(min.day + "." + min.month, min.usage);
            }
            else
            {
                result.Add(max.month.ToString(), max.usage);
                result.Add(min.month.ToString(), min.usage);
            }
            result.Add("total", total);
            result.Add("average", avg);

            return result;


        }

        public Dictionary<string, double> GetPowerUsageForAllTypesForArea(string area, string timetype)
        {

            Dictionary<string, double> result = new Dictionary<string, double>();

            result.Add("Consumer", GetTotalUsageByArea(area, "Consumer", timetype));
            result.Add("Producer", GetTotalUsageByArea(area, "Producer", timetype));
            result.Add("Stock", GetTotalUsageByArea(area, "Stock", timetype));

            return result;
        }
    }
}
