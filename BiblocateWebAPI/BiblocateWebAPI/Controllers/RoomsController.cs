using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly BiblocateWebAPIDbContext _context;

        public RoomsController(BiblocateWebAPIDbContext context)
        {
            _context = context;
        }

        // GET: api/Rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoom()
        {
            return await _context.Room.ToListAsync();
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(short id)
        {
            var room = await _context.Room.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        // PUT: api/Rooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(short id, Room room)
        {
            if (id != room.RoomId)
            {
                return BadRequest();
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
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            _context.Room.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.RoomId }, room);
        }

        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(short id)
        {
            var room = await _context.Room.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Room.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomExists(short id)
        {
            return _context.Room.Any(e => e.RoomId == id);
        }
    }
}
