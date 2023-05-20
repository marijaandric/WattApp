using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.DAL
{
    public class UsersPaginationProviderImpl : UsersPaginationProvider
    {
        private readonly AppDbContext _context;
        public UsersPaginationProviderImpl(AppDbContext context)
        {
            _context = context;
        }

        public List<User> GetAllUsers(int pageNo, int pageSize, string sortOrder)
        {
            if (string.IsNullOrEmpty(sortOrder))
            {
                sortOrder = "USERNAME";
            }
            int offset = (pageNo - 1) * pageSize;
            string query = $"SELECT * FROM Users ORDER BY {sortOrder} LIMIT {pageSize} OFFSET {offset}";
            return _context.Users.FromSqlRaw(query).ToList();
        }

        public List<User> GetAllUsersByType(string type, int pageNo, int pageSize, string sortOrder)
        {
            if (string.IsNullOrEmpty(sortOrder))
            {
                sortOrder = "USERNAME";
            }
            int offset = (pageNo - 1) * pageSize;
            string query = $"SELECT * FROM Users WHERE Role = '{type}' ORDER BY {sortOrder} LIMIT {pageSize} OFFSET {offset}";
            return _context.Users.FromSqlRaw(query).ToList();
        }

        public int GetAllUsersCount()
        {
            return _context.Users.Count();
        }

        public int GetAllUsersByTypeCount(String type) {
            return _context.Users
                .Where(u => u.Role == type)
                .Count();
        }
    }
}
