using backend.Models;

namespace backend.DAL.Interfaces
{
    public interface UsersPaginationProvider
    {
        public List<User> GetAllUsers(int pageNo, int pageSize, string sortOrder);

        public List<User> GetAllUsersByType(string type, int pageNo, int pageSize, string sortOrder);

        public int GetAllUsersCount();

        public int GetAllUsersByTypeCount(string type);
    }
}
