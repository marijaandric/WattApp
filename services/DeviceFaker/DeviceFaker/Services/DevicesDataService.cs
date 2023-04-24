using DeviceFaker.Configurations;
using DeviceFaker.Helpers;
using DeviceFaker.Models;
using DeviceFaker.Models.DTOs;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using NuGet.Packaging;
using System.Collections.Generic;
using System.Linq;


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

        public List<DevicesData> GetWeekDataForAllDevicesOrDevice(int deviceid, int year, int month, int day)
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


        public List<DevicesData> GetWeekDataForAllDevicesOrDeviceInFuture(int deviceid, int year, int month, int day)
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
            List<DevicesData> history = GetWeekDataForAllDevicesOrDevice(deviceid, year, month, day);
            List<DevicesData> future = GetWeekDataForAllDevicesOrDeviceInFuture(deviceid, year, month, day);

            return history.Concat(future).ToList();
        }


        public WeekDatasDTO GetWeekDataByDayForAllDevicesOrDevice(int deviceid, int year, int month, int day)
        {
            int count = 0;
            List<string> dates = new List<string>();
            List<double> devicesdata = new List<double>();
            List<DevicesData> current;
            while (count < 7)
            {
                if (day >= 1)
                {
                    if(deviceid == -1)
                        current = GetAllDevicesByDay(year, month, day);
                    else
                        current = GetDevicesDataByIdDate(deviceid, year, month, day);
                    if (current.Count != 0)
                    {
                        devicesdata.Add(Calculate.CalculateTotalPowerUsage(current));
                        dates.Add($"{month}.{day}");
                        count++;
                    }
                    day--;

                }
                else
                {
                    if (month > 1)
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
            dates.Reverse();
            return new WeekDatasDTO(dates, devicesdata);
        }

        public WeekDatasDTO GetWeekDataByDayForAllDevicesOrDeviceInFuture(int deviceid, int year, int month, int day)
        {
            int count = 0;
            List<string> dates = new List<string>();
            List<double> devicesdata = new List<double>();
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
                        devicesdata.Add(Calculate.CalculateTotalPowerUsage(current));
                        dates.Add($"{month}.{day}");
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
            return new WeekDatasDTO(dates, devicesdata);
        }
        
        public WeekDatasDTO GetWeekByDayHistoryAndFutureForAllDevicesOrDevice(int deviceid, int year, int month, int day)
        {
            WeekDatasDTO history = GetWeekDataByDayForAllDevicesOrDevice(deviceid, year, month, day);
            WeekDatasDTO future = GetWeekDataByDayForAllDevicesOrDeviceInFuture(deviceid, year, month, day);

            List<string> dates = history.dates;
            List<double> datas = history.datas;

            return new WeekDatasDTO(dates.Concat(future.dates).ToList(), datas.Concat(future.datas).ToList());
        }

        public List<UsageDTO> proba(List<int> niz)
        {
            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, niz),
                Builders<DevicesData>.Filter.Where(x => x.Year == 2023));

            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));

            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "DeviceID", "$DeviceID" },
                            { "Year", "$Year" }
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                })
            };

            //var pipelineString = pipeline.ToJson();
            //Console.WriteLine(pipelineString);

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();
            List<UsageDTO> usage = new List<UsageDTO>();
            foreach (var doc in result)
            {
                UsageDTO usg = new UsageDTO();
                usg.DeviceID = doc["_id"]["DeviceID"].ToInt32();
                usg.Year = doc["_id"]["Year"].ToInt32();
                //usg.Month = doc["_id"]["Month"].ToInt32();
                usg.Usage = doc["totalPowerUsage"].ToDouble();
                usage.Add(usg);
            }

            return usage;
        }

        public List<UsageDTO> GetMonthPowerUsageOfDevices(List<int> ids, int year, int month)
        {
            DateTime now = DateTime.Now;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month));

            if (year != now.Year || month != now.Month)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day <= now.Day && x.Time <= now.Hour));
            }

            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));

            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "DeviceID", "$DeviceID" },
                            { "Year", "$Year" },
                            { "Month", "$Month"}
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                })
            };

            var pipelineString = pipeline.ToJson();

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            List<UsageDTO> usage = new List<UsageDTO>();
            foreach (var doc in result)
            {
                UsageDTO usg = new UsageDTO();
                usg.DeviceID = doc["_id"]["DeviceID"].ToInt32();
                usg.Year = doc["_id"]["Year"].ToInt32();
                usg.Month = doc["_id"]["Month"].ToInt32();
                usg.Usage = doc["totalPowerUsage"].ToDouble();
                Console.WriteLine(usg.Usage);
                usage.Add(usg);
            }

            return usage;
        }

        public List<UsageDTO> GetDayPowerUsageOfDevices(List<int> ids, int year, int month, int day)
        {
            DateTime now = DateTime.Now;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day == day));

            if (year != now.Year || month != now.Month || day != now.Day)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day == day && x.Time <= now.Hour));
            }
            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));

            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "DeviceID", "$DeviceID" },
                            { "Year", "$Year" },
                            { "Month", "$Month"},
                            { "Day", "$Day"}
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                })
            };

            var pipelineString = pipeline.ToJson();
            Console.WriteLine(pipelineString);

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            List<UsageDTO> usage = new List<UsageDTO>();
            foreach (var doc in result)
            {
                UsageDTO usg = new UsageDTO();
                usg.DeviceID = doc["_id"]["DeviceID"].ToInt32();
                usg.Year = doc["_id"]["Year"].ToInt32();
                usg.Month = doc["_id"]["Month"].ToInt32();
                usg.Day = doc["_id"]["Day"].ToInt32();
                usg.Usage = doc["totalPowerUsage"].ToDouble();
                usage.Add(usg);
            }

            return usage;
        }

    }
}
