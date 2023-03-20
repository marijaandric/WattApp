using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Devices> Devices { get; set; }
        public DbSet<DevicesData> DevicesData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Devices>().ToTable("devices");
            modelBuilder.Entity<DevicesData>().ToTable("devicesdata");
        }

    }
}
