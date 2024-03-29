﻿// <auto-generated />
using BiblocateWebAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BiblocateWebAPI.Migrations
{
    [DbContext(typeof(BiblocateWebAPIDbContext))]
    [Migration("20230519130551_Images")]
    partial class Images
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<byte[]>("Base_Image")
                        .IsRequired()
                        .HasColumnType("bytea");

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

                    b.Property<float>("Height")
                        .HasColumnType("real");

                    b.Property<string>("LeftCallNumberBegin")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LeftCallNumberEnd")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("Left_Image")
                        .HasColumnType("bytea");

                    b.Property<string>("RightCallNumberBegin")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RightCallNumberEnd")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("Right_Image")
                        .HasColumnType("bytea");

                    b.Property<short>("RoomId")
                        .HasColumnType("smallint");

                    b.Property<float>("Width")
                        .HasColumnType("real");

                    b.Property<float>("XCoordinate")
                        .HasColumnType("real");

                    b.Property<float>("YCoordinate")
                        .HasColumnType("real");

                    b.HasKey("ShelfId");

                    b.HasIndex("RoomId");

                    b.ToTable("Shelf");
                });

            modelBuilder.Entity("BiblocateWebAPI.Models.Shelf", b =>
                {
                    b.HasOne("BiblocateWebAPI.Models.Room", "Room")
                        .WithMany("Shelves")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("BiblocateWebAPI.Models.Room", b =>
                {
                    b.Navigation("Shelves");
                });
#pragma warning restore 612, 618
        }
    }
}
