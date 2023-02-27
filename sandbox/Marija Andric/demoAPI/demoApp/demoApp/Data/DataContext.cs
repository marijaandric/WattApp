using Microsoft.EntityFrameworkCore;

namespace demoApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Game> Games => Set<Game>();
    }
}
