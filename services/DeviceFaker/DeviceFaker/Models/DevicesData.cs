using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DeviceFaker.Models
{
    public class DevicesData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int DeviceID { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int Time { get; set; }
        public double PowerUsage { get; set; }
    }
}
