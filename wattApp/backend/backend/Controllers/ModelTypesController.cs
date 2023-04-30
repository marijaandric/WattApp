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
        public Dictionary<ModelTypes, string> GetDeviceModelTypes(DeviceTypes deviceType)
        {
            Dictionary<ModelTypes, string> modelTypes = Enum.GetValues(typeof(ModelTypes))
                .Cast<ModelTypes>()
                .Where(mt => mt.GetDeviceType() == deviceType)
                .ToDictionary(mt => mt, mt => mt.GetModelTypesDisplayName());
            return modelTypes;
        }
    }

}
