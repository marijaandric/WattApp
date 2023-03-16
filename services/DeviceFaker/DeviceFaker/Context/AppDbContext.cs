using System.Collections.Generic;
using System.Reflection.Emit;
using DeviceFaker.Models;
using Microsoft.EntityFrameworkCore;

namespace DeviceFaker.Context
{
    public class AppDbContext : DbContext
    {
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Devices> Devices { get; set; }
        public DbSet<DevicesData> DevicesData { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Devices>().ToTable("Devices");
            modelBuilder.Entity<DevicesData>().ToTable("DevicesData");
        }

    }
}

