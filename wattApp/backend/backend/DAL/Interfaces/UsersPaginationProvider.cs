using backend.Models;
using System.Collections.Generic;

namespace backend.DAL.Interfaces
{
    public interface UsersPaginationProvider
    {
        public List<User> GetAllUsers(int pageNo, int pageSize, string sortOrder, string nameFilter, string addressFilter, string emailFilter, string roleFilter);

        public List<User> GetAllUsersByType(int pageNo, int pageSize, string sortOrder, string nameFilter, string addressFilter, string emailFilter);

        public List<User> GetAllProsumers(int page, int limit, string sortOrder, string nameFilter, string addressFilter);

        public int GetAllUsersCount();

        public int GetAllUsersByTypeCount(string type);
    }
}
