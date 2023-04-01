using backend.Models.enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleTypesController : ControllerBase
    {
        /// <summary>
        /// Get list of all supported roles.
        /// </summary>
        /// <returns>
        /// A list of the display names of all supported roles.
        /// </returns>
        [HttpGet]
        public List<string> GetRoleTypes()
        {
            List<string> roleTypes = Enum.GetValues(typeof(RoleTypes))
                .Cast<RoleTypes>()
                .Select(dt => dt.GetRoleTypesDisplayName())
                .ToList();
            return roleTypes;
        }
    }
}
