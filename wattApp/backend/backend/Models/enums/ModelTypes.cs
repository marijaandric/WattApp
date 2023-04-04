using System.ComponentModel.DataAnnotations;

namespace backend.Models.enums
{
    public enum ModelTypes
    {
        [Display(Name = "Phone")]
        PHONE,
        [Display(Name = "Tablet")]
        TABLET,
        [Display(Name = "Laptop")]
        LAPTOP,
        [Display(Name = "Desktop")]
        DESKTOP,
        [Display(Name = "Smartwatch")]
        SMARTWATCH,
        [Display(Name = "Smart TV")]
        SMARTTV,
        [Display(Name = "Gaming Console")]
        GAMINGCONSOLE,
        [Display(Name = "Virtual Assistant")]
        VIRTUALASSISTANT,
        [Display(Name = "Camera")]
        CAMERA,
        [Display(Name = "Drone")]
        DRONE,
        [Display(Name = "Wearable")]
        WEARABLE,
        [Display(Name = "Smart Home Hub")]
        SMARTHOMEHUB,
        [Display(Name = "Car")]
        CAR,
        [Display(Name = "Headset")]
        HEADSET,
        [Display(Name = "Speaker")]
        SPEAKER
    }

    public static class ModelTypesEnumExtensions
    {
        public static string GetModelTypesDisplayName(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = (DisplayAttribute)field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault();
            return attribute?.Name ?? value.ToString();
        }
    }
}
