using backend.Models.enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelTypesController : ControllerBase
    {
        /// <summary>
        /// Get list of all supported device types.
        /// </summary>
        /// <returns>
        /// A list of the display names of all supported device types.
        /// </returns>
        [HttpGet]
        public List<string> GetModelTypes()
        {
            List<string> modelTypes = Enum.GetValues(typeof(ModelTypes))
                .Cast<ModelTypes>()
                .Select(dt => dt.GetModelTypesDisplayName())
                .ToList();
            return modelTypes;
        }
    }
}
