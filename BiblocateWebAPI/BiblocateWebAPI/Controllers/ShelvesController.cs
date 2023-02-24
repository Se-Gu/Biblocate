using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BiblocateWebAPI.Data;
using BiblocateWebAPI.Models;
using BiblocateWebAPI.Services.Services;
using BiblocateWebAPI.Services.Interfaces;

namespace BiblocateWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelvesController : ControllerBase
    {
        private readonly IShelfService _shelfService;

        public ShelvesController( IShelfService shelfService)
        {
            _shelfService = shelfService;
        }

        [HttpGet("FindShelf/{callNumber}")]
        public async Task<string> GetShelfFromCallNumber(string callNumber)
        {
            return await _shelfService.GetShelfFromCallNumber(callNumber);
        }

        // GET: api/Shelves
        [HttpGet("GetAllShelves")]
        public async Task<IEnumerable<Shelf>> GetAllShelves()
        {
            return await _shelfService.GetAllShelves();
        }

        // GET: api/Shelves/5
        [HttpGet("GetShelf/{id}")]
        public async Task<ActionResult<Shelf>> GetShelf(short id)
        {
            Shelf? actionResult = await _shelfService.GetShelf(id);
            if(actionResult == null)
            {
                return NotFound();
            }
            else
            {
                return actionResult;
            }
        }

        [HttpGet("GetShelvesByRoom/{roomId}")]
        public async Task<IEnumerable<Shelf>> GetShelvesByRoomId(short roomId)
        {
            return await _shelfService.GetShelvesByRoomId(roomId);
        }

        // PUT: api/Shelves/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutShelf/{id}")]
        public async Task<IActionResult> PutShelf(short id, Shelf shelf)
        {
            int actionResult = await _shelfService.PutShelf(id, shelf);

            if(actionResult == -1)
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

        // POST: api/Shelves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("PostShelf/")]
        public async Task<ActionResult<Shelf>> PostShelf(Shelf shelf)
        {
            return CreatedAtAction("GetShelf", new { id = shelf.ShelfId }, shelf);
        }

        // DELETE: api/Shelves/5
        [HttpDelete("DeleteShelf/{id}")]
        public async Task<IActionResult> DeleteShelf(short id)
        {
            int actionResult = await _shelfService.DeleteShelf(id);
            if(actionResult == -1)
            {
                return NotFound();
            }
            else
            {
                return NoContent();
            }
        }

        private bool ShelfExists(short id)
        {
            return _shelfService.ShelfExists(id);
        }
    }
}
