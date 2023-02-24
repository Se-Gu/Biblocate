using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;
using BiblocateWebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BiblocateWebAPI.Services.Services
{
    public class RoomService : IRoomService
    {
        private readonly BiblocateWebAPIDbContext _context;

        public RoomService(BiblocateWebAPIDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _context.Room.ToListAsync();
        }

        public async Task<Room> GetRoom(short id)
        {
            return await _context.Room.FindAsync(id);
        }

        public async void PostRoom(Room room)
        {
            _context.Room.Add(room);
            await _context.SaveChangesAsync();
        }

        public async Task<int> PutRoom(short id, Room room)
        {
            if (id != room.RoomId)
            {
                return -1;
            }

            _context.Entry(room).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
                {
                    return 0;
                }
                else
                {
                    throw;
                }
            }

            return 1;
        }

        public async Task<int> DeleteRoom(short id)
        {
            var room = await _context.Room.FindAsync(id);
            if (room == null)
            {
                return -1;
            }

            _context.Room.Remove(room);
            await _context.SaveChangesAsync();

            return 0;
        }

        public bool RoomExists(short id)
        {
            return _context.Room.Any(e => e.RoomId == id);
        }
    }
}
