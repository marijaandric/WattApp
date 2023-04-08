using DeviceFaker.Configurations;
using DeviceFaker.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using NuGet.Packaging;
using System.Collections.Generic;

namespace DeviceFaker.Services
{
    public class DevicesDataService
    {
        private readonly IMongoCollection<DevicesData> _devicesDataCollection;

        public DevicesDataService(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _devicesDataCollection = mongoDb.GetCollection<DevicesData>(databaseSettings.Value.CollectionName);
        }

        public DevicesData GetDevicesDataByIdDateTime(int id, int year, int month, int day, int time)
        {
            return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day && e.Time == time).FirstOrDefault();
        }

        public List<DevicesData> GetDevicesDataByIdDate(int id, int year, int month, int day)
        {
            DateTime now = DateTime.Now;
            if(year != now.Year || month != now.Month || day != now.Day)
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day).ToList();
            else
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day && e.Time <= now.Hour).ToList();
        }

        public List<DevicesData> GetAllDevicesByDay(int year, int month, int day)
        {
            DateTime now = DateTime.Now;
            if (year != now.Year || month != now.Month || day != now.Day)
                return _devicesDataCollection.Find(e => e.Year == year && e.Month == month && e.Day == day).ToList();
            else
                return _devicesDataCollection.Find(e => e.Year == year && e.Month == month && e.Day == day && e.Time <= now.Hour).ToList();
        }

        public List<DevicesData> GetAllDevicesByDayForFuture(int year, int month, int day)
        {
            DateTime now = DateTime.Now;
            if (year != now.Year || month != now.Month || day != now.Day)
                return _devicesDataCollection.Find(e => e.Year == year && e.Month == month && e.Day == day).ToList();
            else
                return _devicesDataCollection.Find(e => e.Year == year && e.Month == month && e.Day == day && e.Time >= now.Hour).ToList();
        }

        public List<DevicesData> GetIdDeviceByDayForFuture(int id, int year, int month, int day)
        {
            DateTime now = DateTime.Now;
            if (year != now.Year || month != now.Month || day != now.Day)
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day).ToList();
            else
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day && e.Time >= now.Hour).ToList();
        }


        public List<DevicesData> GetDevicesDataByIdYearMonth(int id, int year, int month)
        {
            DateTime now = DateTime.Now;
            if (year != now.Year || month != now.Month)
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month).ToList();
            else
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day <= now.Day && e.Time <= now.Hour).ToList();
        }

        public List<DevicesData> GetMonthDataForAllDevices(int year, int month)
        {
            DateTime now = DateTime.Now;
            if (year != now.Year || month != now.Month)
                return _devicesDataCollection.Find(e => e.Year == year && e.Month == month).ToList();
            else
                return _devicesDataCollection.Find(e => e.Year == year && e.Month == month && e.Day <= now.Day && e.Time <= now.Hour).ToList();
        }

        public List<DevicesData> GetDevicesDataByIdYear(int id, int year)
        {
            DateTime now = DateTime.Now;
            if (year != now.Year)
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year).ToList();
            else
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month <= now.Month && e.Day <= now.Day && e.Time <= now.Hour).ToList();
        }

        public List<DevicesData> GetDevicesDataById(int id)
        {
            return _devicesDataCollection.Find(e => e.DeviceID == id).ToList();
        }

        public List<DevicesData> GetWeekDataForAllDevices(int deviceid, int year, int month, int day)
        {
            int count = 0;
            List<DevicesData> devicesdata = new List<DevicesData>();
            List<DevicesData> current;
            while (count < 7)
            {
                if(day >= 1)
                {
                    if (deviceid == -1)
                        current = GetAllDevicesByDay(year, month, day);
                    else
                        current = GetDevicesDataByIdDate(deviceid, year, month, day);
                    if(current.Count != 0)
                    {
                        devicesdata.AddRange(current);
                        count++;
                    }
                    day--;
                    
                }
                else
                {
                    if(month > 1)
                    {
                        month--;
                        day = 31;
                    }
                    else
                    {
                        year--;
                        month = 12;
                        day = 31;
                    }    
                }
            }
            devicesdata.Reverse();
            return devicesdata;
        }


        public List<DevicesData> GetWeekDataForAllDevicesInFuture(int deviceid, int year, int month, int day)
        {
            int count = 0;
            List<DevicesData> devicesdata = new List<DevicesData>();
            List<DevicesData> current;
            while (count < 7)
            {
                if (day <= 31)
                {
                    if (deviceid == -1)
                        current = GetAllDevicesByDayForFuture(year, month, day);
                    else
                        current = GetIdDeviceByDayForFuture(deviceid, year, month, day);

                    if (current.Count != 0)
                    {
                        devicesdata.AddRange(current);
                        count++;
                    }
                    day++;

                }
                else
                {
                    if (month <= 11)
                    {
                        month++;
                        day = 1;
                    }
                    else
                    {
                        year++;
                        month = 1;
                        day = 1;
                    }
                }
            }
            
            return devicesdata;
        }

        public List<DevicesData> GetWeekHistoryAndFutureForAllDevices(int deviceid, int year, int month, int day)
        {
            List<DevicesData> history = GetWeekDataForAllDevices(deviceid, year, month, day);
            List<DevicesData> future = GetWeekDataForAllDevicesInFuture(deviceid, year, month, day);

            return history.Concat(future).ToList();
        }

    }
}
