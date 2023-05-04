using backend.Models.enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelTypesController : ControllerBase
    {
        [HttpGet]
        public Dictionary<ModelTypes, string> GetModelTypes()
        {
            Dictionary<ModelTypes, string> modelTypes = Enum.GetValues(typeof(ModelTypes))
                .Cast<ModelTypes>()
                .ToDictionary(mt => mt, mt => mt.GetModelTypesDisplayName());
            return modelTypes;
        }

        [HttpGet("{deviceType}")]
        public Dictionary<ModelTypes, string> GetDeviceModelTypes(string deviceType)
        {
            deviceType = deviceType.ToUpper();
            if (!Enum.TryParse<DeviceTypes>(deviceType, out var deviceTypeEnum))
            {
                throw new ArgumentException("Invalid device type");
            }

            Dictionary<ModelTypes, string> modelTypes = Enum.GetValues(typeof(ModelTypes))
                .Cast<ModelTypes>()
                .Where(mt => mt.GetDeviceType() == deviceTypeEnum)
                .ToDictionary(mt => mt, mt => mt.GetModelTypesDisplayName());

            return modelTypes;
        }
    }

}
