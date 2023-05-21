using backend.Context;
using backend.DAL.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Drawing.Printing;

namespace backend.DAL
{
    public class UsersPaginationProviderImpl : UsersPaginationProvider
    {
        private readonly AppDbContext _context;
        public UsersPaginationProviderImpl(AppDbContext context)
        {
            _context = context;
        }

        public List<User> GetAllUsers(int pageNo, 
                                        int pageSize, 
                                        string sortOrder,
                                        string nameFilter,
                                        string addressFilter,
                                        string emailFilter,
                                        string roleFilter){
            int offset = (pageNo - 1) * pageSize;
            if (sortOrder.Contains("name"))
            {
                if(sortOrder.Contains("desc")) { 
                    sortOrder = "FirstName desc"; 
                } else
                {
                    sortOrder = "FirstName asc";
                }
                
            }
            string query = $"SELECT * " +
                $"FROM Users " +
                $"WHERE (FirstName LIKE '%{nameFilter}%' OR LastName LIKE '%{nameFilter}%') " +
                $"AND Address LIKE '%{addressFilter}%' " +
                $"AND Email LIKE '%{emailFilter}%' " +
                $"AND Role LIKE '%{roleFilter}%' " +
                $"ORDER BY {sortOrder} " +
                $"LIMIT {pageSize} " +
                $"OFFSET {offset}";
            return _context.Users.FromSqlRaw(query).ToList();
        }

        public List<User> GetAllUsersByType(int pageNo, 
                                            int pageSize, 
                                            string sortOrder, 
                                            string nameFilter,
                                            string addressFilter, 
                                            string emailFilter){
            int offset = (pageNo - 1) * pageSize;
            if (sortOrder.Contains("name"))
            {
                if (sortOrder.Contains("desc"))
                {
                    sortOrder = "FirstName desc";
                }
                else
                {
                    sortOrder = "FirstName asc";
                }

            }
            string query = $"SELECT * " +
                $"FROM Users " +
                $"WHERE Role = 'operator' " +
                $"AND (FirstName LIKE '%{nameFilter}%' OR LastName LIKE '%{nameFilter}%') " +
                $"AND Address LIKE '%{addressFilter}%' " +
                $"AND Email LIKE '%{emailFilter}%' " +
                $"ORDER BY {sortOrder} " +
                $"LIMIT {pageSize} " +
                $"OFFSET {offset}";
            return _context.Users.FromSqlRaw(query).ToList();
        }

        public List<User> GetAllProsumers(int page, 
                                            int limit, 
                                            string sortOrder, 
                                            string nameFilter, 
                                            string addressFilter)
        {
            int offset = (page - 1) * limit;
            if (sortOrder.Contains("name"))
            {
                if (sortOrder.Contains("desc"))
                {
                    sortOrder = "FirstName desc";
                }
                else
                {
                    sortOrder = "FirstName asc";
                }

            }
            string query = $"SELECT * " +
                $"FROM Users " +
                $"WHERE Role = 'prosumer' " +
                $"AND (FirstName LIKE '%{nameFilter}%' OR LastName LIKE '%{nameFilter}%') " +
                $"AND Address LIKE '%{addressFilter}%' " +
                $"ORDER BY {sortOrder} " +
                $"LIMIT {limit} " +
                $"OFFSET {offset}";
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
