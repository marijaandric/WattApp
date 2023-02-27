using DemoApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DemoApp.Data
{
    public class KnjigaDbContext : DbContext
    {
        public KnjigaDbContext(DbContextOptions<KnjigaDbContext> options) : base(options) { }

        public DbSet<Knjiga> Knjige => Set<Knjiga>();
    }
}
