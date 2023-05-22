using System.ComponentModel.DataAnnotations;

namespace backend.Models.enums
{
    public enum ModelTypes
    {
        [Display(Name = "Phone")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        PHONE,
        [Display(Name = "Tablet")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        TABLET,
        [Display(Name = "Laptop")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        LAPTOP,
        [Display(Name = "Desktop")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        DESKTOP,
        [Display(Name = "Smartwatch")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        SMARTWATCH,
        [Display(Name = "Smart TV")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        SMARTTV,
        [Display(Name = "Gaming Console")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        GAMINGCONSOLE,
        [Display(Name = "Virtual Assistant")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        VIRTUALASSISTANT,
        [Display(Name = "Camera")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        CAMERA,
        [Display(Name = "Drone")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        DRONE,
        [Display(Name = "Wearable")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        WEARABLE,
        [Display(Name = "Smart Home Hub")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        SMARTHOMEHUB,
        [Display(Name = "Car")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        CAR,
        [Display(Name = "Headset")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        HEADSET,
        [Display(Name = "Speaker")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        SPEAKER,
        [Display(Name = "Solar panel")]
        [DeviceModelTypes(DeviceTypes.PRODUCER)]
        SOLARPANEL,
        [Display(Name = "Battery")]
        [DeviceModelTypes(DeviceTypes.STOCK)]
        BATTERY,
        [Display(Name = "Fridge")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        FRIDGE,
        [Display(Name = "Microwave")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        MICROWAVE,
        [Display(Name = "Washing machine")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        WASHINGMACHINE,
        [Display(Name = "Mixer")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        MIXER,
        [Display(Name = "Blender")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        BLENDER,
        [Display(Name = "Radio")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        RADIO,
        [Display(Name = "Stove")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        STOVE,
        [Display(Name = "Vacuum cleaner")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        VACUUMCLEANER,
        [Display(Name = "Iron")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        IRON,
        [Display(Name = "Lamp")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        LAMP,
        [Display(Name = "Bulb")]
        [DeviceModelTypes(DeviceTypes.CONSUMER)]
        BULB,
        [Display(Name = "Small Wind Turbine")]
        [DeviceModelTypes(DeviceTypes.PRODUCER)]
        SMALLWINDTURBINE,
        [Display(Name = "Portable Generator")]
        [DeviceModelTypes(DeviceTypes.PRODUCER)]
        PORTABLEGENERATOR,
        [Display(Name = "Bicycle Generator")]
        [DeviceModelTypes(DeviceTypes.PRODUCER)]
        BICYCLEGENERATOR,
        [Display(Name = "Power Bank")]
        [DeviceModelTypes(DeviceTypes.STOCK)]
        POWERBANK,
    }

    public static class ModelTypesEnumExtensions
    {
        public static string GetModelTypesDisplayName(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = (DisplayAttribute)field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault();
            return attribute?.Name ?? value.ToString();
        }

        public static Dictionary<ModelTypes, string> GetDeviceModelTypes(DeviceTypes deviceType)
        {
            Dictionary<ModelTypes, string> modelTypes = Enum.GetValues(typeof(ModelTypes))
                .Cast<ModelTypes>()
                .Where(mt => mt.GetDeviceType() == deviceType)
                .ToDictionary(mt => mt, mt => mt.GetModelTypesDisplayName());
            return modelTypes;
        }

        public static DeviceTypes GetDeviceType(this ModelTypes modelType)
        {
            var attribute = modelType.GetType()
                .GetField(modelType.ToString())
                .GetCustomAttributes(typeof(DeviceModelTypes), false)
                .Cast<DeviceModelTypes>()
                .FirstOrDefault();
            return attribute != null ? attribute.DeviceType : DeviceTypes.CONSUMER;
        }
    }
}
