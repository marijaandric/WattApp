using backend.BLL.Interfaces;
using backend.DAL.Interfaces;

namespace backend.BLL
{
    public class DevicesDataBL : IDevicesDataBL
    {

        private readonly IDevicesDataDAL _contextDAL;

        public DevicesDataBL(IDevicesDataDAL context)
        {
            _contextDAL = context;
        }

    }
}
