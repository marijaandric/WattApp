using backend.Models.enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypesController : ControllerBase
    {
        [HttpGet]
        public Dictionary<RoomTypes, string> GetRoomTypes()
        {
            Dictionary<RoomTypes, string> roomTypes = Enum.GetValues(typeof(RoomTypes))
                .Cast<RoomTypes>()
                .ToDictionary(rt => rt, rt => rt.GetRoomTypesDisplayName());
            return roomTypes;
        }

    }
}
