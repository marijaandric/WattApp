using System.ComponentModel.DataAnnotations;

namespace backend.Models.enums
{
    public enum RoleTypes
    {
        [Display(Name = "prosumer")]
        PROSUMER,
        [Display(Name = "operator")]
        OPERATOR,
        [Display(Name = "admin")]
        ADMIN,
        [Display(Name = "superAdmin")]
        SUPERADMIN
    }

    public static class RoleTypesEnumExtensions
    {
        public static string GetRoleTypesDisplayName(this Enum value)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = (DisplayAttribute)field.GetCustomAttributes(typeof(DisplayAttribute), false).FirstOrDefault();
            return attribute?.Name ?? value.ToString();
        }
    }
}
