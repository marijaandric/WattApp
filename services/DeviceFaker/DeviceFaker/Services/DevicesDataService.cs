using DeviceFaker.Configurations;
using DeviceFaker.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

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

        public List<DevicesData> GetDevicesDataByIdYearMonth(int id, int year, int month)
        {
            DateTime now = DateTime.Now;
            if (year != now.Year || month != now.Month)
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month).ToList();
            else
                return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day <= now.Day && e.Time <= now.Hour).ToList();
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
    }
}
