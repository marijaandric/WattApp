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
        [HttpGet]
        public Dictionary<DeviceTypes, string> GetDeviceTypes()
        {
            Dictionary<DeviceTypes, string> deviceTypes = Enum.GetValues(typeof(DeviceTypes))
                .Cast<DeviceTypes>()
                .ToDictionary(dt => dt, dt => dt.GetDeviceTypesDisplayName());
            return deviceTypes;
        }

    }
}
