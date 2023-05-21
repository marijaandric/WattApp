using backend.Context;
using backend.DAL;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

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

        [HttpGet("users/pagination")]
        public List<User> GetAllUsers()
        {
            int pageNo = int.Parse(Request.Query["pageNo"]);
            int pageSize = int.Parse(Request.Query["pageSize"]);
            string sortOrder = Request.Query.TryGetValue("sortOrder", out var sortOrderValue) ? sortOrderValue.ToString() : "USERNAME";
            string nameFilter = Request.Query.TryGetValue("name", out var nameValue) ? nameValue.ToString() : "";
            string addressFilter = Request.Query.TryGetValue("address", out var addressValue) ? addressValue.ToString() : "";
            string emailFilter = Request.Query.TryGetValue("email", out var emailValue) ? emailValue.ToString() : "";
            string roleFilter = Request.Query.TryGetValue("role", out var roleValue) ? roleValue.ToString() : "";

            return provider.GetAllUsers(pageNo, pageSize, sortOrder, nameFilter, addressFilter, emailFilter, roleFilter);
        }

        [HttpGet("users/pagination/count")]
        public int getAllUsersCount()
        {
            return provider.GetAllUsersCount();
        }

    }
}
