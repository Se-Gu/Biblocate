using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;
using BiblocateWebAPI.Services.Interfaces;

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomsController( IRoomService roomService)
        {
            _roomService = roomService;
        }

        // GET: api/Rooms
        [HttpGet("GetAllRooms")]
        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _roomService.GetAllRooms();
        }

        // GET: api/Rooms/5
        [HttpGet("GetRoom/{id}")]
        public async Task<ActionResult<Room>> GetRoom(short id)
        {
            Room? actionResult = await _roomService.GetRoom(id);

            if(actionResult == null)
            {
                return NotFound();
            }
            else
            {
                return actionResult;
            }
        }

        // PUT: api/Rooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutRoom/{id}")]
        public async Task<IActionResult> PutRoom(short id, Room room)
        {
            int actionResult = await _roomService.PutRoom(id, room);

            if (actionResult == -1)
            {
                return BadRequest();
            }
            else if (actionResult == 0)
            {
                return NotFound();
            }
            else
            {
                return NoContent();
            }
        }

        // POST: api/Rooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("PostRoom")]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            return CreatedAtAction("GetRoom", new { id = room.RoomId }, room);
        }

        // DELETE: api/Rooms/5
        [HttpDelete("DeleteRoom/{id}")]
        public async Task<IActionResult> DeleteRoom(short id)
        {
            int actionResult = await _roomService.DeleteRoom(id);
            if (actionResult == -1)
            {
                return NotFound();
            }
            else
            {
                return NoContent();
            }
        }

        private bool RoomExists(short id)
        {
            return _roomService.RoomExists(id);
        }
    }
}
