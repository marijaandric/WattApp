﻿using DeviceFaker.Configurations;
using DeviceFaker.Helpers;
using DeviceFaker.Models;
using DeviceFaker.Models.DTOs;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using NuGet.Packaging;
using NuGet.Packaging.Signing;
using System.Collections.Generic;
using System.Linq;
using static MongoDB.Driver.WriteConcern;


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

        // #### HISTORY AND FORECAST ####
        public List<HAFDatasDTO> GetByDayHistoryAndForecastForDevices(List<List<int>> devicesids, int year, int month, int day, string type)
        {
            List<HAFDatasDTO> datas = new List<HAFDatasDTO>();
            for(int i = 0; i < devicesids.Count; i++)
            {
                if (type.ToLower() == "month")
                    datas.Add(GetMonthHistoryAndForecastPowerUsageOfDevices(devicesids[i], year, month));
                else if (type.ToLower() == "week")
                    datas.Add(GetWeekHistoryAndForecastPowerUsageOfDevices(devicesids[i], year, month, day));
                else if (type.ToLower() == "year")
                    datas.Add(GetYearHistoryAndForecastPowerUsageOfDevices(devicesids[i], year));
                else if(type.ToLower() == "monthhistory")
                    datas.Add(GetMonthHistory2MonthsPowerUsageOfDevices(devicesids[i], year, month));
            }
            return datas;
        }

        // #### WEEK HISTORY AND FORECAST ####
        public HAFDatasDTO GetWeekHistoryAndForecastPowerUsageOfDevices(List<int> ids, int year, int month, int day)
        {

            HAFDatasDTO currentMonth = GetMonthHistoryAndForecastPowerUsageOfDevices(ids, year, month);

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            HAFDatasDTO result = new HAFDatasDTO();
            result.dates = new List<string>();
            result.datas = new List<double>();
            if(day <= 6)
            {
                // u slucaju da moram da idem u prethodni mesec

                HAFDatasDTO previousMonth = GetMonthHistoryAndForecastPowerUsageOfDevices(ids, year, month - 1);
                int mCount = previousMonth.dates.Count;

                //for previous month

                for (int i = (mCount - 6 + day - 1); i < mCount; i++)
                {
                    result.dates.Add(previousMonth.dates[i]);
                    result.datas.Add(previousMonth.datas[i]);
                }
                //for curent month
                result.dates.AddRange(currentMonth.dates.GetRange(0, day + 7));
                result.datas.AddRange(currentMonth.datas.GetRange(0, day + 7));
            }
            else if(day + 7 > currentMonth.dates.Count)
            {

                // u slucaju da moram da idem u sledeci mesec
                HAFDatasDTO nextMonth = GetMonthHistoryAndForecastPowerUsageOfDevices(ids, year, month + 1);
                int mCount = currentMonth.dates.Count;
                int start = day - 6 - 1;
                int count = mCount - day + 6 + 1;


                //for current month
                result.dates.AddRange(currentMonth.dates.GetRange(start, count));
                result.datas.AddRange(currentMonth.datas.GetRange(start, count));

                // for next month
                for(int i = 0; i < 14 - count; i++)
                {
                    result.dates.Add(nextMonth.dates[i]);
                    result.datas.Add(nextMonth.datas[i]);
                }
            }
            else
            {
                //dovoljan mi je samo ovaj mesec
                result.dates = currentMonth.dates.GetRange((day - 6 - 1), 14);
                result.datas = currentMonth.datas.GetRange((day - 6 - 1), 14);

            }

            return result;
        }

        // #### 2 MONTHS HISTORY AND FORECAST ####
        public HAFDatasDTO GetMonthHistory2MonthsPowerUsageOfDevices(List<int> ids, int year, int month)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && (x.Month == month || x.Month == month - 1) ));

            if (year == now.Year && month == now.Month)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && ((x.Month == month && x.Day <= now.Day) || ( x.Month == month - 1 && x.Day >= now.Day )) ));
            }

            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));
            var sortStage = new BsonDocument("$sort", new BsonDocument { { "_id.Month", 1 }, { "_id.Day", 1 } });
            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "Year", "$Year" },
                            { "Month", "$Month"},
                            { "Day", "$Day"}
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                }),
                sortStage
            };

            var pipelineString = pipeline.ToJson();
            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            List<string> dates = new List<string>();
            List<double> datas = new List<double>();
            foreach (var doc in result)
            {
                dates.Add(doc["_id"]["Day"].ToInt32()+"."+ doc["_id"]["Month"].ToInt32());
                datas.Add(doc["totalPowerUsage"].ToDouble());
            }

            HAFDatasDTO haf = new HAFDatasDTO(dates, datas);

            return haf;
        }

        // #### MONTH HISTORY AND FORECAST ####
        public HAFDatasDTO GetMonthHistoryAndForecastPowerUsageOfDevices(List<int> ids, int year, int month)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month ));

            if (year == now.Year && month == now.Month)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month ));
            }

            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));
            var sortStage = new BsonDocument("$sort", new BsonDocument { { "_id.Day", 1 } });
            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "Year", "$Year" },
                            { "Month", "$Month"},
                            { "Day", "$Day"}
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                }),
                sortStage
            };

            var pipelineString = pipeline.ToJson();
            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            List<string> dates = new List<string>();
            List<double> datas = new List<double>();
            foreach (var doc in result)
            {
                dates.Add(doc["_id"]["Day"].ToInt32() + "." + doc["_id"]["Month"].ToInt32());
                datas.Add(doc["totalPowerUsage"].ToDouble());
            }

            HAFDatasDTO haf = new HAFDatasDTO(dates, datas);

            return haf;
        }

        public List<PowerUsageDTO> GetPowerUsageOfDevicesForMatrixForTimeType(List<DevicesIdsDTO> userdevicesids, string timeType)
        {
            DateTime now = DateTime.Now;
            List<PowerUsageDTO> powerUsageDTOs = new List<PowerUsageDTO>();

            foreach (var ids in userdevicesids)
                powerUsageDTOs.Add(GetPowerUsageOfDevicesByTypeForTimeType(ids, now.Year, now.Month, now.Day, timeType));

            return powerUsageDTOs;
        }

        public PowerUsageDTO GetPowerUsageOfDevicesByTypeForTimeType(DevicesIdsDTO devicesids, int year, int month, int day, string timeType)
        {
            PowerUsageDTO powerUsageDTO = new PowerUsageDTO();

            if (timeType.ToLower() == "year")
            {
                powerUsageDTO.consumption = GetYearPowerUsageSumOfDevices(devicesids.consumers.Where(x => x > 0 && x < 20).ToList(), year);
                powerUsageDTO.production = GetYearPowerUsageSumOfDevices(devicesids.producers.Where(x => x > 0 && x < 20).ToList(), year);
                powerUsageDTO.stock = GetYearPowerUsageSumOfDevices(devicesids.stocks.Where(x => x > 0 && x < 20).ToList(), year);
            }
            else if (timeType.ToLower() == "month")
            {
                powerUsageDTO.consumption = GetMonthPowerUsageSumOfDevices(devicesids.consumers.Where(x => x > 0 && x < 20).ToList(), year, month);
                powerUsageDTO.production = GetMonthPowerUsageSumOfDevices(devicesids.producers.Where(x => x > 0 && x < 20).ToList(), year, month);
                powerUsageDTO.stock = GetMonthPowerUsageSumOfDevices(devicesids.stocks.Where(x => x > 0 && x < 20).ToList(), year, month);
            }
            else if (timeType.ToLower() == "week")
            {
                powerUsageDTO.consumption = GetWeekPowerUsageSumOfDevices(devicesids.consumers.Where(x => x > 0 && x < 20).ToList(), year, month, day);
                powerUsageDTO.production = GetWeekPowerUsageSumOfDevices(devicesids.producers.Where(x => x > 0 && x < 20).ToList(), year, month, day);
                powerUsageDTO.stock = GetWeekPowerUsageSumOfDevices(devicesids.stocks.Where(x => x > 0 && x < 20).ToList(), year, month, day);
            }
            else //day
            {
                powerUsageDTO.consumption = GetDayPowerUsageSumOfDevices(devicesids.consumers.Where(x => x > 0 && x < 20).ToList(), year, month, day);
                powerUsageDTO.production = GetDayPowerUsageSumOfDevices(devicesids.producers.Where(x => x > 0 && x < 20).ToList(), year, month, day);
                powerUsageDTO.stock = GetDayPowerUsageSumOfDevices(devicesids.stocks.Where(x => x > 0 && x < 20).ToList(), year, month, day);
            }

            return powerUsageDTO;
        }

        // #### YEAR HISTORY AND FORECAST ####
        public HAFDatasDTO GetYearHistoryAndForecastPowerUsageOfDevices(List<int> ids, int year)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year));

            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));
            var sortStage = new BsonDocument("$sort", new BsonDocument { { "_id.Month", 1 } });
            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "Year", "$Year" },
                            { "Month", "$Month"}
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                }),
                sortStage
            };

            var pipelineString = pipeline.ToJson();
            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            List<string> dates = new List<string>();
            List<double> datas = new List<double>();
            foreach (var doc in result)
            {
                dates.Add(doc["_id"]["Month"].ToString());
                datas.Add(doc["totalPowerUsage"].ToDouble());
            }

            HAFDatasDTO haf = new HAFDatasDTO(dates, datas);

            return haf;
        }

        // #### LISTA MESECNE SUMIRANE POTROSNJE UREDJAJA PO ID-u ####
        public List<UsageDTO> GetMonthPowerUsageOfDevices(List<int> ids, int year, int month)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month));

            if (year == now.Year && month == now.Month)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day <= now.Day));
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
            Console.WriteLine(pipelineString);
            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            List<UsageDTO> usage = new List<UsageDTO>();
            foreach (var doc in result)
            {
                Console.WriteLine("for loop GetMonthPowerUsageOfDevices");
                UsageDTO usg = new UsageDTO();
                usg.deviceID = doc["_id"]["DeviceID"].ToInt32();
                usg.year = doc["_id"]["Year"].ToInt32();
                usg.month = doc["_id"]["Month"].ToInt32();
                usg.usage = doc["totalPowerUsage"].ToDouble();
                usage.Add(usg);
            }

            return usage;
        }

        // #### LISTA DNEVNE SUMIRANE POTROSNJE UREDJAJA PO ID-u ####
        public List<UsageDTO> GetDayPowerUsageOfDevices(List<int> ids, int year, int month, int day)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day == day));

            if (year == now.Year && month == now.Month && day == now.Day)
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
                Console.WriteLine("for loop GetDayPowerUsageOfDevices");
                UsageDTO usg = new UsageDTO();
                usg.deviceID = doc["_id"]["DeviceID"].ToInt32();
                usg.year = doc["_id"]["Year"].ToInt32();
                usg.month = doc["_id"]["Month"].ToInt32();
                usg.day = doc["_id"]["Day"].ToInt32();
                usg.usage = doc["totalPowerUsage"].ToDouble();
                usage.Add(usg);
            }

            return usage;
        }



        // #### SUMA PO DANU UKUPNA ZA SVE DEVICE-ove ####
        public double GetDayPowerUsageSumOfDevices(List<int> ids, int year, int month, int day)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return 0;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day == day));

            if (year == now.Year && month == now.Month && day == now.Day)
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
                    { "_id", BsonNull.Value},
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                })
            };

            var pipelineString = pipeline.ToJson();
            Console.WriteLine(pipelineString);

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            Console.WriteLine(result.Count);
            if (result.Count != 0)
                return result[0]["totalPowerUsage"].ToDouble();
            else return 0;

            
        }

        // #### SUMA PO MESECU UKUPNA ZA SVE DEVICE-ove ####
        public double GetMonthPowerUsageSumOfDevices(List<int> ids, int year, int month)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return 0;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month));

            if (year == now.Year && month == now.Month)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day <= now.Day));
            }
            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));

            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", BsonNull.Value},
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                })
            };

            var pipelineString = pipeline.ToJson();
            Console.WriteLine(pipelineString);

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();
            Console.WriteLine(result.Count);
            return result[0]["totalPowerUsage"].ToDouble();
        }

        // #### SUMA PO GODINI UKUPNA ZA SVE DEVICE-ove ####
        public double GetYearPowerUsageSumOfDevices(List<int> ids, int year)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return 0;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year));

            if (year == now.Year)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month <= now.Month));
            }
            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));

            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", BsonNull.Value},
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                })
            };

            var pipelineString = pipeline.ToJson();
            Console.WriteLine(pipelineString);

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();

            return result[0]["totalPowerUsage"].ToDouble();
        }

        // #### SUMA PO NEDELJI UKUPNA ZA SVE DEVICE-ove ####
        public double GetWeekPowerUsageSumOfDevices(List<int> ids, int year, int month, int day)
        {
            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return 0;

            return GetWeekUsageForDevicesByDay(ids, year, month, day).Sum(item => item.usage);
        }




        // #### SUMA ZA PERIOD OD NEDELJU DANA, GRUPISANA PO DANU UKUPNA ZA SVE DEVICE-ove ####
        public List<UsageDTO> GetWeekUsageForDevicesByDay(List<int> devicesids, int year, int month, int day)
        {
            devicesids = devicesids.Where(x => x > 0 && x < 20).ToList();

            if (devicesids == null || devicesids.Count == 0)
                return null;

            List<UsageDTO> currentMonth = GetMonthUsageForDevicesByDay(devicesids, year, month);
            List<UsageDTO> result = new List<UsageDTO>();
            if (day <= 6)
            {
                // u slucaju da moram da idem u prethodni mesec

                List<UsageDTO> previousMonth = GetMonthUsageForDevicesByDay(devicesids, year, month - 1);
                int mCount = previousMonth.Count;

                //for previous month
                Console.WriteLine(mCount);
                Console.WriteLine(day);
                for (int i = (mCount - 6 + day - 1); i < mCount; i++)
                {
                    result.Add(previousMonth[i]);
                }
                //for curent month
                result.AddRange(currentMonth.GetRange(0, day));
            }
            else
            {
                //dovoljan mi je samo ovaj mesec
                result.AddRange(currentMonth.GetRange((day - 6 - 1), 7));

            }

            return result;
        }

        // #### SUMA ZA PERIOD OD MESEC DANA, GRUPISANA PO DANU UKUPNA ZA SVE DEVICE-ove ####
        public List<UsageDTO> GetMonthUsageForDevicesByDay(List<int> ids, int year, int month)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month));

            if (year == now.Year && month == now.Month)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month == month && x.Day <= now.Day));
            }
            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));
            var sortStage = new BsonDocument("$sort", new BsonDocument { { "_id.Day", 1 } });
            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "Year", "$Year" },
                            { "Month", "$Month"},
                            { "Day", "$Day"}
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                }),
                sortStage
            };

            var pipelineString = pipeline.ToJson();

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();
            List<UsageDTO> usage = new List<UsageDTO>();
            foreach (var doc in result)
            {
                UsageDTO usg = new UsageDTO();
                usg.year = doc["_id"]["Year"].ToInt32();
                usg.month = doc["_id"]["Month"].ToInt32();
                usg.day = doc["_id"]["Day"].ToInt32();
                usg.usage = doc["totalPowerUsage"].ToDouble();
                usage.Add(usg);
            }
            return usage;

        }

        // #### SUMA ZA PERIOD OD GODINU DANA, GRUPISANA PO MESECU UKUPNA ZA SVE DEVICE-ove ####
        public List<UsageDTO> GetYearUsageForDevicesByMonth(List<int> ids, int year)
        {
            DateTime now = DateTime.Now;

            ids = ids.Where(x => x > 0 && x < 20).ToList();

            if (ids == null || ids.Count == 0)
                return null;

            var filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year));

            if (year == now.Year)
            {
                filter = Builders<DevicesData>.Filter.And(
                Builders<DevicesData>.Filter.In(x => x.DeviceID, ids),
                Builders<DevicesData>.Filter.Where(x => x.Year == year && x.Month <= now.Month));
            }
            var matchStage = new BsonDocument("$match", filter.Render(BsonSerializer.SerializerRegistry.GetSerializer<DevicesData>(), BsonSerializer.SerializerRegistry));
            var sortStage = new BsonDocument("$sort", new BsonDocument { { "_id.Month", 1 } });
            var pipeline = new BsonDocument[]
            {
                matchStage,
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument
                        {
                            { "Year", "$Year" },
                            { "Month", "$Month"}
                        }
                    },
                    { "totalPowerUsage", new BsonDocument("$sum", "$PowerUsage") }
                }),
                sortStage
            };

            var pipelineString = pipeline.ToJson();
            Console.WriteLine(pipelineString);

            var result = _devicesDataCollection.Aggregate<BsonDocument>(pipeline).ToList();
            Console.WriteLine(result.Count);
            List<UsageDTO> usage = new List<UsageDTO>();
            foreach (var doc in result)
            {
                UsageDTO usg = new UsageDTO();
                usg.year = doc["_id"]["Year"].ToInt32();
                usg.month = doc["_id"]["Month"].ToInt32();
                usg.usage = doc["totalPowerUsage"].ToDouble();
                usage.Add(usg);
            }
            return usage;

        }

    }
}
