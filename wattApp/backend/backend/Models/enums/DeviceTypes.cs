using System.ComponentModel.DataAnnotations;

namespace backend.Models.enums
{
    public enum DeviceTypes
    {
        [Display(Name = "Consumer")]
        CONSUMER,
        [Display(Name = "Producer")]
        PRODUCER,
        [Display(Name = "Stock")]
        STOCK
    }

    public static class DeviceTypesEnumExtensions
    {
        public static string GetDeviceTypesDisplayName(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = (DisplayAttribute)field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault();
            return attribute?.Name ?? value.ToString();
        }
    }
}
