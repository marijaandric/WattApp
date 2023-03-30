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

        public DevicesData GetDevicesDataByIdDateTime(int id, int year, int month, int day, string time)
        {
            return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day && e.Time == time).FirstOrDefault();
        }

        public List<DevicesData> GetDevicesDataByIdDate(int id, int year, int month, int day)
        {
            return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month && e.Day == day).ToList();
        }

        public List<DevicesData> GetDevicesDataByIdYearMonth(int id, int year, int month)
        {
            return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year && e.Month == month).ToList();
        }

        public List<DevicesData> GetDevicesDataByIdYear(int id, int year)
        {
            return _devicesDataCollection.Find(e => e.DeviceID == id && e.Year == year).ToList();
        }

        public List<DevicesData> GetDevicesDataById(int id)
        {
            return _devicesDataCollection.Find(e => e.DeviceID == id).ToList();
        }
    }
}
