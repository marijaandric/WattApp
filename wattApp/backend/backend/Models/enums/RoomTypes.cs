using System.ComponentModel.DataAnnotations;

namespace backend.Models.enums
{
    public enum RoomTypes
    {
        [Display(Name = "Living room")]
        LIVINGROOM,
        [Display(Name = "Dining room")]
        DININGROOM,
        [Display(Name = "Kitchen")]
        KITCHEN,
        [Display(Name = "Bedroom")]
        BEDROOM,
        [Display(Name = "Bathroom")]
        BATHROOM,
        [Display(Name = "Home office")]
        HOMEOFFICE,
        [Display(Name = "Laundry room")]
        LAUNDRYROOM,
        [Display(Name = "Garage")]
        GARAGE,
        [Display(Name = "Basement")]
        BASEMENT,
        [Display(Name = "Game room")]
        GAMEROOM,
        [Display(Name = "Guest room")]
        GUESTROOM,
        [Display(Name = "Hallway")]
        HALLWAY,
        [Display(Name = "Roof")]
        ROOF,
        [Display(Name = "Garden")]
        GARDEN
    }

    public static class RoomTypesEnumExtensions
    {
        public static string GetRoomTypesDisplayName(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = (DisplayAttribute)field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault();
            return attribute?.Name ?? value.ToString();
        }
    }
}
