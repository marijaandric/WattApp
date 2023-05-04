namespace backend.Models.enums
{

    [AttributeUsage(AttributeTargets.Field)]
    public class DeviceModelTypes : Attribute
    {
        public DeviceTypes DeviceType { get; }

        public DeviceModelTypes(DeviceTypes deviceType)
        {
            DeviceType = deviceType;
        }
    }
}
