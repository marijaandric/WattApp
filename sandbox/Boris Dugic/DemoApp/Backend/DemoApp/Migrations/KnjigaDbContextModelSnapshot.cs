﻿// <auto-generated />
using System;
using DemoApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DemoApp.Migrations
{
    [DbContext(typeof(KnjigaDbContext))]
    partial class KnjigaDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.3");

            modelBuilder.Entity("DemoApp.Models.Knjiga", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Naslov")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Pisac")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("brojStrana")
                        .HasColumnType("INTEGER");

                    b.Property<int>("cena")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Knjige");
                });
#pragma warning restore 612, 618
        }
    }
}
