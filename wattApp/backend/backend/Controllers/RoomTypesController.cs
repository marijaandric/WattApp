using backend.Models.enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypesController : ControllerBase
    {
        /// <summary>
        /// Get list of all supported room types.
        /// </summary>
        /// <returns>
        /// A list of the display names of all supported room types.
        /// </returns>
        [HttpGet]
        public List<string> GetRoomTypes()
        {
            List<string> roomTypes = Enum.GetValues(typeof(RoomTypes))
                .Cast<RoomTypes>()
                .Select(dt => dt.GetRoomTypesDisplayName())
                .ToList();
            return roomTypes;
        }
    }
}
