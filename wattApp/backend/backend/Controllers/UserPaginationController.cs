using backend.Context;
using backend.DAL;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPaginationController : ControllerBase
    {
        private readonly UsersPaginationProvider provider;

        public UserPaginationController(UsersPaginationProvider provider)
        {
            this.provider = provider;
        }

        [HttpGet("users/pagination/pageNo={pageNo}&pageSize={pageSize}&sortOrder={sortOrder}")]
        public List<User> getAllUsers(int pageNo, int pageSize, string sortOrder)
        {
            return provider.GetAllUsers(pageNo, pageSize, sortOrder);
        }

        [HttpGet("users/pagination/count")]
        public int getAllCompaniesCount()
        {
            return provider.GetAllUsersCount();
        }

    }
}
