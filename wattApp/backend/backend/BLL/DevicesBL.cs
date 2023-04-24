using backend.BAL;
using backend.BLL.Interfaces;
using backend.DAL;
using backend.DAL.Interfaces;
using backend.Helpers;
using backend.Models;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.BLL
{
    public class DevicesBL : IDevicesBL
    {
        private readonly IDevicesDAL _contextDAL;
        private readonly IDevicesDataDAL _contextDataDAL;
        private readonly IUserDAL _contextUserDAL;

        public DevicesBL(IDevicesDAL context, IDevicesDataDAL contextDataDAL, IUserDAL contextUserDAL)
        {
            _contextDataDAL = contextDataDAL;
            _contextDAL = context;
            _contextUserDAL = contextUserDAL;
        }

        public List<Devices> GetDevices()
        {
            return _contextDAL.GetDevices();
        }

        public List<Devices> GetDevicesByType(String type)
        {
            return _contextDAL.GetDevicesByType(type);
        }

        public List<Devices> GetDevicesForUser(int userId)
        {
            return _contextDAL.GetDevicesForUser(userId);
        }

        public List<Devices> GetUserDevicesVisibleForDSO(int userid)
        {
            return _contextDAL.GetUserDevicesVisibleForDSO(userid);
        }

        public Devices GetDevice(int deviceId)
        {
            return _contextDAL.GetDevice(deviceId);
        }

        public Devices GetDeviceForUser(int userId, int deviceId)
        {
            return _contextDAL.GetDeviceForUser(userId, deviceId);
        }

        public void AddDevice(Devices device)
        {
            _contextDAL.AddDevice(device);
        }

        public void ModifiedDevice(Devices device)
        {
            _contextDAL.ModifiedDevice(device);
        }

        public void RemoveDevice(Devices device)
        {
            _contextDAL.RemoveDevice(device);
        }

        public void SaveChanges()
        {
            _contextDAL?.SaveChanges();
        }

        public bool DevicesExists(int id)
        {
            return _contextDAL.DevicesExists(id);
        }

        public int GetNumberOfActiveUserDevices(int userid)
        {
            return _contextDAL.GetNumberOfActiveUserDevices(userid);
        }

        public int GetNumberOfDevicesForUserThatDSOCanSee(int userId)
        {
            Console.WriteLine("Can see: " + _contextDAL.GetNumberOfDevicesForUserThatDSOCanSee(userId));
            return _contextDAL.GetNumberOfDevicesForUserThatDSOCanSee(userId);
        }

        public int GetNumberOfDevicesForUserThatDSOCanManage(int userId)
        {
            return _contextDAL.GetNumberOfDevicesForUserThatDSOCanManage(userId);
        }

        public DevicesCountByTypeDTO GetDevicesCountByType(int userId, string type, int limit)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            if (devices == null)
                return null;
            var map = new Dictionary<string, int>();
            int counter = 0;
            Console.WriteLine(limit);
            for (int i = 0; i < devices.Count; i++)
            {
                if (!map.ContainsKey(devices[i].Room) && counter < limit)
                {
                    counter = counter + 1;
                    Console.WriteLine(counter);
                    int pom = 1;
                    for (int j = i + 1; j < devices.Count; j++)
                        if (devices[j].Room == devices[i].Room)
                            pom = pom + 1;
                    map.Add(devices[i].Room, pom);
                }
                if (counter + 1 == limit)
                {
                    int pom = 0;
                    for (int j = i; j < devices.Count; j++)
                        if (!map.ContainsKey(devices[j].Room))
                            pom = pom + 1;
                    map.Add("Other", pom);
                    break;
                }
            }
            DevicesCountByTypeDTO deviceTypes = new DevicesCountByTypeDTO();
            deviceTypes.rooms = new List<string>(map.Keys);
            deviceTypes.count = new List<int>(map.Values);
            return deviceTypes;

        }

        //Devices and Datas

        public ExtremeDeviceDTO GetExtremeDevice(int userId, int year, int month, int day, string type, string size)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            Dictionary<int, double> devicesMap = new Dictionary<int, double>();

            if (devices.Count == 0)
                return null;

            int deviceWithValue = -1;
            double value = -1;
            string deviceName = "";

            foreach (var device in devices)
            {
                //PROBLEM!!!

                List<DevicesData> devicesDatas = _contextDataDAL.GetDayDataForDevice(device.Id, year, month, day);
                devicesMap.Add(device.Id, Calculator.CalculateAveragePowerUsage(devicesDatas));
            }

            if(size == "max")
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
            //Console.WriteLine((deviceWithValue, deviceName, value));
            ExtremeDeviceDTO deviceDTO = new ExtremeDeviceDTO();
            deviceDTO.DeviceName = deviceName;
            deviceDTO.DeviceID = deviceWithValue;
            deviceDTO.Usage = value;
            return deviceDTO;
        }

        public double getTotalUsageByArea(string area, string type, string timeType)
        {
            DateTime time = DateTime.Now;
            List<User> users = _contextUserDAL.GetUsersByArea(area);
            List<Devices> devices = new List<Devices>();
            List<DevicesData> devicesdata;

            if (users == null)
                return 0;

            double total = 0;
            foreach (User user in users)
            {

                //PROBLEM

                devices.AddRange(_contextDAL.GetUserDevicesByType(user.Id, type));
            }

            foreach (Devices device in devices)
            {

                //PROBLEM

                if(timeType == "Month")
                    devicesdata = _contextDataDAL.GetMonthDataForDevice(device.Id, time.Year, time.Month);
                else
                    devicesdata = _contextDataDAL.GetDayDataForDevice(device.Id, time.Year, time.Month, time.Day);
                total += Calculator.CalculateTotalPowerUsage(devicesdata);
            }

            return total;
        }

        public double GetMonthlyStatistics(int userId, int year, int month, string type)
        {
            List<Devices> devices = _contextDAL.GetUserDevicesByType(userId, type);
            if(devices.Count == 0)
                return 0;
            double total = 0;
            foreach (var device in devices)
            {
                List<DevicesData> devicesDatas = _contextDataDAL.GetMonthDataForDevice(device.Id, year, month);
                total += Calculator.CalculateTotalPowerUsage(devicesDatas);
            }
            return total;
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

        

        public AreaExtreme getExtremeUsageForAreas(string type, string timeType, string minmax)
        {
            List<User> users = _contextUserDAL.getUsers();
            List<string> areas = users.Select(d => d.Area).ToList().Distinct().ToList();

            if(users == null || areas == null)
                return null;

            string maxArea = "";
            string minArea = "";

            double max = -1;
            double min = double.MaxValue;
            double areaTotalUsage;
            foreach(string area in areas)
            {
                areaTotalUsage = getTotalUsageByArea(area, type, timeType);
                if(areaTotalUsage > max)
                {
                    max = areaTotalUsage;
                    maxArea = area;
                }
                if(areaTotalUsage < min)
                {
                    min = areaTotalUsage;
                    minArea = area;
                }
            }
            if(max < 0)
                return null;
            if(minmax == "Max")
                return new AreaExtreme(maxArea, max);
            else
                return new AreaExtreme(minArea, min);
        }

        public WeekDatasDTO GetWeekByDayHistoryAndFutureForDevice(int deviceid)
        {
            DateTime now = DateTime.Now;
            WeekDatasDTO devicesDatas = _contextDataDAL.GetWeekByDayHistoryAndFutureForDevice(deviceid, now.Year, now.Month, now.Day);

            return devicesDatas;
        }

        public WeekDatasTypesDTO GetWeekByDayHistoryAndFutureForAllUserDevicesOrAllDevices(int userid)
        {
            DateTime now = DateTime.Now;
            List<Devices> devices;
            if (userid != -1)
                devices = _contextDAL.GetDevicesForUser(userid);
            else
                devices = _contextDAL.GetDevices();

            if (devices.Count == 0 || devices == null)
                return null;
            WeekDatasDTO weekdata = _contextDataDAL.GetWeekByDayHistoryAndFutureForDevice(devices[0].Id, now.Year, now.Month, now.Day);
            
            List<double> totaldatasConsumer = new List<double>();
            List<double> totaldatasProducer = new List<double>();
            List<double> totaldatasStock = new List<double>();

            for(int i = 0; i < weekdata.datas.Count; i++)
            {
                totaldatasConsumer.Add(0.0);
                totaldatasProducer.Add(0.0);
                totaldatasStock.Add(0.0);
            }

            foreach(Devices device in devices)
            {
                weekdata = _contextDataDAL.GetWeekByDayHistoryAndFutureForDevice(device.Id, now.Year, now.Month, now.Day);
                
                for (int j = 0; j < weekdata.datas.Count; j++)
                {
                    if (device.DeviceType.ToLower() == "consumer")
                        totaldatasConsumer[j] += weekdata.datas[j];
                    if (device.DeviceType.ToLower() == "producer")
                        totaldatasProducer[j] += weekdata.datas[j];
                    if(device.DeviceType.ToLower() == "stock")
                        totaldatasStock[j] += weekdata.datas[j];
                }
            }
            foreach (var pom in totaldatasProducer)
                Console.WriteLine(pom);

            return new WeekDatasTypesDTO(weekdata.dates, totaldatasConsumer, totaldatasProducer, totaldatasStock);
        }

        public List<double> GetMonthlyPowerUsageAndProduceOfUser(int userid, int year, int month)
        {
            List<Devices> devices = _contextDAL.GetDevicesForUser(userid);
            List<double> result = new List<double>();
            double consumed = 0;
            double produced = 0;
            double stocked = 0;
            double sum;
            foreach (var device in devices)
            {
                sum = Calculator.CalculateTotalPowerUsage(_contextDataDAL.GetMonthDataForDevice(device.Id, year, month));
                if(device.DeviceType.ToLower() == "consumer")
                    consumed += sum;
                else if (device.DeviceType.ToLower() == "producer")
                    produced += sum;
                else
                    stocked += sum;
            }
            result.Add(consumed);
            result.Add(produced);
            result.Add(stocked);

            return result;
        }

        

        public double currentMonthAllUsersDevicesUsage(string deviceType)
        {
            DateTime now = DateTime.Now;
            List<Devices> devices = _contextDAL.GetDevicesByType(deviceType);
            List<DevicesData> devicesData = _contextDataDAL.GetMonthDataForAllDevices(now.Year, now.Month);
            List<int> ids = devices.Select(d => d.Id).ToList();

            double total = 0;

            foreach (DevicesData deviceData in devicesData)
            {
                if (ids.Contains(deviceData.deviceID))
                    total += deviceData.powerUsage;
            }

            return total;
        }
    }
}
