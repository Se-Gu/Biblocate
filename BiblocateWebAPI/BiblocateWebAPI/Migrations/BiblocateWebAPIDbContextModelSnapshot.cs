﻿// <auto-generated />
using BiblocateWebAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    [DbContext(typeof(BiblocateWebAPIDbContext))]
    partial class BiblocateWebAPIDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BiblocateWebAPI.Models.Room", b =>
                {
                    b.Property<short>("RoomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<short>("RoomId"));

                    b.Property<string>("RoomName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("RoomId");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("BiblocateWebAPI.Models.Shelf", b =>
                {
                    b.Property<short>("ShelfId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<short>("ShelfId"));

                    b.Property<string>("LeftCallnameBegin")
                        .HasColumnType("text");

                    b.Property<string>("LeftCallnameEnd")
                        .HasColumnType("text");

                    b.Property<string>("RightCallnameBegin")
                        .HasColumnType("text");

                    b.Property<string>("RightCallnameEnd")
                        .HasColumnType("text");

                    b.Property<short>("RoomId")
                        .HasColumnType("smallint");

                    b.Property<float>("XCoordinate")
                        .HasColumnType("real");

                    b.Property<float>("YCoordinate")
                        .HasColumnType("real");

                    b.HasKey("ShelfId");

                    b.ToTable("Shelf");
                });
#pragma warning restore 612, 618
        }
    }
}
