using backend.BLL.Interfaces;
using backend.Models;
using backend.Models.enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceTypesController : ControllerBase
    {
        /// <summary>
        /// Get list of all supported device types.
        /// </summary>
        /// <returns>
        /// A list of the display names of all supported device types.
        /// </returns>
        [HttpGet]
        public List<string> GetDeviceTypes()
        {
            List<string> deviceTypes = Enum.GetValues(typeof(DeviceTypes))
                .Cast<DeviceTypes>()
                .Select(dt => dt.GetDeviceTypesDisplayName())
                .ToList();
            return deviceTypes;
        }

    }
}
