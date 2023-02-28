using DemoApplication.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DemoApplication.Infrastructure.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        public DbSet<User> User => Set<User>();
    }
}
