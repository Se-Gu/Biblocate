using BiblocateWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BiblocateWebAPI.Data
{
    public class BiblocateWebAPIDbContext : DbContext
    {
        public BiblocateWebAPIDbContext(DbContextOptions<BiblocateWebAPIDbContext> options) : base(options)
        {
        }

        public DbSet<Room> Room { get; set; }
        public DbSet<Shelf> Shelf { get; set; }
        public DbSet<ShelfImages> ShelfImages { get; set; }

    }
}
